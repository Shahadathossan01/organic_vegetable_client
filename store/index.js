import { Addchart } from "@mui/icons-material"
import axios from "axios"
import { action, createStore, thunk} from "easy-peasy"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
const userModel={
    data: localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null,
    isLoggedUser:true,
    addData:action((state,payload)=>{
        state.data=payload
        state.isLoggedUser=true
    }),
    registerUser:thunk(async(actions,payload)=>{
        const {username,email,password}=payload
        const {data}=await axios.post('http://localhost:3000/register',{
            username:username,
            email:email,
            password:password
        })
    }),
    loginUser:thunk(async(actions,payload)=>{
        const {email,password}=payload;
        const {data}=await axios.post('http://localhost:3000/login',{
            email:email,
            password:password
        })
        localStorage.removeItem('userData')
        actions.addData(data.payload)
        localStorage.setItem('userData',JSON.stringify(data.payload))
        toast.success('successfully login.',{
            position:'bottom-left'
        })
        return
    }),
    logoutUser:action(state=>{
        state.data=null
        localStorage.removeItem('userData')
        state.isLoggedUser=false
    })
    

}
const productModel={
    data:null,
    singleProduct:null,
    addData:action((state,payload)=>{
        state.data=payload
    }),
    addSingleProduct:action((state,payload)=>{
        state.singleProduct=payload
    }),
    getProduct:thunk(async(actions)=>{
        const {data}=await axios.get('http://localhost:3000/product')
        actions.addData(data)
    }),
    getProductById:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/product/${payload}`)
        actions.addSingleProduct(data)
    })
}
const cartModel={
    cartTotalAmount:null,
    cartTotalQty:null,
    allCartData:[],
    data:[],
    deleteData:null,
    changeQty:null,
    addChangeQty:action((state,payload)=>{
        state.changeQty=payload
    }),
    addDeleteData:action((state,payload)=>{
        state.deleteData=payload
    }),
    addData:action((state,payload)=>{
        state.data=payload
        toast.info('Add to Cart',{
            position:'bottom-left'
        })
    }),
    addToCart:thunk(async(actions,payload,{getState})=>{
        const {productId,userId}=payload
        const {allCartData}=getState()
        let count=true
        if(!userId){
            return
        }
        allCartData?.map(item=>{
            if(item.cart._id==productId){
                count=false
            }
        })
        if(!count){
            const {data}=await axios.post(`http://localhost:3000/addToCart/${productId}/${userId}`)
            actions.addData(data)
            return
        }
        const {data}=await axios.post(`http://localhost:3000/addToCart/${productId}/${userId}`)
        actions.addData(data)
    }),
    addAllCartData:action((state,payload)=>{
        state.allCartData=payload
    }),
    getCartData:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/user/${payload}`)
        actions.addAllCartData(data.cart)
    }),
    deleteCart:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`http://localhost:3000/cart/${payload}`)
        actions.addDeleteData(data)
        toast.error('Deleted Cart Item',{
            position:'bottom-left'
        })
    }),
    increment:thunk(async(actions,payload)=>{
        const {data}=await axios.patch(`http://localhost:3000/cartQtyIncrement/${payload}`)
        actions.addChangeQty(data)
        toast.success('Increment Cart Quantity',{
            position:'bottom-left'
        })
    }),
    decrement:thunk(async(actions,payload)=>{
        console.log('click')
        const {data}=await axios.patch(`http://localhost:3000/cartQtyDecrement/${payload}`)
        actions.addChangeQty(data)
        toast.success('Decrement Cart Quantity',{
            position:'bottom-left'
        })
    }),
    deleteAll:thunk(async(actions)=>{
        const {data}=await axios.delete('http://localhost:3000/deleteAllCart')
        actions.addChangeQty(data)
    }),

    calculateAll:action((state)=>{
        let {total,quantity}=state.allCartData.reduce((acc,cur)=>{
            const price=cur.cart.price;
            const qty=cur.cartQty;
            const itemTotal=price*qty

            acc.total+=itemTotal;
            acc.quantity+=qty

            return acc;
        },{
            total:0,
            quantity:0
        })

        state.cartTotalAmount=total
        state.cartTotalQty=quantity
    })
    
}
const favModel={
    allFavList:[],
    createFav:null,
    addCreateFav:action((state,payload)=>{
        state.createFav=payload
        toast.success('change favorite',{
            position:'bottom-right'
        })
    }),
    favList:[],
    addFavList:action((state,payload)=>{
        state.favList=payload
        
    }),
    createFavList:thunk(async(actions,payload)=>{
        const {productId,userId}=payload        
        const {data}=await axios.post(`http://localhost:3000/addFav/${productId}/${userId}`)
        actions.addCreateFav(data)
    }),
    addAllFavList:action((state,payload)=>[
        state.allFavList=payload
    ]),
    getAllFav:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/user/${payload}`)
        actions.addAllFavList(data.fab_list)
    })
}
const orderModel={
    createData:null,
    orderData:[],
    deleteData:null,
    addCreateData:action((state,payload)=>{
        state.createData=payload
    }),
    createOrder:thunk(async(actions,payload)=>{
        const {formData,allCartData,userId}=payload
        const {data}=await axios.post(`http://localhost:3000/order/${userId}`,{
            cartItem:allCartData,
            fullName:formData.fullName,
            phone:formData.phone,
            address:formData.address
        })
        window.location.replace(data.url)
    }),
    addOrderData:action((state,payload)=>{
        state.orderData=payload
    }),
    getOrder:thunk(async(actions,payload)=>{
        const {data}=await axios.get(`http://localhost:3000/user/${payload}`)
        actions.addOrderData(data.order_list)
    }),
    addDeleteData:action((state,payload)=>{
        state.deleteData=payload
        toast.success('successfully deleted',{
            position:'bottom-left'
        })
    }),
    deleteOrder:thunk(async(actions,payload)=>{
        const {data}=await axios.delete(`http://localhost:3000/order/${payload}`)
        actions.addDeleteData(data)
    })
}
const reviewModel={
    createReviewData:null,
    updateReviewData:null,
    addCreateReviewData:action((state,payload)=>{
        state.createReviewData=payload
        toast.success('successfully created review',{
            position:'bottom-left'
        })
    }),
    createReview:thunk(async(actions,payload)=>{
        const {author,ratting,comments,productId}=payload
        const {data}=await axios.post(`http://localhost:3000/review/${productId}`,{
            author:author,
            ratting:ratting,
            comments:comments
        })
        actions.addCreateReviewData(data)
    }),
    addUpdateReviewData:action((state,payload)=>{
        state.updateReviewData=payload
        toast.success('successfully updated')
    }),
    updateReview:thunk(async(actions,payload)=>{
        const {ratting,comments,id}=payload
        const {data}=await axios.patch(`http://localhost:3000/review/${id}`,{
            ratting:ratting,
            comments:comments
        })
        actions.addUpdateReviewData(data)
    })
}
const store=createStore({
    user:userModel,
    product:productModel,
    cart:cartModel,
    fav:favModel,
    order:orderModel,
    review:reviewModel
})
export default store;