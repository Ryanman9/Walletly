function ExpenseForm({}){

    return(
        <form className="form-page">
            <div className="section-heading">
                <div>
                    <p className="over-heading">New entry</p>
                    <h2>Add Expense</h2>
                </div>
            </div>

            <label>
                Expense Title
            </label>

            <label>
                Amount
            </label>

            <label>
                Category
            </label>

            <label>
                Date
            </label>

            <div className="btn-row">
                <button type="submit" className="primary-btn">
                    Add Expense
                </button>
                <button type="button" className="secondary-btn">
                    Clear Form
                </button>
            </div> 
        </form>
    );
}

export default ExpenseForm;