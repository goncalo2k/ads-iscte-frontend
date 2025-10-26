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
