import BudgetCard from "../components/dashboard/BudgetCard";
import ExpensesForm from "../components/dashboard/ExpensesForm";
import ExpensesList from "../components/dashboard/ExpensesList";

function Dashboard(){
    return (
        <div>
            <h1>Dashboard</h1>

            <div className="budget-container">
                <BudgetCard
                    title="Monthly Budget"
                    amount={10000}
                    spent={4500}
                />

                <BudgetCard
                    title="Food Budget"
                    amount={5000}
                    spent={3200}
                />

                <BudgetCard
                    title="Travel Budget"
                    amount={3000}
                    spent={1200}
                />

            <ExpensesForm/>
            <ExpensesList/>
            </div>
        </div>
    );
}

export default Dashboard;