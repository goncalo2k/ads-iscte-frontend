
import HttpService from '@/app/services/http/http.service';
import RepoDashboardContentContainer from '@/components/dashboard-content-container/dashboard-content-container';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export default async function RepoDashboardPage({ params }: any) {
    const {owner, repoName} = await params;
    const httpService = new HttpService();
    const repoUrl = `${owner}/${repoName}`;
    const repoAdditionalInfo = await httpService.get(`${API_DASHBOARD_ENDPOINT}/repository/${repoUrl}`);
    return (<RepoDashboardContentContainer repoAdditionalInfoResponse={repoAdditionalInfo} />
    );
}
