import { Repository } from "./repository.model";
import { Contributor } from "./contributor.model";
import { User } from "./user.model";
import { ActivityStats } from "./activity-stats.model";
import { PrConversionStats } from "./pr-conversion-stats.model";

export type DashboardResponse = ApiResponse<{ user: User, repos: Repository[] }>;

export type SessionStatusResponse = ApiResponse<{ user: Partial<User>, expirationTime: number }>;

export type UserRepositoryResponse = ApiResponse<Repository[]>;

export type RepositorySearchResponse = ApiResponse<Repository>;

export type UserStatsResponse = ApiResponse<Partial<Contributor>>;

export type UserActivityResponse = ApiResponse<ActivityStats>;

export type UserPrConversionResponse = ApiResponse<PrConversionStats>;

export type ContributorsResponse = ApiResponse<{ nextPage: number | null, hasMore: boolean, contributors: Contributor[] }>;

export interface ApiResponse<T> {
  status?: number;
  data?: T;
  error?: string;
}