import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const PaymentSuccess = () => {
    return (
        <div style={{height:'300px',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div>
                <h1>Payment Success</h1>
                <div style={{textAlign:'center'}}>
                    <Link to="/order"><Button size="small" color="secondary" variant="contained">Show Order</Button></Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;