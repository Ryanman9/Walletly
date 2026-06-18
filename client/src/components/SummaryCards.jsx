import { ArrowRightLeft, Wallet, WalletMinimal, List } from "lucide-react";

function SummaryCards({budget, totalExpenses, transactionCount}){
    const summaryItems = [
        {label: "Monthly Budget", value: `₹${budget.toLocaleString()}`, helper: "Planning for this month", icon: Wallet},
        { label: "Total Expenses", value: `₹${totalExpenses.toLocaleString()}`, helper: "Current spending", icon: ArrowRightLeft },
        {
            label: "Remaining Budget",
            value: `₹${Math.max(budget - totalExpenses, 0).toLocaleString()}`,
            helper: "Available balance",
            icon: WalletMinimal
        },
        { label: "Transactions", value: transactionCount, helper: "Expenses recorded", icon: List },
    ];

    return (
        <section className="summary-grid">
            {summaryItems.map((item) => {
            const Icon = item.icon;

            return (
                <article className="summary-card" key={item.label}>

                <div className="summary-top">

                    <div className="summary-icon">
                    <Icon size={24} />
                    </div>

                    <div className="summary-content">
                    <p>{item.label}</p>
                    <h3>{item.value}</h3>
                    <span>{item.helper}</span>
                    </div>

                </div>

                </article>
            );
        })}
        </section>
    );
}

export default SummaryCards;