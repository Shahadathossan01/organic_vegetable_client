import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Fragment } from 'react';

const EditReviewModal=({id,open,handleClose})=>{
  const { register, handleSubmit, setValue, watch,formState: { errors }}=useForm()
  const {data}=useStoreState(state=>state.user)
  const {updateReview}=useStoreActions(action=>action.review)
  const ratingValue = watch('rating', 2.5);
  
  const onSubmit=(formData)=>{
    const ratting=ratingValue ||formData.rating
    const comments=formData.comments
    updateReview({ratting,comments,id})
    handleClose()
  }
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Please Review</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} style={{margin:'20px'}}>
          <input disabled {...register('author',)} placeholder={data?.username || 'author'}type="text" name="author" id="author" /><br /><br />
          <textarea {...register('comments',{required:true})} placeholder='comments' name="comments" id=""></textarea><br /><br />
          <Rating name="rating"
        precision={0.5}
        value={ratingValue}
        onChange={(_, value) => setValue('rating', value)} /><br /><br />
          <Button size='small' sx={{marginLeft:'20px',marginRight:'20px'}} variant='contained' type='submit'>Edit</Button>
          <Button size='small' variant='contained' onClick={handleClose}>Cancel</Button>
        </form>
      </Dialog>
    </Fragment>
  );
}

export default EditReviewModal;