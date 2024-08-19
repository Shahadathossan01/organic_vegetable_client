import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar/Navbar";


const Main = () => {
    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default Main;