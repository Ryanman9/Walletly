import ExpenseList from "../components/ExpenseList";

function Expenses(){
    return(
        <div className="Expense-page">
            <header className="page-header">
                <p className="over-heading">Search, Filter, Sort</p>
                <h1>Expenses</h1>
                <p>Review every expense entry and remove mistakes</p>
            </header>
            
            <ExpenseList />
        </div>
    );
}

export default Expenses;