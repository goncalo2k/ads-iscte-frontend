'use client';

import './repo-contributors-navbar.css';

import { useAppContext } from '@/app/provider';
import { useWindowSize } from '@/hooks/useWindowSize';
import { Contributor } from '@/types/contributor.model';
import { ChevronLeft, GitCommitHorizontal, GitPullRequest, Info } from 'lucide-react';
import { Input } from '../ui/input';
import { useEffect, useRef, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Spinner } from '../ui/spinner';
import { ContributorsResponse } from '@/types/api.model';

export default function RepoContributorsNavBar({ isSidebar = false }: { isSidebar?: boolean }) {
    const { selectedRepo, selectedRepoContributors, selectedContributorId, sidebarStatus, setSelectedContributorId, setSelectedRepoContributors, setSelectedContributor, setSidebarStatus } = useAppContext();
    const { width } = useWindowSize();
    const [query, setQuery] = useState<string>("");
    const [hasMore, setHasMore] = useState<boolean>(!!selectedRepoContributors && selectedRepoContributors.length >= 30);
    const [page, setPage] = useState<number>(2);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [loadingError, setLoadingError] = useState<boolean>(false);
    const loadingRef = useRef<boolean>(false);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const filteredContributors = selectedRepoContributors && selectedRepoContributors.length > 0 && selectedRepoContributors.filter((c: Contributor) =>
        c.name && c.name!.toLowerCase().includes(query.toLowerCase()) ||
        c.userName && c.userName!.toLowerCase().includes(query.toLowerCase())
    );


    const isLaptop = width >= 1024;
    const selectContributor = (contributor: Contributor) => {
        if (contributor.node_id !== selectedContributorId) {
            setSelectedContributorId(contributor.node_id);
            setSelectedContributor(contributor);
        }
        if (sidebarStatus) {
            setSidebarStatus(false);
        }
    }

    async function fetchPage() {
        if (!selectedRepo?.full_name) return;
        if (!hasMore) return;
        if (loadingRef.current) return;
        if (query !== '') return;

        loadingRef.current = true;
        setLoadingMore(true);

        try {
            const response: ContributorsResponse = await (await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE}${process.env.NEXT_PUBLIC_DASHBOARD_BASE_ENDPOINT_URL}/repository/${selectedRepo?.full_name}/contributors?page=${page}`,
                { credentials: 'include' }
            )).json();

            if (response.status !== 200) {
                setLoadingError(true);
            } else {
                const newItems = response.data ?? { nextPage: null, contributors: [], hasMore: false };
                console.log('newItems', newItems, 'response.data', response.data);
                if (selectedRepoContributors) {
                    const seen = new Set<string>(selectedRepoContributors.map((c: Contributor) => c.node_id));
                    const deduped = newItems.contributors.filter((c: Contributor) => !seen.has(c.node_id));
                    setSelectedRepoContributors([...selectedRepoContributors, ...deduped]);
                    setLoadingError(false);
                }

                setPage(newItems.nextPage ?? 1);
                setHasMore(newItems.hasMore);
            }
        } finally {
            loadingRef.current = false;
            setLoadingMore(false);
        }
    }

    useEffect(() => {
        if (!loadMoreRef.current) return;
        if (!hasMore) return;

        const el = loadMoreRef.current;
        const obs = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) fetchPage();
            },
            { root: null, rootMargin: '200px', threshold: 0 }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [hasMore, loadingRef.current, selectedRepo?.full_name]);

    return (<>
        {(isLaptop || sidebarStatus) && selectedRepoContributors && selectedRepoContributors.length > 0 && (<>
            <div className='overlay' onClick={() => { setSidebarStatus(false) }}></div>
            <div className={(isSidebar ? ('contributor-sidebar-container' + (sidebarStatus ? ' is-open' : '')) : 'contributor-navbar-container') + ' highlighted-container'}>
                <div className='side-bar-title-container navbar-item'>
                    <div className='contributors-title-main-container'>
                        <div className='contributors-title-container'>
                            <span className='text-xl'>Contributors</span>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info width={16} height={16} />
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
                    className='navbar-input'
                    placeholder="Search contributors"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {filteredContributors && filteredContributors.length > 0 &&
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
                                    {/* <div className='item-bottom-container'>
                                    <div className='item-bottom-container-status'>
                                        <GitCommitHorizontal width={16} height={16} />
                                        <span>{contributor.contributions || 0}</span>
                                    </div>
                                </div> */}
                                </div>
                            </li>
                        ))}
                        <li>
                            <div ref={loadMoreRef} className="secondary-text loading-ref">
                                {loadingMore ? <Spinner /> : loadingError ? <span className='secondary-text error-text'>Error loading more contributors</span> : (hasMore && query !== "" ? <span className='secondary-text'>Scroll to load more</span> : <span className='secondary-text'>All contributors loaded</span>)}
                            </div>
                        </li>
                    </ul>}
            </div>
        </>)}
    </>
    );
}
