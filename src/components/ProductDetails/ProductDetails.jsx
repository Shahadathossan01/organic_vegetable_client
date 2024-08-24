import { useStoreActions, useStoreState } from "easy-peasy";
import ProductReview from "../ProductReview/ProductReview";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box, Grid } from "@mui/material";


const ProductDetails = () => {
    const {productId}=useParams()
    const {getProductById}=useStoreActions(action=>action.product)
    const {singleProduct}=useStoreState(state=>state.product)
    const {updateReviewData}=useStoreState(state=>state.review)
    useEffect(()=>{
        getProductById(productId)
    },[updateReviewData])
    if(!singleProduct){
        return
    }
    const {title,price,image,description,review}=singleProduct
    return (
        <>
            <h1>Product Details</h1>
            <Box sx={{ flexGrow: 1 ,padding:'0px 20px'}}>
                <Grid container spacing={2}>
                    <Grid style={{display:'flex',alignItems:'center'}} item xs={12} sm={6} md={6}>
                        <img style={{width:'80%'}} src={image} alt="" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <h1>{title}</h1>
                        <h1>Price: {price}</h1>
                        <h1>{description}</h1>
                    </Grid>
                </Grid>
            </Box>
            <ProductReview review={review}></ProductReview>
        </>
    );
};

export default ProductDetails;