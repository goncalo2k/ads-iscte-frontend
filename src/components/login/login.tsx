'use client';

import './login.css';

import React from 'react';
import { Github } from 'lucide-react';

import { Button } from '../ui/button';
import Image from "next/image";

export default function LoginComponent() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE!;
    const githubAuthEndpoint = process.env.NEXT_PUBLIC_GITHUB_AUTHENTICATION_ENDPOINT_URL!;
    const loginEndpoint = "/login";

    const handleLogin = () => {
        window.location.href = `${apiBase}${githubAuthEndpoint}${loginEndpoint}`;
    };

    return (
        <div className='login-container'>
            <div className='image-container'>
                <Github width={64} height={64} />
            </div>
            <span className="text-xl">Welcome to the GitDash</span>
            <span className="sub-title">Login to look into your stats!</span>
            <div className='button-container'>
                <Button className="button" onClick={handleLogin}>
                    <span>Log in to Github</span>
                </Button>
            </div>
        </div>
    );
}
