'use client';

import './repo-summary-container.css';

import { useAppContext } from '@/app/provider';
import { Contributor } from '@/types/contributor.model';
import { Skeleton } from '../ui/skeleton';
import { useEffect } from 'react';
import { Check, Circle, CircleX, GitPullRequestArrow } from 'lucide-react';

type RepoSummaryContainerProps = {
    loadingStats: { loadingFastStats: boolean, loadingSlowStats: boolean };
};

export default function RepoSummaryContainer(props: RepoSummaryContainerProps) {
    const { selectedContributorId, selectedContributor, selectedRepo, selectedRepoContributors } = useAppContext();
    let initialContributor
    if (selectedRepoContributors && selectedRepoContributors && selectedRepoContributors.length > 0) initialContributor = selectedRepoContributors.find((c: Contributor) => c.node_id === selectedContributorId);
    useEffect(() => { console.log('selectedContributor', selectedContributor, 'selectedContributorId', selectedContributorId) }, [selectedContributor, selectedContributorId])
    return (
        <>
            {selectedContributorId && (
                <div className='contributor-stats-container highlighted-container'>
                    <div className='main-stats-container internal-container'>
                        <img className="avatar-container" src={(selectedContributor || initialContributor)!.avatarUrl} alt="avatar" />
                        <div className='user-main-container'>
                            <div className='username-container'>
                                <span>{(selectedContributor || initialContributor)!.name}</span>
                                <span className='secondary-text'>@{(selectedContributor || initialContributor)!.userName}</span>
                            </div>
                            <div className='inner-stats-container'>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Commits</span>
                                    <span>{(selectedContributor || initialContributor)!.contributions}</span>
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Pull Requests</span>
                                    {!props.loadingStats.loadingFastStats && selectedContributor &&
                                        <div className='double-stat-container'>
                                            <div className='double-stat-item-container'>
                                                <GitPullRequestArrow className='double-stat-icon'/><span>{selectedContributor.prsSubmitted}</span>
                                            </div>
                                            <div className='double-stat-item-container'>
                                                <Check className='double-stat-icon'/><span>{selectedContributor.prsApproved}</span>
                                            </div>
                                        </div>}
                                    {props.loadingStats.loadingFastStats && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Issues</span>
                                    {!props.loadingStats.loadingFastStats && selectedContributor &&
                                        <div className='double-stat-container'>
                                            <div className='double-stat-item-container'>
                                                <Circle className='double-stat-icon'/><span className='additions-label'>{selectedContributor.issuesOpened}</span>
                                            </div>
                                            <div className='double-stat-item-container'>
                                                <CircleX className='double-stat-icon'/><span className='deletions-label'>{selectedContributor.issuesClosed}</span>
                                            </div>
                                        </div>}
                                    {props.loadingStats.loadingFastStats && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Additions</span>
                                    {!props.loadingStats.loadingSlowStats && selectedContributor && <span className='additions-label'>+{selectedContributor!.additions || 0}</span>}
                                    {props.loadingStats.loadingSlowStats && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Deletions</span>
                                    {!props.loadingStats.loadingSlowStats && selectedContributor && <span className='deletions-label'>-{selectedContributor!.deletions || 0}</span>}
                                    {props.loadingStats.loadingSlowStats && <Skeleton className="stats-skeleton" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!selectedContributorId && (
                <div className='contributor-stats-container highlighted-container loading'>
                    <h2>Please pick a contributor</h2>
                </div>
            )}
        </>
    );
}
