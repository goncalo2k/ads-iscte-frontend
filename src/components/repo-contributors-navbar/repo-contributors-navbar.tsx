'use client';

import { useAppContext } from '@/app/provider';
import { Contributor } from '@/types/contributor.model';


export default function RepoContributorsNavBar() {
    const { selectedRepo, selectedContributor, setSelectedContributor } = useAppContext();

    return (
        <div>
            <h1>Repository Contributors</h1>

            {selectedRepo?.contributors && selectedRepo?.contributors.length > 0 && (<ul>
                {selectedRepo?.contributors.map((contributor: Contributor) => (
                    <li key={contributor.id} onClick={() => setSelectedContributor(contributor)}>
                        {contributor.name} - {contributor.contributions} contributions
                    </li>
                ))}
            </ul>)}
        </div>
    );
}
