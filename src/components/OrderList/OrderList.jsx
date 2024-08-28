import { Box, Button, Grid } from "@mui/material";
import OrderProductList from "../OrderProductList/OrderProductList";
import OrderDeleteModal from "../OrderDeleteModal/OrderDeleteModal";
import { useState } from "react";

const OrderList = ({item}) => {
    const {fullName,phone,address,status,totalAmount,totalQty}=item
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 ,backgroundColor:'black'}}>
                <Grid sx={{margin:'20px',color:'white',padding:'10px'}} container spacing={2}>

                    <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center'}} item xs={12} sm={4} md={4}>
                        <div>
                            <h1>Details</h1>
                            <h4 style={{marginTop:'-18px'}}>Name: {fullName}</h4>
                            <h4 style={{marginTop:'-18px'}}>Phone: {phone}</h4>
                            <h4 style={{marginTop:'-18px'}}>Address: {address}</h4>
                            <h4 style={{marginTop:'-18px'}}>Total Amount: {totalAmount}</h4>
                            <h4 style={{marginTop:'-18px'}}>Total Items: {item?.cartItem.length}</h4>
                            <h4 style={{marginTop:'-18px'}}>Status:   <Button variant="contained" size="small" color="success">{status}</Button></h4>
                            <Button onClick={handleClickOpen} size="small" color="warning" variant="contained">Delete Order</Button>
                            <OrderDeleteModal id={item._id} open={open} handleClose={handleClose}></OrderDeleteModal>
                        </div>
                    </Grid>

                    <Grid sx={{paddingRight:'40px',display:'flex',justifyContent:'center',alignItems:'center'}} item xs={12} sm={8} md={8}>
                        <div>
                            {
                                item?.cartItem?.map(item=>(
                                    <OrderProductList key={item._id} item={item}></OrderProductList>
                                ))
                            }
                        </div>
                    </Grid>

                </Grid>
            </Box>
        </>
    );
};

export default OrderList;