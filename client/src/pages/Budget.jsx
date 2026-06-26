import { useState, useEffect } from "react";
import { userAPI } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../styles/BudgetPage.css";

function Budget({budget, month, onSaveBudget}){
    const { updateUser, user } = useAuth();

    const [budgetAmount, setBudgetAmount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setBudgetAmount(budget);
        setSelectedMonth(month);
    }, [budget, month]);

    const handleReset = () => {
        setBudgetAmount(0);
        setSelectedMonth(month || "2026-06");
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if(Number(budgetAmount) < 0){
            setError("Budget cannot be negative!");
            return;
        }
        
        setLoading(true);
        try{
            const data = await userAPI.updateBudget({
                budget: Number(budgetAmount),
                budgetMonth: selectedMonth,
            });

            updateUser(data.user);
            onSaveBudget(Number(budgetAmount), selectedMonth);

            setSuccess(`✓ ${data.message}`);
            setTimeout(() => {
                handleReset();
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to save budget. Please try again.");
        } finally {
            setLoading(false);
        }   
    };

    return(
        <div className="page-container">
            <header className="page-header">
                <p className="over-heading">Plan first</p>
                <h1>Set Monthly Budget</h1>
                <p>Choose a realistic monthly spending limit for your student expenses.</p>
            </header>

            <div className="current-budget-info">
                <p>
                Currently saved: <strong>₹{Number(budget).toLocaleString()}</strong> for <strong>{month}</strong>
                </p>
            </div>

            <form className="card-form" onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}

                <label>
                    Monthly Budget Amount
                    <input 
                        type="number"
                        min="0"
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        disabled={loading}
                        placeholder="e.g. 10000"
                    />
                </label>

                <label>
                    Month Selector

                    <input 
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        disabled={loading}
                    />
                </label>

                <div className="btn-row">
                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? "Saving…" : "Save Budget"}
                    </button>
                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        Reset
                    </button>
                </div>
            </form>                
        </div>
    );
}

export default Budget;