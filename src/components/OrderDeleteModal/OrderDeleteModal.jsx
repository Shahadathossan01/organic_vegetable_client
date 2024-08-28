import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';

const OrderDeleteModal=({open,handleClose,id})=>{
    const {deleteOrder}=useStoreActions(action=>action.order)
    const {register,handleSubmit,watch,formState: { errors }}=useForm()
    const fieldData=watch('delete')
    
    const onSubmit=()=>{
            deleteOrder(id)
    } 

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
        Are You Sure to <span><Button variant='contained' size='small' color='error'>delete</Button></span> this order.
      </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{display:'flex',justifyContent:'center'}}>
                <div>
                  <p>Plese enter <span style={{color:'red'}}>delete</span> into the input field.</p>
                  <input style={{marginTop:'-20px'}} {...register('delete',{ required:"This field is required"})} placeholder='enter delete' type="text" name="delete" id="delete" /><br></br>
                  <span style={{color:'red'}}>{errors?.delete?.message}</span>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'20px',marginBottom:'20px'}}>
                <Button disabled={fieldData!=='delete'}  color='success' size='small' variant='contained' type="submit">confirm</Button>
                <Button color='warning' size='small' variant='contained' onClick={handleClose} autoFocus>
                    cancel
                </Button>
            </div>
        </form>

      </Dialog>
    </React.Fragment>
  );
}
export default OrderDeleteModal;