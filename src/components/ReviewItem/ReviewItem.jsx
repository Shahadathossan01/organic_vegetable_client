
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Rating } from '@mui/material';
import { action, useStoreActions } from 'easy-peasy';
import EditReviewModal from '../EditReviewModal/EditReviewModal';
import { useState } from 'react';

const ReviewItem=({item})=>{
    const {author,comments,ratting,_id}=item
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <Card sx={{ minWidth: 345 ,maxWidth:345}}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <h3>{author}</h3>
            <Rating name="half-rating-read" value={ratting}  precision={0.5} readOnly />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comments}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant='contained' onClick={handleClickOpen}  size="small" color="success">
          Edit
        </Button>
        <EditReviewModal id={_id} open={open} handleClose={handleClose}></EditReviewModal>
      </CardActions>
    </Card>
  );
}
export default ReviewItem;