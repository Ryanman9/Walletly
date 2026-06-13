import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Budget from "../pages/Budget";
import Analytics from "../pages/Analytics";
import AddExpense from "../pages/AddExpense";

function AppRoutes({onAddExpense}) {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/expenses" element={<Expenses/>}/>
            <Route path="/budget" element={<Budget/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/addexpense" element={<AddExpense onAddExpense={onAddExpense}/>}/>
        </Routes>
    );
}

export default AppRoutes;