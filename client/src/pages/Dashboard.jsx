import SummaryCards from "../components/SummaryCards";
import BudgetCard from "../components/BudgetCard";
import "../styles/Dashboard.css";

function Dashboard({budget, month, expenses, totalExpenses}){
    const recentExpenses = [...expenses]
        .sort((first, second) => new Date(second.date) - new Date(first.date))
        .slice(0,5);

    const highestExpense = expenses.reduce(
        (highest, expense) => (expense.amount > highest.amount ? expense : highest),
        {amount : 0, title: "No expenses yet"}
    );

    return(
        <div className="page-container">
            <header className="page-header">
                <p className="over-heading">Budget Dashboard</p>
                <h1>Walletly-Expense Tracker</h1>
                <p>Track small daily spending</p>
            </header>

            <SummaryCards 
                budget={budget}
                totalExpenses = {totalExpenses}
                transactionCount = {expenses.length}
            />
            
            <div className="two-column">
                <BudgetCard budget={budget} month={month} totalExpenses={totalExpenses}/>

                <section className="stat-card">
                    <div className="section-heading">
                        <div>
                            <p className="over-heading">Quick stats</p>
                            <h2>This month</h2>
                        </div>
                    </div>

                    <div className="stats-list">
                        <p>
                            Average transaction
                            <strong>
                                ₹{expenses.length ? Math.round(totalExpenses/expenses.length).toLocaleString() : 0}
                            </strong>
                        </p>
                        <p>
                            Biggest spend
                            <strong>{highestExpense.title}</strong>
                        </p>
                        <p>
                            Budget status
                            <strong>{totalExpenses <= budget ? "On track" : "Over budget"}</strong>
                        </p>
                    </div>
                </section>
            </div>

            <section className="recent-card">
                <div className="section-heading">
                    <div>
                        <p className="over-heading">Latest 5</p>
                        <h2>Recent Expenses</h2>
                    </div>
                </div>

                <div className="recent-list">
                    {recentExpenses.map((expense) => (
                        <article className="recent-item" key={expense.id}>
                            <div>
                                <h3>{expense.title}</h3>
                                <p>{expense.category} • {expense.date}</p>
                            </div>
                            <strong>₹{expense.amount.toLocaleString()}</strong>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Dashboard;