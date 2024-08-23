import { Addchart } from "@mui/icons-material"
import axios from "axios"
import { action, createStore, thunk} from "easy-peasy"
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

        // localStorage.removeItem('userData')
        // actions.addData(data.user)
        // localStorage.setItem('userData',JSON.stringify(data.user))
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
    }),
    logoutUser:action(state=>{
        state.data=null
        localStorage.removeItem('userData')
        state.isLoggedUser=false
    })
    

}
const productModel={
    data:null,
    addData:action((state,payload)=>{
        state.data=payload
    }),
    getProduct:thunk(async(actions)=>{
        const {data}=await axios.get('http://localhost:3000/product')
        actions.addData(data)
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
        console.log(payload)
        const {data}=await axios.delete(`http://localhost:3000/cart/${payload}`)
        actions.addDeleteData(data)
    }),
    increment:thunk(async(actions,payload)=>{
        const {data}=await axios.patch(`http://localhost:3000/cartQtyIncrement/${payload}`)
        actions.addChangeQty(data)
    }),
    decrement:thunk(async(actions,payload)=>{
        const {data}=await axios.patch(`http://localhost:3000/cartQtyDecrement/${payload}`)
        actions.addChangeQty(data)
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
    addCreateData:action((state,payload)=>{
        state.createData=payload
    }),
    createOrder:thunk(async(actions,payload)=>{
        const {formData,cartData,userId}=payload
        console.log(formData)
        console.log(cartData);
        console.log(userId);
        const {data}=await axios.post(`http://localhost:3000/order/${userId}`,{
            cartItem:cartData,
            fullName:formData.fullName,
            phone:formData.phone,
            address:formData.address
        })
        // actions.addCreateData(data)
        console.log(data)
        window.location.replace(data.url)
    })
}
const store=createStore({
    user:userModel,
    product:productModel,
    cart:cartModel,
    fav:favModel,
    order:orderModel
})
export default store;