'use client';

import { useAppContext } from '@/app/provider';
import { Spinner } from '../ui/spinner';
import './fullpage-loader.css';


export default function FullpageLoader(props: { className?: string }) {
    const { globalLoading } = useAppContext();
    return (
        globalLoading && <div className={'fullpage-loader-container ' + props.className}>
            <Spinner className='fullpage-spinner' />
        </div>
    );
}
