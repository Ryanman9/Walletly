import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) setError("");
  };

  const validateClient = () => {
    const errors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      errors.fullName = "Full name must be at least 2 characters.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      errors.email = "Please enter a valid email address.";
    if (!form.password || form.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      return;
    }

    setLoading(true);
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {

        if (err.errors) {
        const mapped = {};
        err.errors.forEach(({ field, message }) => {
          mapped[field] = message;
        });
        setFieldErrors(mapped);
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">W</span>
          <div>
            <h1>Walletly</h1>
            <p>Expense Tracker</p>
          </div>
        </div>

        <div className="page-header">
          <p className="over-heading">Get started</p>
          <h2>Create your account</h2>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              autoComplete="name"
              placeholder="Alex Jones"
              value={form.fullName}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.fullName && (
              <span className="field-error">{fieldErrors.fullName}</span>
            )}
          </label>

          <label>
            Email address
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}
          </label>

          <label>
            Password
            <div className="input-with-toggle">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {fieldErrors.password && (
              <span className="field-error">{fieldErrors.password}</span>
            )}
          </label>

          <label>
            Confirm Password
            <div className="input-with-toggle">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <span className="field-error">{fieldErrors.confirmPassword}</span>
            )}
          </label>

          <button type="submit" className="primary-btn auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner" />
                Creating account…
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;