export interface Contributor {
    id: number;
    node_id: string;
    name: string;
    contributions: number;
    additions?: number;
    deletions?: number;
    issuesOpened?: number;
    issuesClosed?: number;
    prsSubmitted?: number;
    prsApproved?: number;
}