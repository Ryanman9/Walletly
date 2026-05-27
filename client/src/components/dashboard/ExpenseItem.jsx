import "./ExpenseItem";

function ExpenseItem({ title, amount, category }) {
  return (
    <div className="expense-item">
      <div>
        <h3>{title}</h3>
        <p>{category}</p>
      </div>

      <h3>₹{amount}</h3>
    </div>
  );
}

export default ExpenseItem;