import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import { useForm } from 'react-hook-form';
import { action, useStoreActions, useStoreState } from 'easy-peasy';

const ReviewModal=({open,handleClose,productId})=>{
  const { register, handleSubmit, setValue, watch,formState: { errors }}=useForm()
  const {data}=useStoreState(state=>state.user)
  const {createReview}=useStoreActions(action=>action.review)
  const ratingValue = watch('rating', 2.5);
  const onSubmit=(formData)=>{
    const author=data?.username
    const ratting=ratingValue ||formData.rating
    const comments=formData.comments
    createReview({author,ratting,comments,productId})
    handleClose()
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Please Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{margin:'20px'}}>
          <input disabled {...register('author',)} placeholder={data?.username || 'author'}type="text" name="author" id="author" /><br /><br />
          <textarea {...register('comments',{required:true})} placeholder='comments' name="comments" id=""></textarea><br /><br />
          <Rating name="rating"
        precision={0.5}
        value={ratingValue}
        onChange={(_, value) => setValue('rating', value)} /><br /><br />
          <Button size='small' sx={{marginLeft:'20px',marginRight:'20px'}} variant='contained' type='submit'>submit</Button>
          <Button size='small' variant='contained' onClick={handleClose}>Cancel</Button>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default ReviewModal;