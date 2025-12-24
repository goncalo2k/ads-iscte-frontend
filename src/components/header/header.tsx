'use client';

import './header.css';

import React from 'react';
import { useAppContext } from '@/app/provider';
import CodeContainer from '../code-container/code-container';
import { DoorOpen } from 'lucide-react';

export default function Header() {
    const { user, selectedContributor, setSelectedContributor, clearContext } = useAppContext();
    const handleRedirectToHome = () => {
        if (selectedContributor) { setSelectedContributor(null); }
        window.location.href = '/dashboard';
    }

    const handleLogout = async () => {

        const bffRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL}/logout`, {
            method: "GET",
            credentials: "include"
        });

        clearContext();
        window.location.href = '/'
    }

    return (
        <div className='header-container'>
            <div className='left-container'>
                <CodeContainer />
                <div className='label' onClick={() => { handleRedirectToHome() }}><span>GitDash</span></div>
            </div>

            {user && <div className='right-container highlighted-container'>

                <img src={user?.avatarUrl} className="avatar" alt="user-avatar" width={32} height={32} />
                <span className='user-label label'>
                    {user.name}
                </span>
                <DoorOpen className='icon' onClick={handleLogout} />
            </div>
            }
        </div>
    );
}
