import { Button } from "@mui/material";
import { useState } from "react";
import ReviewModal from "../ReviewModal/ReviewModal";

const OrderProductList = ({item}) => {
  const [open, setOpen] = useState(false);
  const {image,title,price}=item.cart

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <>
            <div style={{display:'flex',justifyContent:'space-between',gap:'10px',alignItems:'center',backgroundColor:'white',color:'black',padding:'0px 20px',marginBottom:'5px'}}>
                <img style={{width:'50px',height:'50px'}} src={image} alt="" />
                <h3>{title}</h3>
                <h3>price: {price}</h3>
                <h3>qty: {item?.cartQty}</h3>
                <Button onClick={handleClickOpen} variant="contained" color="info">Review</Button>
                <ReviewModal productId={item.cart._id} open={open} handleClose={handleClose}></ReviewModal>
            </div>
        </>
    );
};

export default OrderProductList;