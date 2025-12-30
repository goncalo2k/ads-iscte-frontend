'use client';

import { useWindowSize } from '@/hooks/useWindowSize';
import './repo-summary-container.css';

import { useAppContext } from '@/app/provider';
import { Spinner } from '../ui/spinner';

type RepoSummaryContainerProps = {
    loadingStats: boolean;
};

export default function RepoSummaryContainer(props: RepoSummaryContainerProps) {
    const { selectedContributor } = useAppContext();

    const { width } = useWindowSize();
    return (
        <>
            {!props.loadingStats && selectedContributor && (
                <div className='contributor-stats-container highlighted-container'>
                    <div className='main-stats-container internal-container'>
                        <img className="avatar-container" src={selectedContributor.avatarUrl} alt="avatar" />
                        <div className='user-main-container'>
                            <div className='username-container'>
                                <span>{selectedContributor.name}</span>
                                <span className='secondary-text'>@{selectedContributor.userName}</span>
                            </div>
                            <div className='inner-stats-container'>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Commits</span>
                                    <span>{selectedContributor.contributions}</span>
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Pull Requests</span>
                                    <span>{0}</span>
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Issues</span>
                                    <span>{0}</span>
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Additions</span>
                                    <span className='additions-label'>+{selectedContributor.additions || 0}</span>
                                </div>
                                <div className='stats-item'>
                                    <span className='secondary-text'>Deletions</span>
                                    <span className='deletions-label'>-{selectedContributor.deletions || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {(!selectedContributor || selectedContributor && props.loadingStats) && (
                <div className='contributor-stats-container highlighted-container loading'>
                    {props.loadingStats ? <Spinner /> : <h2>Please pick a contributor</h2>}
                </div>
            )}
        </>
    );
}
