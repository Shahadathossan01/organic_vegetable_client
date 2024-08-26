import { Button } from "@mui/material";
import { useStoreActions} from "easy-peasy";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const {registerUser}=useStoreActions(action=>action.user)
    const onSubmit=data=>{
        registerUser(data)
        navigate('/login')
        toast.success('successfully registered, Please Login!',{
            position:'bottom-left'
        })

    }
    return (
        <div style={{width:'50%',margin:'auto',marginTop:'80px'}}>
            <h1 style={{textAlign:'center',marginBottom:'40px'}}>Signup</h1>
            <div style={{textAlign:'center'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('username',{required:true})} style={{width:'50%',fontSize:'105%',marginBottom:'20px'}} type="text" name="username" placeholder="username"/><br />
                    <input {...register('email',{required:true})} style={{width:'50%',fontSize:'105%',marginBottom:'20px'}} type="email" name="email" placeholder="email"/><br />
                    <input {...register('password',{required:true})} style={{width:'50%',fontSize:'105%',marginBottom:'20px'}} type="password" name="password" placeholder="password" /><br />
                    <Button type="submit" sx={{width:'50%'}} variant="contained" color="info">
                        Signup
                    </Button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;