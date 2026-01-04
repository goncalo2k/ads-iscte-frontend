'use client';

import './login.css';

import React from 'react';
import { Github } from 'lucide-react';

import { Button } from '../ui/button';
import { useAppContext } from '@/app/provider';
import { setGlobal } from 'next/dist/trace';

export default function LoginComponent() {
    const {setIsLogout, setGlobalLoading} = useAppContext();
    const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
    const githubAuthEndpoint = process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
    const loginEndpoint = "/login";

    const handleLogin = () => {
        setIsLogout(false);
        setGlobalLoading(true);
        window.location.href = `${apiBase}${githubAuthEndpoint}${loginEndpoint}`;
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <Github width={64} height={64} />
            </div>
            <span className="text-xl">Welcome to the GitDash</span>
            <span className="secondary-text">Login to look into your stats!</span>
            <div className='button-container'>
                <Button className="button" onClick={handleLogin}>
                    <span>Log in to Github</span>
                </Button>
            </div>
        </div>
    );
}
