import { cookies } from "next/headers";
import { HttpMethod } from "./http.service.consts";

class HttpService {
    private baseUrl: string;
    private authCookieName = (process?.env?.NEXT_AUTH_TOKEN_NAME as string)!;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || (process?.env?.NEXT_PUBLIC_API_BASE as string)!;
    }

    private async getAuthTokenFromCookie(name: string = this.authCookieName): Promise<string | null> {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get(name)?.value;
        return authCookie ? authCookie : null;
    }

    async request<T = any>(path: string, options?: any): Promise<T> {
        const url = this.baseUrl + path;

        const headers = await {
            cookie: `${this.authCookieName}=${await this.getAuthTokenFromCookie()}`,
        };

        const res = await fetch(url, {
            headers,
            ...options
        });

        return res.json() as Promise<T>;
    }

    get<T = any>(path: string) {
        console.log(path);
        return this.request<T>(path, { method: HttpMethod.GET });
    }

    post<T = any>(path: string, body?: any) {
        return this.request<T>(path, { method: HttpMethod.POST, body });
    }

    put<T = any>(path: string, body?: any) {
        return this.request<T>(path, { method: HttpMethod.PUT, body });
    }

    patch<T = any>(path: string, body?: any) {
        return this.request<T>(path, { method: HttpMethod.PATCH, body });
    }

    delete<T = any>(path: string) {
        return this.request<T>(path, { method: HttpMethod.DELETE });
    }
}

export default HttpService;