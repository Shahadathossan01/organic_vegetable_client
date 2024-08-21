import { action, useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import CartItem from '../CartItem/CartItem';
import CartTable from '../CartTable/CartTable';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
const Cart = () => {
    const {data:userData}=useStoreState(state=>state.user)
    const id=userData?._id
    const {getCartData,calculateAll,deleteAll}=useStoreActions(action=>action.cart)
    const {data,allCartData,deleteData,changeQty,cartTotalAmount,cartTotalQty}=useStoreState(state=>state.cart)

   useEffect(()=>{
    getCartData(id)
   },[getCartData,changeQty,deleteData])

   useEffect(()=>{
    if(allCartData){
        calculateAll(allCartData)
    }
   },[allCartData,calculateAll])
    
    // if(!allCartData || allCartData.length===0){
    //     return <h1>There is no cart items here!!!</h1>
    // }


    return (
        <>
        {
            allCartData.length===0?(
                <h1>There is no cart items here!!!</h1>
            )
            :(
                <div >
            <h1 style={{textAlign:'center'}}>Shopping Cart</h1>
            <Button sx={{marginBottom:'4px'}} size="small" variant='contained' onClick={()=>{deleteAll()}}>Clear Cart</Button>
            <CartTable allCartData={allCartData}></CartTable>
            <div style={{display:'flex',justifyContent:'end'}}>
                <div>
                    <h1>Subtotal: {cartTotalAmount}</h1>
                    <span>Taxes and shipping calculated at checkout</span><br />
                    <Button variant='contained'>Check out</Button>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                        <Link to="/product"><Button>Continue Shopping</Button></Link>
                    </div>
                </div>
            </div>
        </div>
            )
        }
        
        </>
    );
};

export default Cart;