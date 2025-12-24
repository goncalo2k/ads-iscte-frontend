
'use client';

import './page-container.css';

import React from 'react';

import { usePathname } from 'next/navigation';
import Header from '../header/header';

type PageContainerProps = {
    children?: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    const pathname = usePathname();

    const isHome = pathname === "/";

    return (
        <div className="page-container">
            {!isHome && <Header />}
            {children}
        </div>
    );
}
