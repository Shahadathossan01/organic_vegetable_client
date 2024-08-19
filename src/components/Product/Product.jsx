import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

import ProductItems from "../ProductItems/ProductItems";
import { Box, Button, Grid } from "@mui/material";


const Product = () => {
    const {getProduct}=useStoreActions(action=>action.product)
    const {data}=useStoreState(state=>state.product)
    useEffect(()=>{
        getProduct()
    },[])
    if(!data){
        return
    }

    const hotDeals=data.filter(item=>item.hot_deals==true)
    const sessional=data.filter(item=>item.sesional==true)
    const regular=data.filter(item=>(item.hot_deals!=true)&&(item=>item.sesional!=true))

    return (
        <>
            <Box sx={{ flexGrow: 1 ,marginTop:'80px'}}>
                <Grid container spacing={2}>
                    <Grid sx={{marginTop:'100px',display:'flex',justifyContent:'center'}} item xs={5} sm={3} md={2} >
                        <div style={{position:'fixed',backgroundColor:'#ffebee',padding:'2% 1%',textAlign:'center'}}>
                            <h1>Category</h1>
                            <Button  color="secondary" variant="contained" sx={{backgroundColor:'#4e342e'}}>home</Button><br /><br />
                            <Button  color="secondary" variant="contained" sx={{backgroundColor:'#4e342e'}}>home</Button><br /><br />
                            <Button  color="secondary" variant="contained" sx={{backgroundColor:'#4e342e'}}>home</Button><br /><br />
                            <Button  color="secondary" variant="contained" sx={{backgroundColor:'#4e342e'}}>home</Button><br /><br />
                        </div>
                    </Grid>
                    <Grid item xs={7} sm={9} md={10}>
                        <div style={{}}>
                            <ProductItems data={hotDeals} title="Hot Deals/Offers"></ ProductItems>
                            <ProductItems data={sessional} title="Sessional"></ProductItems>
                            <ProductItems data={regular} title="Regular Product"></ProductItems>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            
        </>
    );
};

export default Product;