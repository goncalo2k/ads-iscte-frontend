/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import './header.css';

import React from 'react';
import { useAppContext } from '@/app/provider';
import { DoorOpen, Users } from 'lucide-react';
import CodeContainer from '../code-container/code-container';
import { useWindowSize } from '@/hooks/useWindowSize';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { user, selectedContributor, sidebarStatus, setIsLogout, setGlobalLoading, setSelectedContributor, setSelectedContributorId, clearContext, setSidebarStatus } = useAppContext();
    const { width } = useWindowSize();

    const handleRedirectToHome = () => {
        if (selectedContributor) { setSelectedContributor(null); setSelectedContributorId(null); }
        window.location.href = '/dashboard';
    }

    const isMobile = width <= 640;
    const isLaptop = width >= 1024;
    const pathname = usePathname();
    const isRepoDashboard = pathname.startsWith('/dashboard/') &&
        pathname.split('/').length >= 4;


    const handleLogout = async () => {
        setGlobalLoading(true);
        setIsLogout(true);
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL}/logout`, {
            method: "GET",
            credentials: "include"
        });

        clearContext();
        setGlobalLoading(false);
        window.location.href = '/'
    }

    const openContributorsSideBar = () => { setSidebarStatus(!sidebarStatus) };

    return (
        <>
            {user && <div className='header-container'>
                <div className='left-container' onClick={handleRedirectToHome}>
                    <CodeContainer />
                    <div className='label'><span>GitDash</span></div>
                </div>
                <div className='right-container'>
                    {!isLaptop && isRepoDashboard &&
                        <div className='contributors-button-container highlighted-container' onClick={openContributorsSideBar}>
                            <Users className="icon" />
                            {!isMobile && <span>Contributors</span>}
                        </div>}
                    <div className='right-container highlighted-container'>
                        <img src={user?.avatarUrl} className="avatar" alt="user-avatar" width={32} height={32} />
                        <span className='user-label label'>
                            {user.name}
                        </span>
                        <DoorOpen className='icon' width={16} height={16} onClick={handleLogout} />
                    </div>
                </div>
            </div>
            }
        </>
    );
}
