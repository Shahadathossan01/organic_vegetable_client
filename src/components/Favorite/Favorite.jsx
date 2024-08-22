import { Box, Grid } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const Favorite = () => {
    const {getAllFav}=useStoreActions(action=>action.fav)
    const {createFav,allFavList}=useStoreState(state=>state.fav)
    const {data,isLoggedUser}=useStoreState(state=>state.user)
    const userId=data?._id
    React.useEffect(()=>{
        getAllFav(userId)
      },[createFav,isLoggedUser])
      if(!allFavList){
        return
      }
    return (
        <>
            <h1 style={{textAlign:'center'}}>Your Favorite Products</h1><hr />
            {
                allFavList.length==0?(
                    <h1>There is no favorite product right now!!!</h1>
                ):(
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        allFavList.map(item=>(
                        <Grid sx={{display:'flex',justifyContent:'center'}}  key={item._id} item xs={12} sm={6} md={4} xl={3}>
                            <ProductCard item={item}></ProductCard>
                        </Grid>
                        ))
                    }
                </Grid>
            </Box>
                )
            }
        </>
    );
};

export default Favorite;