
import ContentContainer from '@/components/content-container/content-container';
import DashboardSearchBar from '@/components/dashboard-search-bar/dashboard-search-bar';
import HttpService from '../services/http/http.service';
import { Repository } from '@/types/repository.model';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function DashboardPage() {
    const httpService: HttpService = new HttpService();
    let isLoading = true;

    const getUserRepos = async () => {
        isLoading = true;
        const repos = await httpService.get(API_DASHBOARD_ENDPOINT);
        isLoading = false;
        return repos;
    };

    const repos = await getUserRepos();

    isLoading = false;

    return (
        <ContentContainer>
            <DashboardSearchBar userRepos={repos.data as Repository[]} />
        </ContentContainer>
    );
}
