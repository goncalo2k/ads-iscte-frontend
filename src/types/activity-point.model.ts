export type ActivityPoint = {
    key: string;   // YYYY-MM
    w: number;
    label: string; // "Jan", "Feb", ...
    commits: number;
    additions: number; // mapped from "a"
    deletions: number;    // mapped from "d"
};