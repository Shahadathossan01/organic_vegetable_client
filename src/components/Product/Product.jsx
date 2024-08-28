import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";

import ProductItems from "../ProductItems/ProductItems";
import { Box, Button, Grid } from "@mui/material";
import { category, filterByCategory } from "../../../utils";
const Product =() => {
    const {getProduct}=useStoreActions(action=>action.product)
    const {data}=useStoreState(state=>state.product)
    const {createFav}=useStoreState(state=>state.fav)
    const [categoryItem,setCategoryItem]=useState('all')
    useEffect(()=>{
        getProduct()
    },[createFav,getProduct])
    if(!data){
        return
    }
    const handleCategory=(btnData)=>{
        setCategoryItem(btnData)
    }
    const newData=filterByCategory(data,categoryItem)
    const categoryData=category(data)
    const hotDeals=newData.filter(item=>item.hot_deals==true)
    const sessional=newData.filter(item=>item.sesional==true)
    const regular=newData.filter(item=>(item.hot_deals!=true)&&(item=>item.sesional!=true))

    return (
        <>
            <Box sx={{ flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid sx={{marginTop:'100px',display:'flex',justifyContent:'center'}} item xs={6} sm={4} md={3} xl={2} >
                        <div style={{position:'fixed',backgroundColor:'#ffebee',padding:'2% 1%',textAlign:'center'}}>
                            <h1>Category</h1>
                            <Button onClick={()=>{handleCategory('all')}}   color="secondary" variant="contained" sx={{backgroundColor:categoryItem=='all'?'#800080':'#4e342e',marginBottom:'10px',width:'80%',boxShadow:categoryItem=='all'?'0px 3px 1px green':'0px 3px 1px'}}>All</Button>
                            {
                                categoryData?.map(item=>(
                                    <div key={item}>
                                        <Button onClick={()=>{handleCategory(item)}}   color="secondary" variant="contained" sx={{backgroundColor:categoryItem==item?'#800080':'#4e342e',marginBottom:'10px',width:'80%',boxShadow:categoryItem==item?'0px 3px 1px green':'0px 3px 1px'}}>{item}</Button>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={8} md={9} xl={10}>
                        <div style={{}}>
                            <ProductItems data={hotDeals} title="Hot Deals/Offers"></ ProductItems>
                            <ProductItems data={sessional} title="Sessional Product"></ProductItems>
                            <ProductItems data={regular} title="Regular Product"></ProductItems>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            
        </>
    );
};

export default Product;