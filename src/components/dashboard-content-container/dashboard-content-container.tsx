
'use client';
import RepoContributorsNavBar from '@/components/repo-contributors-navbar/repo-contributors-navbar';
import RepoDashboardHeader from '@/components/repo-dashboard-header/repo-dashboard-header';
import RepoSummaryContainer from '@/components/repo-summary-container/repo-summary-container';
import { Contributor } from '@/types/contributor.model';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';


type RepoDashboardContentContainerProps = { repoAdditionalInfoResponse: any }

export default function RepoDashboardContentContainer(props: RepoDashboardContentContainerProps) {
    const [selectedContributor, setSelectedContributor] = useState<Contributor | undefined>(undefined);
    const [loadingStats, setLoadingStats] = useState(false);
    const [statsError, setStatsError] = useState(false);
    const abortRef = useRef<AbortController | null>(null);

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
    const DASHBOARD_BASE = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

    const fetchStats = async (ac: any) => {
        try {
            setLoadingStats(true);
            setStatsError(false);

            if (!selectedContributor) return;

            const url = `${API_BASE}${DASHBOARD_BASE}/repository/${props.repoAdditionalInfoResponse.data.full_name}/contributors/${selectedContributor.node_id}`;

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
            console.log('data', data);
            setSelectedContributor(data as Contributor);
            
            if (!data) throw new Error('Malformed BFF response');
        } catch (err: any) {
            if (err?.name === 'AbortError') return;
            setStatsError(err?.message || 'Failed to fetch contributor stats');
        } finally {
            setLoadingStats(false);
        }
    };

    if (props.repoAdditionalInfoResponse === undefined || props.repoAdditionalInfoResponse.status !== 200) {
        window.location.href = '/dashboard';
    }


    useEffect(() => {
        
        if (!selectedContributor || !selectedContributor.node_id) {
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
    }, [selectedContributor?.node_id]);



    return (
        <div>
            <Link href={`/dashboard`}>Go to Dashboard</Link>
            <div className='flex flex-row gap-6 pb-10'>
                <RepoContributorsNavBar contributors={props.repoAdditionalInfoResponse.data.contributors} onSelectContributor={setSelectedContributor} />

            </div>
            <div className='flex flex-col gap-6 pb-10'>
                <RepoDashboardHeader selectedRepo={props.repoAdditionalInfoResponse.data} />
                <RepoSummaryContainer selectedRepo={props.repoAdditionalInfoResponse.data} loadingStats={loadingStats} selectedContributor={selectedContributor} />
            </div>
        </div>
    );
}
