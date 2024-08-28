import { Navigate, useLocation,} from "react-router-dom";

const PrivateRoute = ({children}) => {
    const user=JSON.parse(localStorage.getItem('userData'))
    const location=useLocation()
    if(user &&user._id){
        return children
    }
    return <Navigate to="/login" state={{from:location}} replace/>
};

export default PrivateRoute;