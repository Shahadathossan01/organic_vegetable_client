import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { action, useStoreActions, useStoreState } from 'easy-peasy';
const ProductCard=({item})=>{
  const {data}=useStoreState(state=>state.user)
  const {addToCart}=useStoreActions(action=>action.cart)
    if(!item && !data){
        return
    }
    const {_id:userId}=data
    const {title,description,price,image,_id: productId}=item

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Price: {price} Taka
        </Typography>
        <Typography sx={{height:'60px'}} variant="body2" color="text.secondary">
         {description.slice(0,100)+'.........'}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'center'}}>
        <Button onClick={()=>addToCart({productId,userId})} variant='contained' sx={{bgcolor:'#ff9800'}} size="small">Add To Card</Button>
        <Button variant='contained' sx={{bgcolor:'#009688'}} size="small">Buy Now</Button>
        <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
                <FavoriteIcon sx={{color:'black',fontSize:'20px'}} />
            </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;