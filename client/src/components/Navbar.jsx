import { NavLink } from "react-router-dom";

const navItems = [
    {label:"Dashboard", path:"/"},
    {label:"Add Expense", path:"/addexpense"},
    {label:"Expenses", path:"/expenses"},
    {label:"Analytics", path:"/analytics"},
    {label:"Budget", path:"/budget"},
]

function Navbar(){
    return(
        <aside className="sidebar">
            <div className="logo">
                <span className="logo-icon">W</span>
                <div>
                    <h1>Walletly</h1>
                    <p>Expense Tracker</p>
                </div>
            </div>

            <nav className="nav-links">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({isActive}) => (isActive? "nav-link active" : "nav-link")}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Navbar;