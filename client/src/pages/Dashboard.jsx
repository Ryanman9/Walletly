import SummaryCards from "../components/SummaryCards";
import BudgetCard from "../components/BudgetCard"

function Dashboard(){
    return(
        <div className="main-page">
            <header className="page-header">
                <p className="over-heading">Student Budget Dashboard</p>
                <h1>Walletly-Expense Tracket</h1>
                <p>Track small daily spending</p>
            </header>

            <SummaryCards title="Budget" amount="5000"/>
            
            <div className="two-column">
                <BudgetCard />

                <section>Quick Overview of the month</section>
            </div>

        </div>
    );
}

export default Dashboard;