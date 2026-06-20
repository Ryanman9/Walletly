import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            setError("Please fill in all fields");
            return;
        }

        if (
            form.email === "admin@gmail.com" &&
            form.password === "123456"
        ) {
            localStorage.setItem("isLoggedIn", "true");
            alert("Login Successful");
            navigate("/");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-page">
            <section className="auth-card">

                <div className="auth-logo">
                    <span className="logo-icon">W</span>
                    <div>
                        <h1>Walletly</h1>
                        <p>Expense Tracker</p>
                    </div>
                </div>

                <header className="page-header">
                    <p className="over-heading">Welcome Back</p>
                    <h2>Sign In To Your Account</h2>
                </header>

                {error && (
                    <p className="error-msg">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="auth-form">

                    <label>
                        Email Address
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Password

                        <div className="input-with-toggle">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </label>

                    <button
                        type="submit"
                        className="primary-btn auth-submit-btn"
                    >
                        Sign In
                    </button>
                </form>

                <p className="auth-switch">
                    Don&apos;t have an account?{" "}
                    <Link to="/register">
                        Create One Free
                    </Link>
                </p>

            </section>
        </div>
    );
}

export default Login;