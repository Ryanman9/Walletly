import ExpenseForm from "../components/ExpenseForm";
import "../styles/ExpenseForm.css";

function AddExpense({ onAddExpense }){
    return (
        <div className="page-container">
            <header className="page-header">
                <p className="over-heading">Record spending</p>
                <h1>Add Expense</h1>

                <p>Add simple day-to-day expenses</p>
            </header>

            <ExpenseForm onAddExpense = {onAddExpense}/>
        </div>
    );
}

export default AddExpense;