import './page-container-component.css';
import React from 'react';

type PageContainerProps = {
    children?: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    return (
        <div className="page-container">
            {children}
        </div>
    );
}
