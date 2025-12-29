import './globals.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PageContainer from "@/components/page-container/page-container";
import { AppProvider } from "./provider";
import { DashboardResponse } from "@/types/api.model";
import HttpService from "./services/http/http.service";
import SessionExpiredDialog from '@/components/session-expiration-dialog/session-expiration-dialog';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitDash",
  description: "Checkout your GitHub stats at a glance.",
};

const API_DASHBOARD_ENDPOINT = process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL!;


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialUser = null;
  let initialUserRepos: any[] = [];
  try {
    const http = new HttpService();
    const res = await http.get<DashboardResponse>(API_DASHBOARD_ENDPOINT);

    if (res?.status === 200 && res.data) {
      initialUser = res.data.user;
      initialUserRepos = res.data.repos;
    }
  } catch {
  }
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProvider initialUser={initialUser} initialUserRepos={initialUserRepos}>
          <SessionExpiredDialog/>
          <PageContainer>
            {children}
          </PageContainer>
        </AppProvider>
      </body>
    </html>
  );
}
