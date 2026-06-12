function Budget(){
    return(
        <div className="budget-page">
            <header className="page-header">
                <p className="over-heading">Plan first</p>
                <h1>Set Monthly Budget</h1>
                <p>Choose a realistic monthly spending limit for your student expenses.</p>
            </header>

            <form className="budget-form">
                <label>
                    Monthly Budget Amount
                </label>

                <label>
                    Month Selector
                </label>

                <div className="btn-row">
                    <button type="submit" className="primary-btn">
                        Save Budget
                    </button>
                    <button type="button" className="secondary-btn">
                        Reset
                    </button>
                </div>
            </form>
                
        </div>
    );
}

export default Budget;