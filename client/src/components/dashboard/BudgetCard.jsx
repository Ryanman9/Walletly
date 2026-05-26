function BudgetCard(){
    return(
        <div className="budget-card">
            <h2>Monthly Budget</h2>
            
            <div className="budget-info">
                <p>Total Budget: ₹10,000</p>
                <p>Budget spent: ₹4,000</p>
                <p>Remaining: ₹6,000</p>
            </div>
        </div>
    );
}

export default BudgetCard;