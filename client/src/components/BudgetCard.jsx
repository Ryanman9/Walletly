function formatMonth(month){
    const [year, monthNumber] = month.split("-");
    const date = new Date(Number(year), Number(monthNumber)-1);

    return date.toLocaleDateString("en-US", {month: "long", year: "numeric"});
}

function BudgetCard({budget, month, totalExpenses}){
    const remaining = budget-totalExpenses;
    const spentPercent = budget > 0 ? Math.min((totalExpenses/budget) * 100, 100) : 0;

    return (
        <section className="budget-card">
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
                    {remaining >= 0 ? "Remaining" : "Exceeded by"}{" "}
                    <strong>₹{Math.abs(remaining).toLocaleString()}</strong>
                </p>
            </div>

            <div className="budget-info">
                <p
                    className={
                        remaining > budget * 0.5
                            ? "budget-healthy"
                            : remaining > budget * 0.1
                            ? "budget-warning"
                            : remaining > 0
                            ? "budget-danger"
                            : remaining === 0
                            ? "budget-used"
                            : "budget-exceeded"
                    }
                >
                        {remaining > budget * 0.5
                        ? "✓ Spending looks healthy"
                        : remaining > budget * 0.1
                        ? "◔ Approaching budget limit"
                        : remaining > 0
                        ? "⚠ Almost at budget limit"
                        : remaining === 0
                        ? "• Budget fully used"
                        : "☹ Budget exceeded"
                    }
                </p>
            </div>
        </section>
    );
}

export default BudgetCard;