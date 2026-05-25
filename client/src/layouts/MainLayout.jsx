import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout(){
    return(
        <div>
            <Sidebar/>

            <div>
                <Navbar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default MainLayout;