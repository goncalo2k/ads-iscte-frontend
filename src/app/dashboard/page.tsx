
import ContentContainer from '@/components/content-container/content-container';
import DashboardSearchBar from '@/components/dashboard-search-bar/dashboard-search-bar';
import HttpService from '../services/http/http.service';
import { DashboardResponse } from '@/types/api.model';
import { useAppContext } from '../provider';
import DashboardHydrator from '@/components/hydrators/dashboard-hydrator/dashboard-hydrator';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function DashboardPage() {
    const httpService: HttpService = new HttpService();
    let isLoading = true;
    let isError = false;

    const getUserInitialDashboard = async (): Promise<DashboardResponse> => {
        isLoading = true;
        const response = await httpService.get(API_DASHBOARD_ENDPOINT);
        isLoading = false;
        if (!response || !response.data || response.status !== 200) {
            isError = true;
        }
        return response as DashboardResponse;
    };

    const response = await getUserInitialDashboard();
    console.log(response);

    isLoading = false;

    return (
        <ContentContainer>
            {!isError  && !isLoading && <DashboardHydrator user={response.data!.user} repos={response.data!.repos}/>}
            <DashboardSearchBar />
        </ContentContainer>
    );
}
