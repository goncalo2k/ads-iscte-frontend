
import ContentContainer from '@/components/content-container/content-container';
import DashboardSearchBar from '@/components/dashboard-search-bar/dashboard-search-bar';
import HttpService from '../services/http/http.service';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function DashboardPage() {
    const httpService: HttpService = new HttpService();

    const res = await httpService.get(API_DASHBOARD_ENDPOINT);

    return (
        <ContentContainer>
            <DashboardSearchBar />
        </ContentContainer>
    );
}
