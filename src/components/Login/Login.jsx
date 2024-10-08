import { Button } from "@mui/material";
import { useStoreActions} from "easy-peasy";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || "/"
    const {register,handleSubmit}=useForm()
    const {loginUser}=useStoreActions(action=>action.user)

    const onSubmit=async(data)=>{
       await loginUser(data)
        navigate(from,{replace:true})
    }

    return (
        <div style={{width:'50%',margin:'auto',marginTop:'80px'}}>
            <h1 style={{textAlign:'center',marginBottom:'40px'}}>Login</h1>
            <div style={{textAlign:'center'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('email',{required:true})} style={{width:'50%',fontSize:'105%',marginBottom:'20px'}} type="email" name="email" placeholder="Enter your email"/><br />
                    <input {...register('password',{required:true})} style={{width:'50%',fontSize:'105%',marginBottom:'20px'}} type="password" name="password" placeholder="Enter your password" /><br />
                    {/* <Button color="info">forgot password</Button><br /> */}
                    <Button type="submit" sx={{width:'50%'}} variant="contained" color="info">
                        login
                    </Button>
                </form>
                <p>Do not have an account? <Link to='/register'>Signup</Link></p>
            </div>
        </div>
    );
};

export default Login;