
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CartTable=({allCartData})=>{
    const {getCartData,deleteCart,increment,decrement,calculateAll}=useStoreActions(action=>action.cart)
    // const {data,deleteData,changeQty}=useStoreState(state=>state.cart)

    // useEffect(()=>{
    //     getCartData()
    //     calculateAll()
    // },[data,deleteData,changeQty])
    
    if(!allCartData){
        return
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>PRODUCT</TableCell>
            <TableCell align="right">PRICE</TableCell>
            <TableCell align="right">QUANTITY</TableCell>
            <TableCell align="right">TOTAL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCartData?.map((item) => (
            <TableRow
              key={item._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,height:'40px'}}
            >
              <TableCell component="th" scope="row">
                <div style={{display:'flex',gap:'10px'}}>
                    <img src={item.cart.image} style={{width:'50px',height:'50px'}} alt="" />
                    <div style={{marginTop:'-20px'}}>
                        <h3>{item.cart.title}</h3>
                        <IconButton onClick={()=>{deleteCart(item._id)}} sx={{marginTop:'-20px'}} aria-label="delete">
                            <DeleteIcon sx={{color:'red'}} />
                        </IconButton>
                    </div>
                </div>
              </TableCell>
              <TableCell align="right">{item.cart.price}</TableCell>
              <TableCell sx={{display:'flex',alignItems:'center',gap:'30px'}} align="right">

                        <RemoveIcon onClick={()=>{decrement(item._id)}}></RemoveIcon>
                        <h3>{item.cartQty}</h3>
                        <AddIcon  onClick={()=>{increment(item._id)}}></AddIcon>
              </TableCell>
              <TableCell align="right">
                 {item.cartQty*item.cart.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CartTable;