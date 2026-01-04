'use client';

import { Spinner } from '../ui/spinner';
import './fullpage-loader.css';


export default function FullpageLoader(props: { className?: string }) {
    return (
        <div className={'fullpage-loader-container ' + (props.className ?? '')}>
            <Spinner className='fullpage-spinner' />
        </div>
    );
}
