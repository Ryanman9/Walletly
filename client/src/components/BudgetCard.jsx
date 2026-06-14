function formatMonth(month){
    const [year, monthNumber] = month.split("-");
    const date = new Date(Number(year), Number(monthNumber)-1);

    return date.toLocaleDateString("en-US", {month: "long", year: "numeric"});
}

function BudgetCard({budget, month, totalExpenses}){
    const remaining = Math.max(budget-totalExpenses,0);
    const spentPercent = budget > 0 ? Math.min((totalExpenses/budget) * 100, 100) : 0;

    return (
        <section className="buget-card">
            <div className="section-heading">
                <div>
                    <p className="over-heading">Budget progress</p>
                    <h2>{formatMonth(month)}</h2>
                </div>
                <span>{spentPercent.toFixed(0)} % used</span>
            </div>

            <div className="progress-track">
                <div className="progress-fill" style={{width: `${spentPercent}%`}}/>
            </div>

            <div className="budget-details">
                <p>
                    Budget <strong>₹{budget.toLocaleString()}</strong>
                </p>
                <p>
                    Remaining <strong>₹{remaining.toLocaleString()}</strong>
                </p>
            </div>
        </section>
    );
}

export default BudgetCard;