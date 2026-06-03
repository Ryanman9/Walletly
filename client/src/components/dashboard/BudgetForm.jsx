import { useState } from "react";
import "./BudgetForm.css";

function BudgetForm({ onSetBudget }) {

    const [monthly, setMonthly] = useState("");
    const [food, setFood] = useState("");
    const [travel, setTravel] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        onSetBudget({
            monthly: Number(monthly),
            food: Number(food),
            travel: Number(travel),
        });

        setMonthly("");
        setFood("");
        setTravel("");
    }

    return (
        <form className="budget-form" onSubmit={handleSubmit}>

            <input
                type="number"
                placeholder="Monthly Budget"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
            />

            <input
                type="number"
                placeholder="Food Budget"
                value={food}
                onChange={(e) => setFood(e.target.value)}
            />

            <input
                type="number"
                placeholder="Travel Budget"
                value={travel}
                onChange={(e) => setTravel(e.target.value)}
            />

            <button type="submit">
                Save Budget
            </button>

        </form>
    );
}

export default BudgetForm;