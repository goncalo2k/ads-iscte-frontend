'use client';

import React from 'react';

import './activity-chart.css';

import { ActivityPoint } from '@/types/activity-point.model';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import CustomTooltip from '@/components/custom-tooltip/custom-tooltip';

type Labels = { commits: string; additions: string; deletions: string };

function formatMonthTick(unixSeconds: number) {
    return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
        month: 'short',
        year: '2-digit',
    });
}

export default function ActivityChart({
    data,
    title = 'Activity Over Time',
    height = 320,
    labels = { commits: 'Commits', additions: 'Additions', deletions: 'Deletions' },
}: {
    data: ActivityPoint[];
    title?: string;
    height?: number;
    labels?: Labels;
}) {
    return (
        <div className="activity-chart-card">
            <div className="activity-chart-title">{title}</div>

            <div className="activity-chart-body" style={{ height }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 4, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="4 6" />
                        <XAxis
                            dataKey="w"
                            type="number"
                            scale="time"
                            domain={['dataMin', 'dataMax']}
                            tickFormatter={formatMonthTick}
                            interval="preserveStartEnd"
                            minTickGap={28}
                        />
                        <YAxis allowDecimals={false} />

                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" iconType="circle" />
                        <Line
                            type="monotone"
                            dataKey="commits"
                            name={labels.commits}
                            stroke="#4C7DFF"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="additions"
                            name={labels.additions}
                            stroke="#F5A524"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="deletions"
                            name={labels.deletions}
                            stroke="#34D399"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
