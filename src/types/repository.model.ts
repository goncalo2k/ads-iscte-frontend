export interface Repository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    updated_at: string,
    size: number,
    language: string,
    fork: boolean;
    url: string;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    contributors_count?: number;
    contributors?: any;
    open_issues?: number;
    open_prs?: number;
    commit_count?: number;
}