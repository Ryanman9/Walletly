import { useState, useEffect, useCallback } from "react";
import { expenseAPI } from "../api/api";
import AnalyticsCharts from "../components/AnalyticsCharts";
import "../styles/Analytics.css";

function Analytics({ month, budget }) {
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadAnalytics = useCallback(async (targetMonth) => {
        setLoading(true);
        setError("");
        try {
            const res = await expenseAPI.getAnalytics(targetMonth);
            setData(res);
        } catch (err) {
            setError(err.message || "Failed to load analytics.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAnalytics(selectedMonth);
    }, [selectedMonth, loadAnalytics]);

    return (
        <div className="page-container">
            <header className="page-header">
                <p className="over-heading">Insights</p>
                <h1>Analytics</h1>
                <p>Review spending trends from your saved expenses</p>
            </header>

            <div className="analytics-month-picker">
                <label>
                    Viewing month
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </label>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <AnalyticsCharts data={data} budget={budget} loading={loading} />
        </div>
    );
}

export default Analytics;