
'use client';

import './page-container.css';

import React from 'react';

import { usePathname } from 'next/navigation';
import Header from '../header/header';
import { useAppContext } from '@/app/provider';
import RepoContributorsNavBar from '../repo-contributors-navbar/repo-contributors-navbar';
import FullpageLoader from '../fullpage-loader/fullpage-loader';
import { useSessionWatcher } from '@/hooks/useSessionWatcher';

type PageContainerProps = {
    children?: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    const { sidebarStatus, globalLoading } = useAppContext();
    const { isExpired } = useSessionWatcher();


    const pathname = usePathname();

    const isRepoDashboard = pathname.startsWith('/dashboard/') &&
        pathname.split('/').length >= 4;

    const isHome = pathname === "/";


    return (
        <div className="page-container">
            {!isExpired && !isHome && <Header />}
            {!isExpired && !globalLoading && sidebarStatus && isRepoDashboard && <RepoContributorsNavBar isSidebar={true} />}
            {(!isExpired || isHome) && !globalLoading && children}
            {globalLoading && <FullpageLoader />}
        </div>
    );
}
