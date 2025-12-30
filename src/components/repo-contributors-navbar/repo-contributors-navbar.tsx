'use client';

import './repo-contributors-navbar.css';

import { useAppContext } from '@/app/provider';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Contributor } from '@/types/contributor.model';
import { ChevronLeft, GitCommitHorizontal, GitPullRequest, Info } from 'lucide-react';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function RepoContributorsNavBar({ isSidebar = false }: { isSidebar?: boolean }) {
    const { selectedRepo, selectedContributor, selectedContributorId, sidebarStatus, setSelectedContributorId, setSidebarStatus } = useAppContext();
    const { width } = useWindowSize();
    const [query, setQuery] = useState("");

    const filteredContributors = selectedRepo?.contributors && selectedRepo?.contributors.filter((c: Contributor) =>
        c.name && c.name!.toLowerCase().includes(query.toLowerCase()) ||
        c.userName && c.userName!.toLowerCase().includes(query.toLowerCase())
    );


    const isLaptop = width >= 1024;
    /* TODO FIX
    if (isLaptop) {
        setSidebarStatus(false);
    } */
    const selectContributor = (contributor: Contributor) => {
        setSelectedContributorId(contributor.node_id);
        if (sidebarStatus) {
            setSidebarStatus(false);
        }
    }
    return (<>
        {(isLaptop || sidebarStatus) && selectedRepo?.contributors && selectedRepo?.contributors.length > 0 && (<>
            <div className='overlay' onClick={() => { setSidebarStatus(false) }}></div>
            <div className={(isSidebar ? ('contributor-sidebar-container' + (sidebarStatus ? ' is-open' : '')) : 'contributor-navbar-container') + ' highlighted-container'}>
                <div className='side-bar-title-container navbar-item'>
                    <div className='contributors-title-main-container'>
                        <div className='contributors-title-container'>
                            <span className='text-xl'>Contributors</span>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info width={16} height={16}/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>This value might be different to the one you see on Github, since we only take Github accounts into consideration.</span>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <span className='secondary-text'>{selectedRepo?.contributors_count} members</span>
                    </div>
                    <div>
                        {!isLaptop && <ChevronLeft onClick={() => { setSidebarStatus(false) }} />}
                    </div>
                </div>
                <Input
                    className='input'
                    placeholder="Search contributors"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <ul className='navbar-list-container'>
                    {filteredContributors.map((contributor: Contributor) => (
                        <li key={contributor.id} onClick={() => { selectContributor(contributor) }}>
                            <div className={'navbar-item' + (selectedContributorId && contributor.node_id === selectedContributorId ? ' selected' : '')}>
                                <div className='item-top-container'>
                                    <img className="avatar" width={32} height={32} src={contributor.avatarUrl} alt="avatar" />
                                    <div className='item-top-text-container'>
                                        <span>{contributor.name}</span>
                                        <span className='secondary-text'>@{contributor.userName}</span>
                                    </div>
                                </div>
                                <div className='item-bottom-container'>
                                    <div className='item-bottom-container-status'>
                                        <GitCommitHorizontal width={16} height={16} />
                                        <span>{contributor.contributions || 0}</span>
                                    </div>
                                    <div className='item-bottom-container-status'>
                                        <GitPullRequest width={16} height={16} />
                                        <span>{0}</span> {/* TODO */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>)}
    </>
    );
}
