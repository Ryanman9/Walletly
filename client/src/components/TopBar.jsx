import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Moon, Sun, ChevronDown, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/TopBar.css";

const PAGE_TITLES = {
  "/":            { title: "Dashboard",     sub: "Budget Dashboard" },
  "/addexpense":  { title: "Add Expense",   sub: "Record a new spending entry" },
  "/expenses":    { title: "Expenses",      sub: "Search, filter and manage entries" },
  "/analytics":   { title: "Analytics",     sub: "Insights into your spending" },
  "/budget":      { title: "Set Budget",    sub: "Plan your monthly limit" },
};

function TopBar({ isDarkTheme, onToggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const page = PAGE_TITLES[location.pathname] || { title: "Walletly", sub: "" };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-page-title">{page.title}</h2>
        {page.sub && <p className="topbar-page-sub">{page.sub}</p>}
      </div>

      <div className="topbar-right">

        <button
          type="button"
          className="topbar-theme-btn"
          onClick={onToggleTheme}
          title={isDarkTheme ? "Switch to Light" : "Switch to Dark"}
        >
          {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
          <span>{isDarkTheme ? "Light" : "Dark"}</span>
        </button>

        <div className="topbar-profile" ref={dropdownRef}>
          <button
            type="button"
            className="topbar-profile-btn"
            onClick={() => setDropdownOpen((v) => !v)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >

            <div className="topbar-avatar">{initials}</div>

            <div className="topbar-user-text">
              <span className="topbar-user-name">{user?.fullName}</span>
              <span className="topbar-user-email">{user?.email}</span>
            </div>

            <ChevronDown
              size={14}
              className={`topbar-chevron ${dropdownOpen ? "open" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="topbar-dropdown">
              <div className="dropdown-user-info">
                <div className="dropdown-avatar">{initials}</div>
                <div>
                  <p className="dropdown-name">{user?.fullName}</p>
                  <p className="dropdown-email">{user?.email}</p>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="dropdown-item danger"
                onClick={handleLogout}
              >
                <LogOut size={15} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;