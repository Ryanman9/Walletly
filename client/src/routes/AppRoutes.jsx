import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import Budget from "../pages/Budget";
import Analytics from "../pages/Analytics";
import AddExpense from "../pages/AddExpense";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/Protectedroute";

function AppRoutes({onAddExpense, month, budget, onSaveBudget, expenses, onDeleteExpense, totalExpenses, expensesLoading, onUpdateExpense}) {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
                path="/register"
                element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
            />
        
            <Route
                path="/"
                element={
                <ProtectedRoute>
                    <Dashboard
                        budget={budget}
                        month={month}
                        expenses={expenses}
                        totalExpenses={totalExpenses}
                        loading={expensesLoading}
                    />
                </ProtectedRoute>
                }
            />
            <Route
                path="/expenses"
                element={
                <ProtectedRoute>
                    <Expenses
                        expenses={expenses}
                        onDeleteExpense={onDeleteExpense}
                        onUpdateExpense={onUpdateExpense}
                        loading={expensesLoading}
                    />
                </ProtectedRoute>
                }
            />
            <Route
                path="/addexpense"
                element={
                <ProtectedRoute>
                    <AddExpense onAddExpense={onAddExpense} />
                </ProtectedRoute>
                }
            />
            <Route
                path="/budget"
                element={
                <ProtectedRoute>
                    <Budget budget={budget} month={month} onSaveBudget={onSaveBudget} />
                </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                <ProtectedRoute>
                    <Analytics expenses={expenses} budget={budget} month={month} />
                </ProtectedRoute>
                }
            />
        
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRoutes;