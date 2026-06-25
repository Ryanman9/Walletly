import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");
        try {
            await login(form);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
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

                <form onSubmit={handleSubmit} className="auth-form" noValidate>

                    <label>
                        Email Address
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label>
                        Password

                        <div className="input-with-toggle">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() =>
                                    setShowPassword((v) => !v)
                                }
                                tabIndex={-1}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </label>

                    <button type="submit" className="primary-btn auth-submit-btn" disabled={loading}>
                        {loading ? (
                        <>
                            <span className="btn-spinner" />
                            Signing in…
                        </>
                        ) : (
                        "Sign In"
                        )}
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