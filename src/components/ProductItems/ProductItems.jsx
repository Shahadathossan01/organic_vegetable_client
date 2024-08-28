import { Box, Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

const ProductItems = ({data,title}) => {

    return (
        <>
            <h1>{title}</h1>
            <Box sx={{ flexGrow: 1 }}>
                <Grid  container spacing={2}>
                    {
                        data?.map((item)=>(
                            <Grid sx={{display:'flex',justifyContent:'center'}} key={item._id} item xs={12} sm={6} md={4} xl={3}>        
                                <ProductCard item={item}></ProductCard>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
};

export default ProductItems;