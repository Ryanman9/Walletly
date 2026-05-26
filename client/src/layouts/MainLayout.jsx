import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function MainLayout(){
    return(
        <div className="app-layout">
            <Sidebar/>

            <div className="main-section">
                <Navbar/>

                <div className="page-content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;