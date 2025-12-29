export interface Contributor {
    id: number;
    node_id: string;
    name: string;
    userName?:string;
    avatarUrl?: string;
    contributions: number;
    additions?: number;
    deletions?: number;
}