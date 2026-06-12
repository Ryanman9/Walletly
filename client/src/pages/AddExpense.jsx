function AddExpense(){
    return (
        <div>
            <h2>Add Expense</h2>
            <input type="text" placeholder="Expense name"/>
            <input type="number" placeholder="Amount"/>

            <select>
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Entertainment</option>
            </select>

            <button>Add Expense</button>
        </div>
    );
}

export default AddExpense;