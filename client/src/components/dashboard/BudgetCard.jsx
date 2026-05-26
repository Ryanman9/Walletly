import "./BudgetCard.css";

function BudgetCard({title, amount, spent}){
    const remaining = amount - spent;

    return(
        <div className="budget-card">
            <h3>{title}</h3>
            
            <p className="budget-amount">
                ₹{spent} / ₹{amount}
            </p>
            
            <p className="remaining">
                Remaining: ₹{remaining}
            </p>

            <div className="progress-bar">
                <div className="progress-fill"
                style={{
                    width: `${(spent/amount)*100}%`,
                }}
                ></div>
            </div>
        </div>
    );
}

export default BudgetCard;