'use client';

import { useEffect, useRef, useState } from 'react';
import './dashboard-content-container.css';

import { useAppContext } from '@/app/provider';
import RepoContributorsNavBar from '@/components/repo-contributors-navbar/repo-contributors-navbar';
import RepoDashboardHeader from '@/components/repo-dashboard-header/repo-dashboard-header';
import RepoSummaryContainer from '@/components/repo-summary-container/repo-summary-container';
import { Contributor } from '@/types/contributor.model';
import Divider from '../divider/divider';
import { ChevronLeft } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';
import { UserActivityResponse, UserPrConversionResponse } from '@/types/api.model';
import { ActivityStats } from '@/types/activity-stats.model';
import { PrConversionStats } from '@/types/pr-conversion-stats.model';

export default function RepoDashboardContentContainer() {
    const { selectedRepo, selectedContributorId, selectedContributor, prConversionData, setSelectedContributor, setSelectedContributorId, setActivityData, setPrConversionData } = useAppContext();
    const { width } = useWindowSize();
    const [loadingFastStats, setLoadingFastStats] = useState(false);
    const [loadingGraphs, setLoadingGraphs] = useState(false);
    const [loadingSlowStats, setLoadingSlowStats] = useState(false);
    const [statsError, setStatsError] = useState<string | null>(null);
    const [graphsError, setGraphsError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
    const DASHBOARD_BASE = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

    const isLaptop = width >= 1024;

    const isContributorSelected = !!selectedContributorId;

    const handleRedirectToHome = () => {
        if (selectedContributor) { setSelectedContributor(null); setSelectedContributorId(null); }
        window.location.href = '/dashboard';
    }

    const fetchFastStats = async (ac: any) => {
        setLoadingFastStats(true);
        const url = `${API_BASE}${DASHBOARD_BASE}/repository/${selectedRepo!.full_name}/contributors/${selectedContributorId}/stats`;

        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            signal: ac.signal,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`BFF error ${res.status}: ${text || res.statusText}`);
        }
        const payload = await res.json();
        const data = payload?.data;
        if (!data) throw new Error('Malformed BFF response');
        return data as Contributor;
    };

    const fetchSlowStats = async (ac: any) => {
        setLoadingSlowStats(true);
        const url = `${API_BASE}${DASHBOARD_BASE}/repository/${selectedRepo!.full_name}/contributors/${selectedContributorId}/slow-stats`;

        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            signal: ac.signal,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`BFF error ${res.status}: ${text || res.statusText}`);
        }
        const payload = await res.json();
        const data = payload?.data;
        if (!data) throw new Error('Malformed BFF response');
        return data as Contributor;
    };

    const fetchStats = async (ac: any) => {
        try {
            setStatsError(null);

            if (!selectedContributorId) window.location.href = '/dashboard';

            const [fastStats, slowStats] = await Promise.all([fetchFastStats(ac), fetchSlowStats(ac)]);

            setSelectedContributor({ ...selectedContributor, ...fastStats, ...slowStats });
        } catch (err: any) {
            if (err?.name === 'AbortError') return;
            setStatsError(err?.message || 'Failed to fetch contributor stats');
        } finally {
            setLoadingSlowStats(false);
            setLoadingFastStats(false);
            console.log('selectedContributor', selectedContributor)
        }
    };

    const fetchActivityGraph = async (ac: any) => {
        const url = `${API_BASE}${DASHBOARD_BASE}/repository/${selectedRepo!.full_name}/contributors/${selectedContributorId}/activity`;

        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            signal: ac.signal,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`BFF error ${res.status}: ${text || res.statusText}`);
        }
        const payload: UserActivityResponse = await res.json();
        const data = payload?.data;
        if (!data) throw new Error('Malformed BFF response');
        return data as ActivityStats;
    }

    const fetchPrConversionGraph = async (ac: any) => {
        const url = `${API_BASE}${DASHBOARD_BASE}/repository/${selectedRepo!.full_name}/contributors/${selectedContributor?.userName}/pr-conversion`;

        const res = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            signal: ac.signal,
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`BFF error ${res.status}: ${text || res.statusText}`);
        }
        const payload: UserPrConversionResponse = await res.json();
        const data = payload?.data;
        if (!data) throw new Error('Malformed BFF response');
        return data as PrConversionStats;
    }

    const fetchGraphs = async (ac: any) => {
        try {
            setGraphsError(null);
            setLoadingGraphs(true);

            const [activityGraphData, prConversionGraphData] = await Promise.all([fetchActivityGraph(ac), fetchPrConversionGraph(ac)]);


            setActivityData(activityGraphData);
            setPrConversionData(prConversionGraphData);
        } catch (err: any) {
            if (err?.name === 'AbortError') return;
            setGraphsError(err?.message || 'Failed to fetch contributor activity stats');
        } finally {
            setLoadingGraphs(false);
        }
    }

    useEffect(() => {
        if (!selectedContributorId) {
            setStatsError(null);
            setLoadingFastStats(false);
            setLoadingSlowStats(false);
            if (abortRef.current) abortRef.current.abort();
            return;
        }

        if (abortRef.current) abortRef.current.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        fetchStats(ac);
        fetchGraphs(ac);

        return () => {
            ac.abort();
        };
    }, [selectedContributorId]);

    return (
        <div className={'dashboard-container' + (isContributorSelected ? ' clear' : '')}>
            <div className="link-container" onClick={handleRedirectToHome}> <ChevronLeft /><span>Go to Dashboard</span></div>
            <RepoDashboardHeader />
            <Divider className='dashboard-divider' />
            <div className='stats-container'>
                {isLaptop && <RepoContributorsNavBar />}
                <RepoSummaryContainer loadingStats={{ loadingFastStats, loadingSlowStats, loadingGraphs }} errors={{
                    statsError,
                    graphsError
                }} />
            </div>
        </div>
    );
}
