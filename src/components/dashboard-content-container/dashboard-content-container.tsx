
'use client';
import RepoContributorsNavBar from '@/components/repo-contributors-navbar/repo-contributors-navbar';
import RepoDashboardHeader from '@/components/repo-dashboard-header/repo-dashboard-header';
import RepoSummaryContainer from '@/components/repo-summary-container/repo-summary-container';
import Link from 'next/link';
import { useState } from 'react';


type RepoDashboardContentContainerProps = { repoAdditionalInfoResponse: any }

export default function RepoDashboardContentContainer(props: RepoDashboardContentContainerProps) {
    const [selectedContributor, setSelectedContributor] = useState(undefined);

    if(props.repoAdditionalInfoResponse === undefined || props.repoAdditionalInfoResponse.status !== 200) {
        window.location.href = '/dashboard';
    }

    return (
        <div>
            <Link href={`/dashboard`}>Go to Dashboard</Link>
            <div className='flex flex-row gap-6 pb-10'>
                <RepoContributorsNavBar contributors={props.repoAdditionalInfoResponse.data.contributors} onSelectContributor={setSelectedContributor} />

            </div>
            <div className='flex flex-col gap-6 pb-10'>
                <RepoDashboardHeader selectedRepo={props.repoAdditionalInfoResponse.data} />
                <RepoSummaryContainer selectedRepo={props.repoAdditionalInfoResponse.data} selectedContributor={selectedContributor} />
            </div>
        </div>
    );
}
