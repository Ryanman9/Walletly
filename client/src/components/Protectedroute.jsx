import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
        <div
            style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "var(--bg)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-base)",
            fontSize: "1rem",
            gap: "12px",
            }}
        >
            <div
            style={{
                width: 28,
                height: 28,
                border: "3px solid var(--border)",
                borderTop: "3px solid var(--clr-accent)",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
            }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Checking session…
        </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default ProtectedRoute;