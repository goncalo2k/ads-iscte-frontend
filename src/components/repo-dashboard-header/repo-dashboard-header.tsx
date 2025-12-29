'use client';

import './repo-dashboard-header.css';

import { useAppContext } from '@/app/provider';
import Divider from '../divider/divider';
import { Calendar, Eye, GitFork, Star, Users } from 'lucide-react';
import { Contributor } from '@/types/contributor.model';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function RepoDashboardHeader() {
    const { selectedRepo } = useAppContext();

    const { width } = useWindowSize();
    const isTabletorDown = width < 768;

    let lastUpdatedAt = 'Updated a long time ago...';

    if (!selectedRepo) console.log('no repo!')//window.location.href = '/dashboard';
    console.log('selectedRepo', selectedRepo);
    if (selectedRepo && selectedRepo!.contributors) {
        let currentDate: Date = new Date();
        if (!!selectedRepo!.updated_at) {
            let minutes =
                Math.floor((currentDate.getTime() - new Date(selectedRepo!.updated_at).getTime()) / 60000)
            if (minutes < 60) {
                lastUpdatedAt = `Updated ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                let hours = Math.floor(minutes / 60);
                if (hours > 24) {
                    lastUpdatedAt = `Updated ${Math.floor(hours / 24)} day${hours / 24 > 1 ? 's' : ''} ago`;
                } else { lastUpdatedAt = `Updated ${hours} hour${hours > 1 ? 's' : ''} ago`; }
            }

        }
    }

    return (<>
        {selectedRepo &&
            <div className='dashboard-header-container highlighted-container'>
                <div className='top-container'>
                    <div className='top-left-container'>
                        <div className='main-info-container'>
                            <span>{selectedRepo!.name}</span>
                            <span className='secondary-text'>{selectedRepo!.description || 'This repository has no description.'}</span>
                        </div>
                        <div className='secondary-info-container'>
                            <div className='secondary-info-item'><Star /><span>{selectedRepo!.stargazers_count} {!isTabletorDown && 'stars'}</span></div>
                            <div className='secondary-info-item'><GitFork /><span>{selectedRepo!.forks_count} {!isTabletorDown && 'forks'}</span></div>
                            <div className='secondary-info-item'><Eye /><span>{selectedRepo!.watchers_count} {!isTabletorDown && 'watchers'}</span></div>
                            <div className='secondary-info-item'><Users /><span>{selectedRepo.contributors && selectedRepo!.contributors_count} {!isTabletorDown && 'contributors'}</span></div>
                        </div>
                    </div>
                    <div className='top-right-container'>
                        <span className='language-container highlighted-container'>{selectedRepo.language}</span>
                        <div className='calendar-container'><Calendar className='secondary-text' width={16} height={16} /><span className='secondary-text'>{lastUpdatedAt}</span></div>
                    </div>
                </div>
                <Divider className='mt-4 mb-4' />
                <div className='bottom-container'>
                    <div className='bottom-container-item'>
                        <span className='secondary-text'>Total Commits</span>
                        <span>{selectedRepo?.commit_count}</span>
                    </div>
                    <div className='bottom-container-item'>
                        <span className='secondary-text'>Issues (All time)</span>
                        <span>{selectedRepo?.open_issues || 0}</span>
                    </div>
                    <div className='bottom-container-item'>
                        <span className='secondary-text'>Pull requests</span>
                        <span>{selectedRepo?.open_prs|| 0}</span>
                    </div>
                    <div className='bottom-container-item'>
                        <span className='secondary-text'>Code size</span>
                        <span>{(selectedRepo.size / 1024).toFixed(2)}MB</span>
                    </div>
                </div>
            </div>}
    </>
    );
}
