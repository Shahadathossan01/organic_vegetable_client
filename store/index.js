import axios from "axios"
import { action, createStore, thunk} from "easy-peasy"
const userModel={
    data: localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null,
    addData:action((state,payload)=>{
        state.data=payload
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
const store=createStore({
    user:userModel,
    product:productModel
})
export default store;