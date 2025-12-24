

'use client';

import { Code } from 'lucide-react';

import React from 'react';

export default function CodeContainer({height=16, width=16}: { height?: number, width?: number }) {
    return (<div className='highlighted-container'><Code width={width} height={height} /></div>);
}
