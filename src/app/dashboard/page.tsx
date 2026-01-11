
import ContentContainer from '@/components/content-container/content-container';
import DashboardSearchBar from '@/components/dashboard-search-bar/dashboard-search-bar';
import HttpService from '../services/http/http.service';
import { DashboardResponse } from '@/types/api.model';
import DashboardHydrator from '@/components/hydrators/dashboard-hydrator/dashboard-hydrator';
import GlobalLoadingHydrator from '@/components/hydrators/global-loading-hydrator/global-loading-hydrator';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function DashboardPage() {
    console.log('dashboard-page: API_DASHBOARD_ENDPOINT',API_DASHBOARD_ENDPOINT);
    const httpService: HttpService = new HttpService();
    let isError = false;
    const getUserInitialDashboard = async (): Promise<DashboardResponse> => {
        const response = await httpService.get(API_DASHBOARD_ENDPOINT);
        if (!response || !response.data || response.status !== 200) {
            isError = true;
        }

        return response as DashboardResponse;
    };

    const response = await getUserInitialDashboard();

    return (
        <ContentContainer>
            <GlobalLoadingHydrator isLoading={false} />
            {!isError && <DashboardHydrator user={response.data!.user} repos={response.data!.repos} />}
            <DashboardSearchBar />
        </ContentContainer>
    );
}
