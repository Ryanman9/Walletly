import ExpenseItem from "./ExpenseItem";
import "./ExpensesList";

function ExpensesList({expenses}) {
  return (
    <div className="expenses-list">
      <h2>Expenses List</h2>

      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          category={expense.category}
        />
      ))}
    </div>
  );
}

export default ExpensesList;