import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
const CartItem = ({item}) => {
    console.log(item)
    const {image,price,title}=item.cart
    return (
        <>
            <div style={{display:'flex',alignItems:'center',gap:'20px',width:'420px',backgroundColor:'#d7ccc8',marginBottom:'20px'}}>
                <img src={image} alt="" width="20%" height="60px"/>
                <h3>{title}</h3>
                <h4>{price}</h4>
                <div style={{display:'flex',gap:'5px',alignItems:'center'}}>
                    <Button>-</Button>
                    <h3>{item.cartQty}</h3>
                    <Button>+</Button>
                </div>
                <DeleteIcon></DeleteIcon>
            </div>
        </>
    );
};

export default CartItem;