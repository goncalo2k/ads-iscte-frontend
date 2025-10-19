import { NextRequest, NextResponse } from 'next/server';
import HttpService from '@/app/services/http/http.service';

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') ?? '';

    // Call your existing BFF search endpoint
    const http = new HttpService();
    const res = await http.get(
        `${API_DASHBOARD_ENDPOINT}/search?searchTerm=${encodeURIComponent(q)}`
    );
    if (res.status === 307) {
        return NextResponse.redirect('/');
    }
    return NextResponse.json(res.data);
}
