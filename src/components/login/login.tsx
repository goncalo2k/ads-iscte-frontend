'use client';

import './login.css';

import React from 'react';
import { Github } from 'lucide-react';

import { Button } from '../ui/button';
import { useAppContext } from '@/app/provider';

export default function LoginComponent() {
    console.log('[mw env]', {
        NEXT_AUTH_TOKEN_NAME: process.env.NEXT_AUTH_TOKEN_NAME,
        NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    });

    const { setIsLogout, setGlobalLoading } = useAppContext();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
    console.log('apiBase', { apiBase: apiBase });
    const githubAuthEndpoint = process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
    const loginEndpoint = "/login";

    let loginUrl = `${apiBase}${githubAuthEndpoint}${loginEndpoint}`;
    console.log('loginUrl', loginUrl);
    let handleLogin = (loginUrl: string) => {
        setIsLogout(false);
        setGlobalLoading(true);
        window.location.href = loginUrl;
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <Github width={64} height={64} />
            </div>
            <span className="text-xl">Welcome to the GitDash</span>
            <span className="secondary-text">Login to look into your stats!</span>
            <div className='button-container'>
                <Button className="button" onClick={() => { handleLogin(loginUrl) }}>
                    <span>Log in to Github</span>
                </Button>
            </div>
        </div>
    );
}
