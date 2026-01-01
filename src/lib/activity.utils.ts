import { ActivityPoint } from '@/types/activity-point.model';
import { SearchWeeklyActivity } from '@/types/activity-stats.model';
import { PieChartChell } from '@/types/pie-chart-cell.model';
import { PrConversionStats } from '@/types/pr-conversion-stats.model';

const monthKey = (dt: Date) => {
    const y = dt.getUTCFullYear();
    const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
};

const monthLabel = (dt: Date) =>
    new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(dt);

const monthStartUnixSeconds = (dt: Date) =>
    Math.floor(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), 1) / 1000);

const addMonthsUTC = (dt: Date, months: number) => {
    const d = new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), 1));
    d.setUTCMonth(d.getUTCMonth() + months);
    return d;
};

export function buildMonthlyActivitySeries(weeks: SearchWeeklyActivity[]): ActivityPoint[] {
    if (!weeks?.length) return [];

    const sorted = [...weeks].sort((a, b) => a.w - b.w);

    const byMonth = new Map<string, ActivityPoint>();

    for (const wk of sorted) {
        const dt = new Date(wk.w * 1000);
        const key = monthKey(dt);

        const existing =
            byMonth.get(key) ??
            ({
                key,
                w: monthStartUnixSeconds(dt),
                label: monthLabel(dt),
                commits: 0,
                additions: 0,
                deletions: 0,
            } as ActivityPoint);

        existing.commits += wk.c ?? 0;
        existing.additions += wk.a ?? 0;
        existing.deletions += wk.d ?? 0;

        byMonth.set(key, existing);
    }

    const first = new Date(sorted[0].w * 1000);
    const last = new Date(sorted[sorted.length - 1].w * 1000);

    const start = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1));
    const end = new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), 1));

    const out: ActivityPoint[] = [];
    let cursor = start;

    while (cursor <= end) {
        const key = monthKey(cursor);
        out.push(
            byMonth.get(key) ?? {
                key,
                w: monthStartUnixSeconds(cursor),
                label: monthLabel(cursor),
                commits: 0,
                additions: 0,
                deletions: 0,
            },
        );
        cursor = addMonthsUTC(cursor, 1);
    }

    return out;
}
