import { Contributor } from "./contributor.model";

export interface ActivityStats {
    total: number;
    weeks: SearchWeeklyActivity[];
    author: Contributor;
};

export interface SearchWeeklyActivity {
    w: number,
    a: number,
    d: number,
    c: number
}