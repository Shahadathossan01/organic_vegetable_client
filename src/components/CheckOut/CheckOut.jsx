import { Box, Button, Grid } from '@mui/material';
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
    const {allCartData,cartTotalAmount}=location.state
    const userId=data?._id
    const onSubmit=(formData)=>{
        createOrder({formData,allCartData,userId})
    }

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Please Checkout</h1>
                <form style={{display:'flex',justifyContent:'center'}} action="" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div>
                                    <label htmlFor="fullName">Full Name</label><br />
                                    <input {...register('fullName',{required:true})} type="text" name="fullName" id="fullName" />
                                </div>
                                <div>
                                    <label htmlFor="phone">Mobile Number</label><br />
                                    <input {...register('phone',{required:'true'})} type="phone" name="phone" id="phone" />
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label><br />
                                    <input {...register('address',{required:true})} type="text" name="address" id="address" />
                                </div>
                                <div>
                                    <h3>Total Product: {allCartData.length}</h3>
                                    <h3>Total Price: {cartTotalAmount}</h3>
                                </div>
                                <Button type='submit' color='success' variant='contained'>Place Order</Button>
                        </div>
                </form>
                  
        </div>
    );
};

export default CheckOut;