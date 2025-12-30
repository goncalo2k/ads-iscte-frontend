'use client';

import { useWindowSize } from '@/hooks/useWindowSize';
import './repo-summary-container.css';

import { useAppContext } from '@/app/provider';
import { Spinner } from '../ui/spinner';
import { Contributor } from '@/types/contributor.model';
import { Skeleton } from '../ui/skeleton';

type RepoSummaryContainerProps = {
    loadingStats: boolean;
};

export default function RepoSummaryContainer(props: RepoSummaryContainerProps) {
    const { selectedContributorId, selectedContributor, selectedRepo } = useAppContext();
    let initialContributor
    if (selectedRepo && selectedRepo?.contributors && selectedRepo?.contributors.length > 0) initialContributor = selectedRepo?.contributors.find((c: Contributor) => c.node_id === selectedContributorId);
    return (
        <>
            {selectedContributorId && (
                <div className='contributor-stats-container highlighted-container'>
                    <div className='main-stats-container internal-container'>
                        <img className="avatar-container" src={(selectedContributor || initialContributor).avatarUrl} alt="avatar" />
                        <div className='user-main-container'>
                            <div className='username-container'>
                                <span>{(selectedContributor || initialContributor).name}</span>
                                <span className='secondary-text'>@{(selectedContributor || initialContributor).userName}</span>
                            </div>
                            <div className='inner-stats-container'>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Commits</span>
                                    <span>{(selectedContributor || initialContributor)!.contributions}</span>
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Pull Requests</span>
                                    {selectedContributor && <span>{0}</span>} {/* //TODO: OPEN/CLOSED */}
                                    {selectedContributorId && !selectedContributor && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Issues</span>
                                    {selectedContributor && <span>{0}</span>} {/* //TODO: OPEN/CLOSED */}
                                    {selectedContributorId && !selectedContributor && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Additions</span>
                                    {selectedContributor && <span className='additions-label'>+{selectedContributor!.additions || 0}</span>}
                                    {selectedContributorId && !selectedContributor && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Deletions</span>
                                    {selectedContributor && <span className='deletions-label'>-{selectedContributor!.deletions || 0}</span>}
                                    {selectedContributorId && !selectedContributor && <Skeleton className="stats-skeleton" />}
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
