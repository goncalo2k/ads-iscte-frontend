import React from 'react';
import './content-container-component.css';

type ContentContainerProps = {
    children?: React.ReactNode;
    orientation?: 'row' | 'column';
    maxWidth?: boolean;
    maxHeight?: boolean;
};

export default function ContentContainer({ children, orientation = 'column', maxWidth = true, maxHeight = true }: ContentContainerProps) {
    return (
        <div className={`content-container ${orientation} ${maxWidth ? 'w-full' : ''} ${maxHeight ? 'h-full' : ''}`}>
            {children}
        </div>
    );
}
