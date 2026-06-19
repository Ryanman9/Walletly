import { useState } from "react";
import "../styles/BudgetPage.css";

function Budget({budget, month, onSaveBudget}){
    const [budgetAmount, setBudgetAmount] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReset = () => {
        setBudgetAmount(0);
        setSelectedMonth("2026-06");
        setError("");
        setSuccess("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(Number(budgetAmount) < 0){
            setError("Budget cannot be negative!");
            return;
        }

        onSaveBudget(Number(budgetAmount), selectedMonth);
        setSuccess("Budget saved successfully");

        setTimeout(() => {
            handleReset();
        }, 2000);
    };

    return(
        <div className="page-container">
            <header className="page-header">
                <p className="over-heading">Plan first</p>
                <h1>Set Monthly Budget</h1>
                <p>Choose a realistic monthly spending limit for your student expenses.</p>
            </header>

            <form className="card-form" onSubmit={handleSubmit}>
                {error && <p className="error-msg">{error}</p>}
                {success && <p className="success-msg">{success}</p>}

                <label>
                    Monthly Budget Amount
                    <input 
                        type = "number"
                        value={budgetAmount}
                        onChange={(event) => setBudgetAmount(event.target.value)}
                    />
                </label>

                <label>
                    Month Selector

                    <input 
                        type="month"
                        value={selectedMonth}
                        onChange={(event) => setSelectedMonth(event.target.value)}
                    />
                </label>

                <div className="btn-row">
                    <button type="submit" className="primary-btn">
                        Save Budget
                    </button>
                    <button type="button" className="secondary-btn" onClick={handleReset}>
                        Reset
                    </button>
                </div>
            </form>
                
        </div>
    );
}

export default Budget;