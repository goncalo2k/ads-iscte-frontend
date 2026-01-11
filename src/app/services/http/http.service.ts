/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { HttpMethod } from "./http.service.consts";

class HttpService {
    private baseUrl: string;

    constructor(baseUrl?: string) {
        this.baseUrl = baseUrl || (process?.env?.NEXT_PUBLIC_API_BASE as string)!;
    }

    async request<T = any>(path: string, options?: any): Promise<T> {
        const url = this.baseUrl + path;

        const res = await fetch(url, {
            credentials: "include",
            ...options
        });

        return res.json() as Promise<T>;
    }

    get<T = any>(path: string) {
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