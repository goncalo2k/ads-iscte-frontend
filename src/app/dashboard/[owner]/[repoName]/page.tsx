
import HttpService from '@/app/services/http/http.service';
import RepoContributorsNavBar from '@/components/repo-contributors-navbar/repo-contributors-navbar';
import RepoDashboardHeader from '@/components/repo-dashboard-header/repo-dashboard-header';

import RepoSummaryContainer from '@/components/repo-dashboard-header/repo-dashboard-header';
import { Repository } from '@/types/repository.model';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function RepoDashboardPage({ params }: any) {
    const httpService = new HttpService();
    const repoName = `${params.owner}/${params.repoName}`;
    const repoAdditionalInfo = await httpService.get(`${API_DASHBOARD_ENDPOINT}/repository/${repoName}`);
    console.log('repoAdditionalInfo', repoAdditionalInfo.data);
    return (
        <div>
            <div className='flex flex-row gap-6 pb-10'>
                <RepoContributorsNavBar contributors={repoAdditionalInfo.data.contributors} />

            </div>
            <div className='flex flex-col gap-6 pb-10'>
                <RepoDashboardHeader selectedRepo={repoAdditionalInfo.data} />
                <RepoSummaryContainer selectedRepo={repoAdditionalInfo.data} />
            </div>
        </div>
    );
}
