
'use client';

import './custom-tooltip.css';

export default function CustomTooltip({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: any[];
    label?: number; // recharts passes the x-value here for numeric axes
}) {
    const formatTooltipLabel = (unixSeconds: number) => {
        return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
            month: 'long',
            year: 'numeric',
        });
    }

    if (!active || !payload?.length) return null;

    return (
        <div className="activity-chart-tooltip">
            <div className="activity-chart-tooltip-title">
                {typeof label === 'number' ? formatTooltipLabel(label) : ''}
            </div>

            <div className="activity-chart-tooltip-list">
                {payload.map((p, idx) => (
                    <div key={idx} className="activity-chart-tooltip-row">
                        <span className="activity-chart-tooltip-left">
                            <span
                                className="activity-chart-tooltip-dot"
                                style={{ background: p.stroke }}
                            />
                            <span className="activity-chart-tooltip-name">{p.name}</span>
                        </span>

                        <span className="activity-chart-tooltip-value">{p.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}