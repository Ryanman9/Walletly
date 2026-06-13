import { useMemo, useState } from "react";
import { categories } from "../data/dummyData";

function ExpenseList({ expenses, onDeleteExpense }){
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date-desc");

    const filteredExpenses = useMemo(() => {
        return expenses
            .filter((expense) =>
                expense.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
            )
            .filter((expense) => categoryFilter === "All" || expense.category === categoryFilter)
            .sort((first,second) => {
                if(sortBy === "date-asc") return new Date(first.date) - new Date(second.date);
                if(sortBy === "amount-desc") return second.amount - first.amount;
                if(sortBy === "amount-asc") return first.amount - second.amount;

                return new Date(second.date) - new Date(first.date);
            });
    }, [categoryFilter,expenses, searchTerm, sortBy]);

    return(
        <section className="expenselist-page">
            <div>
                <div className="section-heading">
                    <p className="over-heading">All Transaction</p>
                    <h2>Expense List</h2>
                </div>
            </div>

            <div className="filters">
                <input 
                    type="search"
                    placeholder="Search expense"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />

                <select
                    value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}
                >
                    <option value="All"></option>
                        {categories.map((category) =>(
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                </select>

                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="date-desc">Newest Date</option>
                    <option value="date-asc">Oldest Date</option>
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                </select>
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
                        {filteredExpenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.title}</td>
                                <td>
                                    <span className="category-pill">{expense.category}</span>
                                </td>
                                <td>₹{expense.amount.toLocaleString()}</td>
                                <td>{expense.date}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="text-button"
                                        onClick={() => onDeleteExpense(expense.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {filteredExpenses.length === 0 && (
                <p className="empty-state">No expenses match your search yet.</p>
            )}
        </section>
    );
}

export default ExpenseList;