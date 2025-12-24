'use client';

import { useAppContext } from '@/app/provider';

export default function RepoDashboardHeader() {

    const { selectedRepo } = useAppContext();

    if (!selectedRepo) console.log('no repo!')//window.location.href = '/dashboard';

    return (
        <div>
            <h1>Repository Summary</h1>
            {selectedRepo && <div>
                <p>Name: {selectedRepo!.name}</p>
                <p>Description: {selectedRepo!.description}</p>
                <p>Stars: {selectedRepo!.stargazers_count}</p>
                <p>Forks: {selectedRepo!.forks_count}</p>
            </div>}
        </div>
    );
}
