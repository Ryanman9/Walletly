import SummaryCards from "../components/SummaryCards";

function Dashboard(){
    return(
        <div>
            <header>
                <p>Student Budget Dashboard</p>
                <h1>Walletly-Expense Tracket</h1>
                <p>Track small daily spending</p>
            </header>

            <SummaryCards title="Budget" amount="5000"/>
            <section>Budget Overview</section>
            <section>Recent Expenses</section>
        </div>
    );
}

export default Dashboard;