import BudgetCard from "../components/dashboard/BudgetCard";
import ExpensesForm from "../components/dashboard/ExpensesForm";
import ExpensesList from "../components/dashboard/ExpensesList";

function Dashboard(){
    return (
        <div>
            <h1>Dashboard</h1>

            <BudgetCard/>

            <ExpensesForm/>
            <ExpensesList/>
        </div>
    );
}

export default Dashboard;