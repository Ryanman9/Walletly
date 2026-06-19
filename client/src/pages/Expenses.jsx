import ExpenseList from "../components/ExpenseList";
import "../styles/ExpenseList.css";

function Expenses({ expenses, onDeleteExpense }){
    return(
        <div className="page-container">
            <header className="page-header">
                <p className="over-heading">Search, Filter, Sort</p>
                <h1>Expenses</h1>
                <p>Review every expense entry and remove mistakes</p>
            </header>
            
            <ExpenseList expenses={expenses} onDeleteExpense={onDeleteExpense}/>
        </div>
    );
}

export default Expenses;