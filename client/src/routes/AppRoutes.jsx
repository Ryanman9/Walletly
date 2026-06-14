import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Budget from "../pages/Budget";
import Analytics from "../pages/Analytics";
import AddExpense from "../pages/AddExpense";

function AppRoutes({onAddExpense, month, budget, onSaveBudget, expenses, onDeleteExpense, totalExpenses}) {
    return (
        <Routes>
            <Route path="/" element={
                <Dashboard
                    budget={budget}
                    month={month}
                    expenses={expenses}
                    totalExpenses={totalExpenses}
                />}/>
            <Route path="/expenses" element={<Expenses expenses={expenses} onDeleteExpense={onDeleteExpense}/>}/>
            <Route path="/budget" element={<Budget budget={budget} month={month} onSaveBudget={onSaveBudget}/>}/>
            <Route path="/analytics" element={<Analytics/>}/>
            <Route path="/addexpense" element={<AddExpense onAddExpense={onAddExpense}/>}/>
        </Routes>
    );
}

export default AppRoutes;