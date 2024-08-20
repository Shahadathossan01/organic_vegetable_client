import { action, useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';

const Cart = () => {
    const {getCartData}=useStoreActions(action=>action.cart)
    const {data,allCartData}=useStoreState(state=>state.cart)

    useEffect(()=>{
        getCartData()
    },[data])

    console.log(allCartData)
    return (
        <div>
            <h1>Add to cart: {allCartData.length}</h1>
        </div>
    );
};

export default Cart;