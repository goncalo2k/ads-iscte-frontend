import { Repository } from "./repository.model";
import { Contributor } from "./contributor.model";
import { User } from "./user.model";

export interface DashboardResponse extends ApiResponse<{ user: User, repos: Repository[] }> { }

export interface SessionStatusResponse extends ApiResponse<{ user: Partial<User>, expirationTime: number }> { }

export interface UserRepositoryResponse extends ApiResponse<Repository[]> { }

export interface RepositorySearchResponse extends ApiResponse<Repository> { }

export interface UserStatsResponse extends ApiResponse<Partial<Contributor>> { }

/* export interface UserActivityResponse extends ApiResponse<SearchActivityStats> { } */

export interface ContributorsResponse extends ApiResponse<{ nextPage: number | null, hasMore: boolean, contributors: Contributor[] }> { }

export interface ApiResponse<T> {
  status?: number;
  data?: T;
  error?: string;
}