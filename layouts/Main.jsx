import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";


const Main = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>
            <div style={{marginTop:'80px'}}>
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Main;