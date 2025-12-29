'use client';

import { useEffect, useRef, useState } from 'react';
import './dashboard-content-container.css';

import { useAppContext } from '@/app/provider';
import RepoContributorsNavBar from '@/components/repo-contributors-navbar/repo-contributors-navbar';
import RepoDashboardHeader from '@/components/repo-dashboard-header/repo-dashboard-header';
import RepoSummaryContainer from '@/components/repo-summary-container/repo-summary-container';
import { Contributor } from '@/types/contributor.model';
import Divider from '../divider/divider';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function RepoDashboardContentContainer() {
    const { selectedRepo, selectedContributorId, setSelectedContributor } = useAppContext();
    const { width } = useWindowSize();
    const [loadingStats, setLoadingStats] = useState(false);
    const [statsError, setStatsError] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
    const DASHBOARD_BASE = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

    const isLaptop = width >= 1024;

    const fetchStats = async (ac: any) => {
        try {
            setLoadingStats(true);
            setStatsError(false);

            if (!selectedContributorId) window.location.href = '/dashboard';

            const url = `${API_BASE}${DASHBOARD_BASE}/repository/${selectedRepo!.full_name}/contributors/${selectedContributorId}`;

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
            setSelectedContributor(data as Contributor);

            if (!data) throw new Error('Malformed BFF response');
        } catch (err: any) {
            if (err?.name === 'AbortError') return;
            setStatsError(err?.message || 'Failed to fetch contributor stats');
        } finally {
            setLoadingStats(false);
        }
    };

    useEffect(() => {

        if (!selectedContributorId) {
            setStatsError(false);
            setLoadingStats(false);
            if (abortRef.current) abortRef.current.abort();
            return;
        }

        if (abortRef.current) abortRef.current.abort();
        const ac = new AbortController();
        abortRef.current = ac;

        fetchStats(ac);

        return () => {
            ac.abort();
        };
    }, [selectedContributorId]);



    return (
        <div className='dashboard-container'>
            <Link className="link-container" href={`/dashboard`}> <ChevronLeft /><span>Go to Dashboard</span></Link>
            <RepoDashboardHeader />
            <Divider className='dashboard-divider' />
            <div className='stats-container'>
                {isLaptop && <RepoContributorsNavBar />}
                <RepoSummaryContainer loadingStats={loadingStats} />
            </div>
        </div>
    );
}
