import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const PaymentFail = () => {
    return (
        <div style={{height:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div>
                <h1>Payment Fail</h1>
                <div style={{textAlign:'center'}}>
                    <Link to="/addToCart"><Button size="small" color="secondary" variant="contained">Again Checkout</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;