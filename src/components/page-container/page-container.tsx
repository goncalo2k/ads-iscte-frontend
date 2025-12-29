
'use client';

import './page-container.css';

import React from 'react';

import { usePathname } from 'next/navigation';
import Header from '../header/header';
import { useAppContext } from '@/app/provider';
import RepoContributorsNavBar from '../repo-contributors-navbar/repo-contributors-navbar';

type PageContainerProps = {
    children?: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    const { sidebarStatus } = useAppContext();

    const pathname = usePathname();

    const isRepoDashboard = pathname.startsWith('/dashboard/') &&
        pathname.split('/').length >= 4;

    const isHome = pathname === "/";


    return (
        <div className="page-container">
            {!isHome && <Header />}
            {sidebarStatus && isRepoDashboard && <RepoContributorsNavBar isSidebar={true}/>}
            {children}
        </div>
    );
}
