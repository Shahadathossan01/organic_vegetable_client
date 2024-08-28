import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import OrderList from "../OrderList/OrderList";

const Order = () => {
    const {data}=useStoreState(state=>state.user)
    const {orderData,deleteData}=useStoreState(state=>state.order)
    const {getOrder}=useStoreActions(action=>action.order)
    const userId=data?._id
    useEffect(()=>{
        if(data){
            getOrder(userId)
        }
    },[deleteData,data,getOrder,userId])

    if(orderData.length==0){
        return <h1 style={{height:'300px',display:'flex',alignItems:'center',justifyContent:'center',color:'gray'}}>There is no order YET!</h1>
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