import { Box, Grid } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

const CheckOut = () => {
    const location=useLocation()
    const {data}=useStoreState(state=>state.user)
    const {getCartData}=useStoreActions(action=>action.cart)
    const {createOrder}=useStoreActions(action=>action.order)
    const {register,handleSubmit}=useForm()
    const cartData=location.state
    const userId=data?._id
    const onSubmit=(formData)=>{
        createOrder({formData,cartData,userId})
    }
   
    console.log(cartData)
    return (
        <div>
            <h1>checkout</h1>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="fullName">Full Name</label><br />
                                <input {...register('fullName')} type="text" name="fullName" id="fullName" />
                            </div>
                            <div>
                                <label htmlFor="phone">Mobile Number</label><br />
                                <input {...register('phone')} type="phone" name="phone" id="phone" />
                            </div>
                            <div>
                                <label htmlFor="address">Address</label><br />
                                <input {...register('address')} type="text" name="address" id="address" />
                            </div>
                            <div>
                                <h2>Total Product (5)</h2>
                                <h2>Total Price: 500 Taka</h2>
                            </div>
                            <button>Place Order</button>
                </form>
                  
        </div>
    );
};

export default CheckOut;