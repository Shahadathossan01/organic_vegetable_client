import {  useStoreActions, useStoreState } from 'easy-peasy';
import{ useEffect } from 'react';
import CartTable from '../CartTable/CartTable';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link} from 'react-router-dom';

const Cart = () => {
    const {data:userData,isLoggedUser}=useStoreState(state=>state.user)
    const id=userData?._id
    const {getCartData,calculateAll,deleteAll}=useStoreActions(action=>action.cart)
    const {allCartData,deleteData,changeQty,cartTotalAmount}=useStoreState(state=>state.cart)

   useEffect(()=>{
    if(isLoggedUser){
        getCartData(id)
    }
   },[getCartData,changeQty,deleteData,isLoggedUser,id])

   useEffect(()=>{
    if(allCartData){
        calculateAll(allCartData)
    }
   },[allCartData,calculateAll])

   if(!allCartData){
    return
   }
    return (
        <>
        {
            allCartData.length===0?(
                <h1 style={{height:'300px',display:'flex',justifyContent:'center',alignItems:'center',color:'gray'}}>There is no cart items here!!!</h1>
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
                        <Link to="/checkout" state={{allCartData,cartTotalAmount}}><Button variant='contained'>Check out</Button></Link>
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