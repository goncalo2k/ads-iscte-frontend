'use client';

import { useAppContext } from '@/app/provider';

type RepoSummaryContainerProps = {
    loadingStats: boolean;
};

export default function RepoSummaryContainer(props: RepoSummaryContainerProps) {
    const {selectedRepo, selectedContributor} = useAppContext();
    return (
        <div>
            {selectedContributor && !props.loadingStats && (
                <div>
                    <h2>Graphs</h2>
                    <span>Displaying stats for contributor: {selectedContributor.name}</span>
                    <span>Commits made: {selectedContributor.contributions}</span>
                    {selectedContributor.additions && selectedContributor.deletions &&
                        (<><span>Additions made: {selectedContributor.additions}</span><span>Deletions made: {selectedContributor.deletions}</span></>)}
                    {/* Graph components would go here */}
                </div>
            )}
            {!(selectedContributor) && (
                <div>
                    <h2>Please pick a contributor</h2>
                </div>
            )}
        </div>
    );
}
