import { useState } from "react";

const PALETTE = ["#84cc16", "#22c55e", "#a855f7", "#f97316", "#0ea5e9", "#ef4444", "#94a3b8"];

export function PieChart({ data, size = 200, thickness = 26, formatValue = (v) => v }) {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const radius = size / 2;
    const innerRadius = radius - thickness;
    const [hoverIdx, setHoverIdx] = useState(null);

    let cumulative = 0;
    const arcs = data.map((d, i) => {
        const startAngle = (cumulative / total) * 2 * Math.PI;
        cumulative += d.value;
        const endAngle = (cumulative / total) * 2 * Math.PI;
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

        const point = (r, angle) => [radius + r * Math.sin(angle), radius - r * Math.cos(angle)];
        const [x1, y1] = point(radius, startAngle);
        const [x2, y2] = point(radius, endAngle);
        const [ix1, iy1] = point(innerRadius, startAngle);
        const [ix2, iy2] = point(innerRadius, endAngle);

        const path = [
            `M ${ix1} ${iy1}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            `L ${ix2} ${iy2}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
            "Z",
        ].join(" ");

        return { ...d, path, color: d.color || PALETTE[i % PALETTE.length] };
    });

    return (
        <div className="chart-donut-wrap">
            <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
                {arcs.map((arc, i) => (
                    <path
                        key={arc.name}
                        d={arc.path}
                        fill={arc.color}
                        opacity={hoverIdx === null || hoverIdx === i ? 1 : 0.35}
                        onMouseEnter={() => setHoverIdx(i)}
                        onMouseLeave={() => setHoverIdx(null)}
                        style={{ transition: "opacity 150ms ease", cursor: "pointer" }}
                    />
                ))}
                <text x={radius} y={radius - 4} textAnchor="middle" className="chart-donut-total">
                    {formatValue(total)}
                </text>
                <text x={radius} y={radius + 16} textAnchor="middle" className="chart-donut-label">
                    Total
                </text>
            </svg>

            <ul className="chart-legend">
                {arcs.map((arc, i) => (
                    <li
                        key={arc.name}
                        className={hoverIdx === i ? "active" : ""}
                        onMouseEnter={() => setHoverIdx(i)}
                        onMouseLeave={() => setHoverIdx(null)}
                    >
                        <span className="legend-dot" style={{ background: arc.color }} />
                        <span className="legend-label">{arc.name}</span>
                        <span className="legend-value">{formatValue(arc.value)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function BarChart({ data, height = 200, color = "var(--clr-accent-dim)", formatValue = (v) => v }) {
    const max = Math.max(...data.map((d) => d.value), 1);
    const [hoverIdx, setHoverIdx] = useState(null);

    return (
        <div className="chart-bar-wrap" style={{ height }}>
            {data.map((d, i) => (
                <div
                    key={d.label}
                    className="chart-bar-col"
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx(null)}
                >
                    {hoverIdx === i && <span className="chart-bar-tooltip">{formatValue(d.value)}</span>}
                    <div className="chart-bar-track">
                        <div
                            className="chart-bar-fill"
                            style={{ height: `${(d.value / max) * 100}%`, background: color }}
                        />
                    </div>
                    <span className="chart-bar-label">{d.label}</span>
                </div>
            ))}
        </div>
    );
}

export function LineChart({ data, height = 200, color = "var(--clr-accent-dark)", formatValue = (v) => v }) {
    const width = Math.max(data.length * 48, 280);
    const pad = 24;
    const max = Math.max(...data.map((d) => d.value), 1);
    const [hoverIdx, setHoverIdx] = useState(null);

    const points = data.map((d, i) => ({
        ...d,
        x: pad + (i / Math.max(data.length - 1, 1)) * (width - pad * 2),
        y: height - pad - (d.value / max) * (height - pad * 2),
    }));

    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    const areaPath = points.length
        ? `${linePath} L ${points[points.length - 1].x} ${height - pad} L ${points[0].x} ${height - pad} Z`
        : "";

    return (
        <div className="chart-line-wrap">
            <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
                <defs>
                    <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#lineFill)" stroke="none" />
                <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => (
                    <g key={p.label} onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)}>
                        <circle cx={p.x} cy={p.y} r={hoverIdx === i ? 5 : 3} fill={color} />
                        {hoverIdx === i && (
                            <text x={p.x} y={p.y - 10} textAnchor="middle" className="chart-line-tooltip">
                                {formatValue(p.value)}
                            </text>
                        )}
                    </g>
                ))}
                {points.map((p) => (
                    <text key={`${p.label}-axis`} x={p.x} y={height - 6} textAnchor="middle" className="chart-line-axis">
                        {p.label}
                    </text>
                ))}
            </svg>
        </div>
    );
}
