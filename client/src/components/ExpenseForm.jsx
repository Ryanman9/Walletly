import { useState } from "react";
import { categories } from "../data/dummyData";

const emptyExpense = {
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0,10),
};

function ExpenseForm({ onAddExpense }){
    const [expense, setExpense] = useState(emptyExpense);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const {name, value} = event.target;
        setExpense((currentExpense) => ({...currentExpense, [name]:value}));
    };

    const clearForm = () => {
        setExpense(emptyExpense);
        setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!expense.title.trim()){
            setError("Please enter an expense title!");
            return;
        }

        if(Number(expense.amount) <= 0){
            setError("Amount should be greater than zero!");
            return;
        }

        onAddExpense({
            id: Date.now(),
            title: expense.title.trim(),
            amount: Number(expense.amount),
            category: expense.category,
            date: expense.date,
        });

        clearForm();
    };

    return(
        <form className="form-page" onSubmit={handleSubmit}>
            <div className="section-heading">
                <div>
                    <p className="over-heading">New entry</p>
                    <h2>Add Expense</h2>
                </div>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <label>
                Expense Title

                <input
                    name = "title"
                    type = "text"
                    placeholder = "e.g Stationary for exam"
                    value={expense.title}
                    onChange={handleChange}
                />
            </label>

            <label>
                Amount

                <input 
                    name = "amount"
                    type = "number"
                    min = "0"
                    placeholder = "₹500"
                    value = {expense.amount}
                    onChange = {handleChange}
                />
            </label>

            <label>
                Category

                <select
                    name = "category"
                    value = {expense.category}
                    onChange = {handleChange}
                >
                    {categories.map((category) => (
                        <option key={category}
                            value={category}
                        >
                            {category}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Date

                <input 
                    name = "date"
                    type = "date"
                    value = {expense.date}
                    onChange = {handleChange}
                />
            </label>

            <div className="btn-row">
                <button type="submit" className="primary-btn">
                    Add Expense
                </button>
                <button type="button" className="secondary-btn">
                    Clear Form
                </button>
            </div> 
        </form>
    );
}

export default ExpenseForm;