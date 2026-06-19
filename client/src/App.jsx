import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { initialExpenses } from "./data/dummyData";

import { useMemo, useState } from "react";

function App(){
    const [expenses, setExpenses] = useState(initialExpenses);
    const [month, setMonth] = useState("2026-06");
    const [budget, setBudget] = useState(10000);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const toggleTheme = () => {
        setIsDarkTheme((currentTheme) => !currentTheme);
    };

    const totalExpenses = useMemo(() => {
        return expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );
    }, [expenses]);

    const addExpense = (expense) => {
        setExpenses((currentExpenses) => [expense, ...currentExpenses]);
    };

    const saveBudget = (newBudget, newMonth) => {
        setBudget(newBudget);
        setMonth(newMonth);
    }

    const deleteExpense = (expenseId) => {
        setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense.id !== expenseId)
        );
    };

    return(
        <div className= {isDarkTheme ? "app-page dark-theme" : "app-page"}>
            <Navbar isDarkTheme={isDarkTheme} onToggleTheme={toggleTheme} />
            <main className="main-content">
                <AppRoutes
                    expenses = {expenses}
                    onAddExpense = {addExpense}
                    budget = {budget}
                    month = {month}
                    onSaveBudget = {saveBudget}
                    onDeleteExpense = {deleteExpense}
                    totalExpenses={totalExpenses}
                />
            </main>
        </div>
    );
}

export default App;