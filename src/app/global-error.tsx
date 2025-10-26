'use client';

import ContentContainer from "@/components/content-container/content-container";
import PageContainer from "@/components/page-container/page-container";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        // global-error must include html and body tags
        <html lang="en" className="dark">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <PageContainer>
                    <ContentContainer>
                        <button onClick={() => window.location.reload()}>Try again</button>
                        <h2>Something went wrong!</h2>
                    </ContentContainer>
                </PageContainer>

            </body>
        </html>
    )
}