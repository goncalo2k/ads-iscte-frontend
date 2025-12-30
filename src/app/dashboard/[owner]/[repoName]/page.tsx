
import HttpService from '@/app/services/http/http.service';
import RepoDashboardContentContainer from '@/components/dashboard-content-container/dashboard-content-container';
import GlobalLoadingHydrator from '@/components/hydrators/global-loading-hydrator/global-loading-hydrator';
import RepoDashboardHydrator from '@/components/hydrators/repo-dashboard-hydrator/repo-dashboard-hydrator';
import { RepositorySearchResponse } from '@/types/api.model';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function RepoDashboardPage({ params }: any) {
    let isLoading = true;
    const { owner, repoName } = await params;
    const httpService = new HttpService();
    const repoUrl = `${owner}/${repoName}`;

    const repoAdditionalInfo = await httpService.get<RepositorySearchResponse>(`${API_DASHBOARD_ENDPOINT}/repository/${repoUrl}`);
    if (repoAdditionalInfo === undefined || !repoAdditionalInfo.data || repoAdditionalInfo.status !== 200) {
        console.log('no repo!') //TODO: Display error

    }
    isLoading = false;
    return (<>
        <RepoDashboardHydrator selectedRepo={repoAdditionalInfo.data!} />
        <GlobalLoadingHydrator isLoading={isLoading} />
        <RepoDashboardContentContainer />
    </>
    );
}
