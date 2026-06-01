import { useState } from "react";

import BudgetCard from "../components/dashboard/BudgetCard";
import ExpensesForm from "../components/dashboard/ExpensesForm";
import ExpensesList from "../components/dashboard/ExpensesList";

function Dashboard(){
    const [expenses, setExpenses] = useState([]);

    const totalSpent = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const foodSpent = expenses
    .filter((expense) => expense.category === "Food")
    .reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const travelSpent = expenses
    .filter((expense) => expense.category === "Travel")
    .reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

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
                    spent={totalSpent}
                />

                <BudgetCard
                    title="Food Budget"
                    amount={5000}
                    spent={foodSpent}
                />

                <BudgetCard
                    title="Travel Budget"
                    amount={3000}
                    spent={travelSpent}
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