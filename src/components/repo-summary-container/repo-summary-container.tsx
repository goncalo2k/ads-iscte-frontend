'use client';

import { Repository } from '@/types/repository.model';
import { Contributor } from '@/types/contributor.model';

type RepoSummaryContainerProps = {
    selectedRepo: Repository;
    selectedContributor: Contributor | undefined;
};

export default function RepoSummaryContainer(props: RepoSummaryContainerProps) {

    return (
        <div>
            {props.selectedContributor && (
                <div>
                    <h2>Graphs</h2>
                    <span>Displaying stats for contributor: {props.selectedContributor.name}</span>
                    <span>Commits made: {props.selectedContributor.contributions}</span>
                    {props.selectedContributor.additions && props.selectedContributor.deletions &&
                        (<><span>Additions made: {props.selectedContributor.additions}</span><span>Deletions made: {props.selectedContributor.deletions}</span></>)}
                    {/* Graph components would go here */}
                </div>
            )}
            {!(props.selectedContributor) && (
                <div>
                    <h2>Please pick a contributor</h2>
                </div>
            )}
        </div>
    );
}
