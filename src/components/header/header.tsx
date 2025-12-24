'use client';

import './header.css';

import React from 'react';
import { useAppContext } from '@/app/provider';
import { redirect } from 'next/navigation';
import CodeContainer from '../code-container/code-container';

export default function Header() {
    const { user, selectedContributor, setSelectedContributor } = useAppContext();

    const handleRedirectToHome = () => {
        if (selectedContributor) { setSelectedContributor(null); }
        window.location.href = '/dashboard';
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
            </div>
            }
        </div>
    );
}
