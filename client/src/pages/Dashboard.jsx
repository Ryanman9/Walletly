import SummaryCards from "../components/SummaryCards";
import BudgetCard from "../components/BudgetCard"

function Dashboard({budget, month, expenses, totalExpenses}){
    const recentExpenses = [...expenses]
        .sort((first, second) => new Date(second.date) - new Date(first.date))
        .slice(0,5);

    const highestExpense = expenses.reduce(
        (highest, expense) => (expense.amount > highest.amount ? expense : highest),
        {amount : 0, title: "No expenses yet"}
    );

    return(
        <div className="main-page">
            <header className="page-header">
                <p className="over-heading">Student Budget Dashboard</p>
                <h1>Walletly-Expense Tracket</h1>
                <p>Track small daily spending</p>
            </header>

            <SummaryCards 
                budget={budget}
                totalExpenses = {totalExpenses}
                transactionCount = {expenses.length}
            />
            
            <div className="two-column">
                <BudgetCard />

                <section>Quick Overview of the month</section>
            </div>

        </div>
    );
}

export default Dashboard;