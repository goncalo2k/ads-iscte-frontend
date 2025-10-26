'use client';

import { Contributor } from '@/types/contributor.model';

type RepoContributorsNavBarProps = {
    contributors: Contributor[];
    onSelectContributor?: any;
};

export default function RepoContributorsNavBar(props: RepoContributorsNavBarProps) {

    return (
        <div>
            <h1>Repository Contributors</h1>

            {props.contributors && props.contributors.length > 0 && (<ul>
                {props.contributors.map(contributor => (
                    <li key={contributor.id}>
                        {contributor.name} - {contributor.contributions} contributions
                    </li>
                ))}
            </ul>)}
        </div>
    );
}
