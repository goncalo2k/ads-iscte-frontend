'use client';

import { Contributor } from '@/types/contributor.model';

type RepoContributorsNavBarProps = {
    contributors: Contributor[];
};

export default function RepoContributorsNavBar(props: RepoContributorsNavBarProps) {

    return (
        <div>
            <h1>Repository Contributors</h1>

            <ul>
                {props.contributors.map(contributor => (
                    <li key={contributor.id}>
                        {contributor.name} - {contributor.contributions} contributions
                    </li>
                ))}
            </ul>
        </div>
    );
}
