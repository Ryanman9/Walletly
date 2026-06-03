import { useState } from "react";

import BudgetCard from "../components/dashboard/BudgetCard";
import ExpensesForm from "../components/dashboard/ExpensesForm";
import ExpensesList from "../components/dashboard/ExpensesList";
import BudgetForm from "../components/dashboard/BudgetForm";

function Dashboard(){
    const [expenses, setExpenses] = useState([]);
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [foodBudget, setFoodBudget] = useState(0);
    const [travelBudget, setTravelBudget] = useState(0);

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

    function setBudgetData(budgetData) {
        setMonthlyBudget(budgetData.monthly);
        setFoodBudget(budgetData.food);
        setTravelBudget(budgetData.travel);
    }

    function addExpense(expenseData){
        const newExpense = {
            id: Date.now(),
            ...expenseData,
        };

        setExpenses((prevExpenses) => [
            ...prevExpenses,
            newExpense
        ]);;
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            <BudgetForm onSetBudget={setBudgetData} />

            <div className="budget-container">
                <BudgetCard
                    title="Monthly Budget"
                    amount={monthlyBudget}
                    spent={totalSpent}
                />

                <BudgetCard
                    title="Food Budget"
                    amount={foodBudget}
                    spent={foodSpent}
                />

                <BudgetCard
                    title="Travel Budget"
                    amount={travelBudget}
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