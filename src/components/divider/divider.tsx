'use client';

import './divider.css';


export default function Divider(props: { className?: string }) {
    return (
        <div className={'divider ' + props.className}>
        </div>
    );
}
