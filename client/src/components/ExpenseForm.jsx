import { useState } from "react";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Education",
  "Health",
  "Other",
];

const emptyExpense = {
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().slice(0,10),
};

function ExpenseForm({ onAddExpense }){
    const [expense, setExpense] = useState(emptyExpense);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setExpense((currentExpense) => ({...currentExpense, [name]:value}));
        if(error) setError ("");
    };

    const clearForm = () => {
        setExpense(emptyExpense);
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!expense.title.trim()){
            setError("Please enter an expense title!");
            setSuccess("");
            return;
        }

        if(Number(expense.amount) <= 0){
            setError("Amount should be greater than zero!");
            setSuccess("");
            return;
        }

        setLoading(true);

        try{
            await onAddExpense({
                id: Date.now(),
                title: expense.title.trim(),
                amount: Number(expense.amount),
                category: expense.category,
                date: expense.date,
            });

            setSuccess("Expense added successfully!");
        }catch(err){
            setError(err.message || "Failed to add expense, Please try again.");
        }finally{
            setLoading(false);
        }
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
            {success && <p className="success-msg">{success}</p>}

            <label>
                Expense Title

                <input
                    name = "title"
                    type = "text"
                    placeholder = "e.g Stationary for exam"
                    value={expense.title}
                    onChange={handleChange}
                    disabled={loading}
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
                    disabled={loading}
                />
            </label>

            <label>
                Category

                <select
                    name = "category"
                    value = {expense.category}
                    onChange = {handleChange}
                    disabled = {loading}
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
                    disabled={loading}
                />
            </label>

            <div className="btn-row">
                <button type="submit" className="primary-btn" disabled={loading}>
                    {loading ? "Adding…" : "Add Expense"}
                </button>
                <button type="button" className="secondary-btn" onClick={clearForm} disabled={loading}>
                    Clear Form
                </button>
            </div> 
        </form>
    );
}

export default ExpenseForm;