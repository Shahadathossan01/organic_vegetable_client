import { Box, Button, Grid } from "@mui/material";
import OrderProductList from "../OrderProductList/OrderProductList";

const OrderList = ({item}) => {
    const {fullName,phone,address,status,totalAmount,totalQty}=item
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid sx={{backgroundColor:'gray',margin:'20px',color:'white'}} container spacing={2}>
                    <Grid sx={{display:'flex',justifyContent:'center'}} item xs={12} sm={3} md={4}>
                        <div>
                            <h1>Details</h1>
                            <h3>Name: {fullName}</h3>
                            <h3>Phone: {phone}</h3>
                            <h3>Address: {address}</h3>
                            <h3>Total Amount: {totalAmount}</h3>
                            <h3>Total Items: {item?.cartItem.length}</h3>
                            <h3>Status:   <Button variant="contained" size="small" color="success">{status}</Button></h3>
                        </div>
                    </Grid>
                    <Grid sx={{paddingRight:'40px'}} item xs={12} sm={9} md={8}>
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