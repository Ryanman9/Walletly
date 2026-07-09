import { TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, BarChart, LineChart } from "recharts";

const CATEGORY_COLORS = {
    Food: "#84cc16",
    Transport: "#22c55e",
    Shopping: "#a855f7",
    Entertainment: "#f97316",
    Education: "#0ea5e9",
    Health: "#ef4444",
    Other: "#94a3b8",
};

const formatCurrency = (value) => `₹${Math.round(value || 0).toLocaleString()}`;

const formatMonthLabel = (monthStr) => {
    const [year, month] = monthStr.split("-").map(Number);
    return new Date(year, month - 1).toLocaleDateString("en-US", { month: "short" });
};

const formatDayLabel = (dateStr) => Number(dateStr.slice(8, 10));

function AnalyticsCharts({ data, budget, loading }) {
    if (loading && !data) {
        return (
            <div className="analytics-loading">
                <div className="analytics-spinner" />
                <p>Crunching your numbers…</p>
            </div>
        );
    }

    if (!data) return null;

    const { summary, categoryBreakdown, monthlyTrend, dailyTrend } = data;
    const hasCategoryData = categoryBreakdown.length > 0;

    const pieData = categoryBreakdown.map((c) => ({
        name: c.category,
        value: c.total,
        color: CATEGORY_COLORS[c.category] || "#94a3b8",
    }));

    const barData = monthlyTrend.map((m) => ({ label: formatMonthLabel(m.month), value: m.total }));
    const lineData = dailyTrend.map((d) => ({ label: formatDayLabel(d.date), value: d.total }));

    const remaining = (budget || 0) - summary.totalSpent;
    const spentPercent = budget > 0 ? Math.min((summary.totalSpent / budget) * 100, 100) : 0;
    const changeIsUp = (summary.percentChange ?? 0) >= 0;

    return (
        <div className="analytics-grid">
            <section className="analytics-summary-row">
                <article className="analytics-stat-card">
                    <p className="over-heading">This month</p>
                    <h3>{formatCurrency(summary.totalSpent)}</h3>
                    <span>Total spent</span>
                </article>

                <article className="analytics-stat-card">
                    <p className="over-heading">Transactions</p>
                    <h3>{summary.transactionCount}</h3>
                    <span>Avg {formatCurrency(summary.avgTransaction)} each</span>
                </article>

                <article className="analytics-stat-card">
                    <p className="over-heading">Top category</p>
                    <h3>{summary.topCategory || "—"}</h3>
                    <span>Biggest slice of spending</span>
                </article>

                <article className="analytics-stat-card">
                    <p className="over-heading">Vs last month</p>
                    <h3 className={changeIsUp ? "trend-up" : "trend-down"}>
                        {summary.percentChange === null ? "—" : `${changeIsUp ? "+" : ""}${summary.percentChange.toFixed(0)}%`}
                        {summary.percentChange !== null && (changeIsUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />)}
                    </h3>
                    <span>{formatCurrency(summary.previousMonthTotal)} last month</span>
                </article>
            </section>

            <div className="two-column">
                <section className="analytics-card">
                    <div className="section-heading">
                        <div>
                            <p className="over-heading">Where it went</p>
                            <h2>Spending by Category</h2>
                        </div>
                    </div>
                    {hasCategoryData ? (
                        <PieChart data={pieData} formatValue={formatCurrency} />
                    ) : (
                        <p className="empty-state">No expenses recorded for this month yet.</p>
                    )}
                </section>

                <section className="analytics-card">
                    <div className="section-heading">
                        <div>
                            <p className="over-heading">Budget check</p>
                            <h2>This Month&apos;s Progress</h2>
                        </div>
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${spentPercent}%` }} />
                    </div>
                    <div className="budget-details">
                        <p>Budget <strong>{formatCurrency(budget)}</strong></p>
                        <p>
                            {remaining >= 0 ? "Remaining" : "Exceeded by"}{" "}
                            <strong>{formatCurrency(Math.abs(remaining))}</strong>
                        </p>
                    </div>

                    <div className="budget-info">
                        <p
                            className={
                                remaining > budget * 0.5
                                    ? "budget-healthy"
                                    : remaining > budget * 0.1
                                    ? "budget-warning"
                                    : remaining > 0
                                    ? "budget-danger"
                                    : remaining === 0
                                    ? "budget-used"
                                    : "budget-exceeded"
                            }
                        >
                                {remaining > budget * 0.5
                                ? "✓ Spending looks healthy"
                                : remaining > budget * 0.1
                                ? "◔ Approaching budget limit"
                                : remaining > 0
                                ? "⚠ Almost at budget limit"
                                : remaining === 0
                                ? "• Budget fully used"
                                : "☹ Budget exceeded"
                            }
                        </p>
                    </div>
                </section>
            </div>

            <section className="analytics-card">
                <div className="section-heading">
                    <div>
                        <p className="over-heading">Last 6 months</p>
                        <h2>Monthly Trend</h2>
                    </div>
                </div>
                <BarChart data={barData} formatValue={formatCurrency} />
            </section>

            <section className="analytics-card">
                <div className="section-heading">
                    <div>
                        <p className="over-heading">Day by day</p>
                        <h2>Daily Spending</h2>
                    </div>
                </div>
                {lineData.length > 0 ? (
                    <LineChart data={lineData} formatValue={formatCurrency} />
                ) : (
                    <p className="empty-state">No daily data to show yet.</p>
                )}
            </section>
        </div>
    );
}

export default AnalyticsCharts;