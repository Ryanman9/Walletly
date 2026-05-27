import { useState } from "react";

import BudgetCard from "../components/dashboard/BudgetCard";
import ExpensesForm from "../components/dashboard/ExpensesForm";
import ExpensesList from "../components/dashboard/ExpensesList";

function Dashboard(){
    const [expenses, setExpenses] = useState([]);

    function addExpense(expenseData){
        const newExpense = {
            id: Date.now(),
            ...expenseData,
        };

        setExpenses([...expenses, newExpense]);
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <div className="budget-container">
                <BudgetCard
                    title="Monthly Budget"
                    amount={10000}
                    spent={4500}
                />

                <BudgetCard
                    title="Food Budget"
                    amount={5000}
                    spent={3200}
                />

                <BudgetCard
                    title="Travel Budget"
                    amount={3000}
                    spent={1200}
                />
            </div>

            <div className="dashboard-bottom">
                <ExpensesForm onAddExpense = {addExpense}/>
                <ExpensesList expenses={expenses}/>
            </div>
        </div>
    );
}

export default Dashboard;