function ExpenseList(){
    return(
        <section className="expenselist-page">
            <div>
                <div className="section-heading">
                    <p className="over-heading">All Transaction</p>
                    <h2>Expense List</h2>
                </div>
            </div>

            <div className="filters">
                
            </div>

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ExpenseList;