'use client';

import './repo-summary-container.css';

import { useAppContext } from '@/app/provider';
import { Contributor } from '@/types/contributor.model';
import { Skeleton } from '../ui/skeleton';
import { useEffect } from 'react';
import { Check, Circle, CircleX, GitPullRequestArrow, Minus, Plus } from 'lucide-react';
import ActivityChart from '../charts/activity-chart/activity-chart';
import { buildMonthlyActivitySeries } from '@/lib/activity.utils';
import { Spinner } from '../ui/spinner';
import CustomPieChart from '../charts/pie-chart/pie-chart';

type RepoSummaryContainerProps = {
    loadingStats: { loadingFastStats: boolean, loadingSlowStats: boolean, loadingGraphs: boolean };
    errors: { statsError: null | string, graphsError: null | string }
};

export default function RepoSummaryContainer(props: RepoSummaryContainerProps) {
    const { selectedContributorId, selectedContributor, selectedRepoContributors, activityData, prConversionData } = useAppContext();
    let initialContributor
    if (selectedRepoContributors && selectedRepoContributors && selectedRepoContributors.length > 0) initialContributor = selectedRepoContributors.find((c: Contributor) => c.node_id === selectedContributorId);

    const activityPoints = buildMonthlyActivitySeries(activityData?.weeks || []);
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
                                                <GitPullRequestArrow className='double-stat-icon' /><span>{selectedContributor.prsSubmitted || 0}</span>
                                            </div>
                                            <div className='double-stat-item-container'>
                                                <Check className='double-stat-icon' /><span>{selectedContributor.prsApproved || 0}</span>
                                            </div>
                                        </div>}
                                    {props.loadingStats.loadingFastStats && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Issues</span>
                                    {!props.loadingStats.loadingFastStats && selectedContributor &&
                                        <div className='double-stat-container'>
                                            <div className='double-stat-item-container'>
                                                <Circle className='double-stat-icon' /><span className='additions-label'>{selectedContributor.issuesOpened || 0}</span>
                                            </div>
                                            <div className='double-stat-item-container'>
                                                <CircleX className='double-stat-icon' /><span className='deletions-label'>{selectedContributor.issuesClosed || 0}</span>
                                            </div>
                                        </div>}
                                    {props.loadingStats.loadingFastStats && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Additions</span>
                                    {!props.loadingStats.loadingSlowStats && selectedContributor && <div className='double-stat-item-container'>
                                        <Plus className='double-stat-icon additions-label'/><span className='additions-label'>{selectedContributor!.additions || 0}</span>
                                    </div>}
                                    {props.loadingStats.loadingSlowStats && <Skeleton className="stats-skeleton" />}
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Deletions</span>
                                    {!props.loadingStats.loadingSlowStats && selectedContributor && <div className='double-stat-item-container'>
                                        <Minus className='double-stat-icon deletions-label' /><span className='deletions-label'>{selectedContributor!.deletions || 0}</span>
                                    </div>}
                                    {props.loadingStats.loadingSlowStats && <Skeleton className="stats-skeleton" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='graphs-container'>
                        <div className='activity-stats-container'>
                            {props.loadingStats.loadingGraphs && <Spinner className='activity-graph-loader' />}
                            {!props.loadingStats.loadingGraphs && !props.errors.graphsError && <ActivityChart data={activityPoints} />}
                        </div>

                        <div className='conversion-rate-container'>
                            {props.loadingStats.loadingGraphs && <Spinner className='activity-graph-loader' />}
                            {!props.loadingStats.loadingGraphs && !props.errors.graphsError && prConversionData && <CustomPieChart data={prConversionData} />}
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
