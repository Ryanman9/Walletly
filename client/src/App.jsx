import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { initialExpenses } from "./data/dummyData";

import { useMemo, useState } from "react";

function App(){
    const [expenses, setExpenses] = useState(initialExpenses);
    const [month, setMonth] = useState("2026-06");
    const [budget, setBudget] = useState("10000");

    const totalExpenses = useMemo(
        () => expenses.reduce((total, expense) => total+expense.amount, 0),
    );

    const addExpense = (expense) => {
        setExpenses((currentExpenses) => [expense, ...currentExpenses]);
    };

    const saveBudget = (newBudget, newMonth) => {
        setBudget(newBudget);
        setMonth(newMonth);
    }

    return(
        <div className="app-page">
            <main className="main-content">
                <AppRoutes
                    expense = {expenses}
                    onAddExpense = {addExpense}
                    budget = {budget}
                    month = {month}
                    onSaveBudget = {saveBudget}
                />
            </main>
        </div>
    );
}

export default App;