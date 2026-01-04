/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useMemo } from 'react';

import {
    Legend,
    PieChart as RechartsPieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from 'recharts';
import { PrConversionStats } from '@/types/pr-conversion-stats.model';

type Labels = { merged: string; closedUnmerged: string; open: string };
type Mode = 'counts' | 'rates';

type PieDatum = {
    key: keyof Labels;
    name: string;
    value: number;
    rate?: number;
};

export default function CustomPieChart({
    data,
    title = 'PRs',
    height = 320,
    labels = { merged: 'Merged', closedUnmerged: 'Closed (Unmerged)', open: 'Open' },
    colors = ['#22c55e', '#f97316', '#ef4444'],
    mode = 'counts',
    showPercentInLegend = true,
}: {
    data: PrConversionStats;
    title?: string;
    height?: number;
    labels?: Labels;
    colors?: string[];
    mode?: Mode;
    showPercentInLegend?: boolean;
}) {
    const pieData: PieDatum[] = useMemo(() => {
        const openRate =
            data.totalOpened > 0 ? data.open / data.totalOpened : 0;

        const base: PieDatum[] = [
            {
                key: 'merged',
                name: labels.merged,
                value: data.merged,
                rate: data.mergedRate,
            },
            {
                key: 'closedUnmerged',
                name: labels.closedUnmerged,
                value: data.closedUnmerged,
                rate: data.closedUnmergedRate,
            },
            {
                key: 'open',
                name: labels.open,
                value: data.open,
                rate: openRate,
            },
        ];

        if (mode === 'rates') {
            return base.map((d) => ({
                ...d,
                value: Math.round(((d.rate ?? 0) * 100) * 100) / 100,
            }));
        }

        return base;
    }, [data, labels, mode]);

    
    const legendFormatter = (value: string, entry: any) => {
        if (!showPercentInLegend) return value;
        const payload: PieDatum | undefined = entry?.payload;
        const pct =
            mode === 'rates'
                ? payload?.value
                : Math.round(((payload?.rate ?? 0) * 100) * 100) / 100;
        return `${value} (${pct?.toFixed(2)}%)`;
    };

    const tooltipFormatter = (value: number, _name: string, props: any) => {
        const payload: PieDatum | undefined = props?.payload;

        if (mode === 'rates') {
            return [`${Number(value).toFixed(2)}%`, 'Share'];
        }

        const pct = (payload?.rate ?? 0) * 100;
        return [`${value} PRs (${pct.toFixed(2)}%)`];
    };

    const userHasPrs = data.closedUnmergedRate !== 0 || data.mergedRate !== 0 || data.completionRate !== 0;
    return (<>
        {userHasPrs && <div className="activity-chart-card">
            <div className="activity-chart-title">{title}</div>
            <div className="activity-chart-body" style={{ height }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={0}
                        dataKey="value"
                        nameKey="name"
                        isAnimationActive
                        stroke="none"
                        strokeWidth={0}
                    >
                        {pieData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                                stroke="none"
                                strokeWidth={0}
                            />
                        ))}
                    </Pie>


                    <Tooltip formatter={tooltipFormatter as any} />
                    <Legend formatter={legendFormatter as any} />
                </RechartsPieChart>
            </ResponsiveContainer>
            </div>
        </div>}
        {!userHasPrs && <div className='no-pr-data-container'>
            <span>This user did not open any PRs</span>
        </div>}
    </>);
}
