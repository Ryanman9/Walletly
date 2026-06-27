import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

import { useState, useMemo, useCallback, useEffect } from "react";
import { expenseAPI } from "./api/api";

function App() {
    const { user, isAuthenticated, updateUser } = useAuth();

    const [expenses, setExpenses] = useState([]);
    const [expensesLoading, setExpensesLoading] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const budget = user?.budget?? 0;
    const month = user?.budgetMonth ?? new Date().toISOString().slice(0, 7);

    const fetchExpenses = useCallback(async () => {
        if(!isAuthenticated) return;
        setExpensesLoading(true);

        try{
            const data = await expenseAPI.getAll();
            setExpenses(data.expenses || []);
        }
        catch(err){
            console.error("Failed to load expenses:", err.message);
        }
        finally{
            setExpensesLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    useEffect(() => {
        if (!isAuthenticated) setExpenses([]);
    }, [isAuthenticated]);

    const totalExpenses = useMemo(() => {
        return expenses.reduce(
            (total, expense) => total + expense.amount,
            0
        );
    }, [expenses]);

    const toggleTheme = () => setIsDarkTheme((t) => !t);

    const addExpense = useCallback(async (expense) => {
        const data = await expenseAPI.create(expense);
        setExpenses((prev) => [data.expense, ...prev]);
    }, []);

    const deleteExpense = useCallback(async (expenseId) => {
        setExpenses((prev) => prev.filter((e) => e._id !== expenseId));
        try {
            await expenseAPI.delete(expenseId);
        } catch (err) {
            console.error("Delete failed:", err.message);
            fetchExpenses();
        }
    }, [fetchExpenses]);

    const updateExpense = useCallback((updatedExpense) => {
        setExpenses((prev) =>
            prev.map((e) => (e._id === updatedExpense._id ? updatedExpense : e))
        );
    }, []);

    const saveBudget = useCallback(async (newBudget, newMonth) => {
        updateUser({ ...user, budget: newBudget, budgetMonth: newMonth });
    }, [user, updateUser]);

    return (
        <div className={isDarkTheme ? "app-page dark-theme" : "app-page"}>
    
        {isAuthenticated && <Navbar />}
    
        <div className={isAuthenticated ? "app-right" : "app-right full-width"}>
            {isAuthenticated && (
            <TopBar isDarkTheme={isDarkTheme} onToggleTheme={toggleTheme} />
            )}
    
            <main className="main-content">
            <AppRoutes
                expenses={expenses}
                expensesLoading={expensesLoading}
                onAddExpense={addExpense}
                budget={budget}
                month={month}
                onSaveBudget={saveBudget}
                onUpdateExpense={updateExpense}
                onDeleteExpense={deleteExpense}
                totalExpenses={totalExpenses}
            />
            </main>
        </div>
    
        </div>
    );
}

export default App;