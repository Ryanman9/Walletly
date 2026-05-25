import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard/>}/>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRoutes;