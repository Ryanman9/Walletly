import "./ExpensesForm.css";

function ExpensesForm() {
  return (
    <div className="expense-form">
      <h2>Add Expense</h2>

      <form>
        <input 
          type="text"
          placeholder="Enter expense title"/>
        
        <input 
          type="number"
          placeholder="Enter amount"/>

        <select>
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