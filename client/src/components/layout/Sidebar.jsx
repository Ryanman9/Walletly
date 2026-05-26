import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div className="sidebar">
            <h2>Walletly</h2>

            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>

                <li>
                    <Link to="/expenses">Expenses</Link>
                </li>

                <li>
                    <Link to="/budget">Budget</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;