import { useState } from "react";
import "./ExpensesForm.css";

function ExpensesForm({onAddExpense}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  function handleSubmit(e){
    e.preventDefault();

    const expenseData = {
      title,
      amount,
      category,
    };

    onAddExpense(expenseData);

    setTitle("");
    setAmount("");
    setCategory("");
  }

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Enter expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <input 
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>

        <button type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpensesForm;