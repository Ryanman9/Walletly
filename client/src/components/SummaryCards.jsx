function SummaryCards({budget, totalExpenses, transactionCount}){
    const summaryItems = [
        {label: "Monthly Budget", value: `₹${budget.toLocaleString()}`, helper: "Planning for this month"},
        { label: "Total Expenses", value: `₹${totalExpenses.toLocaleString()}`, helper: "Current spending" },
        {
            label: "Remaining Budget",
            value: `₹${Math.max(budget - totalExpenses, 0).toLocaleString()}`,
            helper: "Available balance",
        },
        { label: "Transactions", value: transactionCount, helper: "Expenses recorded" },
    ];

    return(
        <section className="summary-grid">
            {summaryItems.map((item) => (
                <article className="summary-card" key={item.label}>
                    <p>{item.label}</p>
                    <h3>{item.value}</h3>
                    <span>{item.helper}</span>
                </article>
            ))}
        </section>
    );
}

export default SummaryCards;