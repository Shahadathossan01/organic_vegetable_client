import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import OrderList from "../OrderList/OrderList";


const Order = () => {
    const {data}=useStoreState(state=>state.user)
    const {orderData}=useStoreState(state=>state.order)
    const {getOrder}=useStoreActions(action=>action.order)
    const userId=data?._id
    useEffect(()=>{
        if(data){
            getOrder(userId)
        }
    },[])
    if(!orderData){
        return
    }
    
    return (
        <>
            {
                orderData.map(item=>(
                    <OrderList key={item._id} item={item}></OrderList>
                ))
            }
        </>
    );
};

export default Order;