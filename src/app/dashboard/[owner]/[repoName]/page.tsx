
import HttpService from '@/app/services/http/http.service';
import ContentContainer from '@/components/content-container/content-container';
import DashboardSearchBar from '@/components/dashboard-search-bar/dashboard-search-bar';
import RepoSummaryContainer from '@/components/repo-summary-container/repo-summary-container';
import { Repository } from '@/types/repository.model';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function RepoDashboardPage({ params }: any) {
    const httpService = new HttpService();
    const repoName = `${params.owner}/${params.repoName}`;
    console.log('RepoDashboardPage params:', params);
    const repoAdditionalInfo: Repository = await httpService.get<Repository>(`${API_DASHBOARD_ENDPOINT}/repository/${repoName}`);
    console.log('RepoDashboardPage repoAdditionalInfo:', repoAdditionalInfo);
    return (
        <div className='flex flex-row gap-6 pb-10'>
            {/* <RepoSummaryContainer repo={repo} /> */}
        </div>
    );
}
