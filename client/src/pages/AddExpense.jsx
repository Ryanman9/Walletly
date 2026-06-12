import ExpenseForm from "../components/ExpenseForm";

function AddExpense(){
    return (
        <div className="addExpense-page">
            <header className="page-header">
                <p className="over-heading">Record spending</p>
                <h1>Addd Expense</h1>

                <p>Add simple day-to-day expenses</p>
            </header>

            <ExpenseForm />
        </div>
    );
}

export default AddExpense;