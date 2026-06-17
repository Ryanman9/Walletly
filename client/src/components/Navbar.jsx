import { NavLink } from "react-router-dom";
import { Home, PlusCircle, Receipt, BarChart3, Wallet } from "lucide-react";

const navItems = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Add Expense", path: "/addexpense", icon: PlusCircle },
    { label: "Expenses", path: "/expenses", icon: Receipt },
    { label: "Analytics", path: "/analytics", icon: BarChart3 },
    { label: "Budget", path: "/budget", icon: Wallet },
]

function Navbar({isDarkTheme, onToggleTheme}){
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
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return(
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({isActive}) => (isActive? "nav-link active" : "nav-link")}
                    >   
                        <Icon size={18}/>
                        <span>{item.label}</span>
                    </NavLink>
                    );
                })}
            </nav>

            <button
                type="button"
                className="theme-toggle"
                onClick={onToggleTheme}
            >
                <span>{isDarkTheme ? "☀️" : "🌙"}</span>
                {isDarkTheme ? "Light Theme" : "Dark Theme"}
            </button>
        </aside>
    );
}

export default Navbar;