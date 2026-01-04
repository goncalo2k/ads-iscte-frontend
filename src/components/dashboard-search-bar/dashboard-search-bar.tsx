/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import './dashboard-search-bar.css';

import { Repository } from '@/types/repository.model';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/provider';
import { Search } from 'lucide-react';
import Divider from '../divider/divider';
import CodeContainer from '../code-container/code-container';



export default function DashboardSearchBar() {
    const { userRepos, setSelectedRepo, publicRepos, setPublicRepos } = useAppContext();
    const router = useRouter();

    const [term, setTerm] = useState('');
    const [loadingWeb, setLoadingWeb] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);


    const handleRepositoryClick = (repo: Repository) => {
        setSelectedRepo(repo);
        router.push(`/dashboard/${repo.full_name.split('/')[0]}/${repo.name}`);
    };

    useEffect(() => {
        //TODO: Decide if we want to call api only after 2 chars or not
        if (term.trim().length < 1) {
            if (abortRef.current) abortRef.current.abort();
            setPublicRepos([]);
            setLoadingWeb(false);
            setError(null);
            return;
        }

        setLoadingWeb(true);
        setError(null);

        const controller = new AbortController();
        abortRef.current = controller;

        const timeoutId = setTimeout(async () => {
            try {
                const res = await fetch(`/dashboard/search?q=${encodeURIComponent(term)}`, {
                    signal: controller.signal,
                    credentials: 'include',
                });

                if (!res.ok) throw new Error(`Search failed (${res.status})`);
                const data: Repository[] = await res.json();
                setPublicRepos(data ?? []);
            } catch (e: any) {
                if (e.name !== 'AbortError') setError(e.message ?? 'Search error');
            } finally {
                setLoadingWeb(false);
            }
        }, 400);

        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [term]);

    return (
        <div className='dashboard-search-container'>
            <div className='title-container'>
                <span className="title text-2xl">Search Repositories</span>
                <span className="secondary-text text-sm">Find and explore repositories from your account and across GitHub</span>
            </div>
            <Command className="dashboard-search rounded-lg border shadow-md md:min-w-[450px] px-4 py-2 flex-column gap-2">
                <div className="flex gap-1 p-2">
                    <div className='flex-row content-center'><Search className="h-4 w-4" /></div>
                    <CommandInput
                        placeholder="Search by name, owner, description or language..." className='w-full outline-none' onValueChange={setTerm} />
                </div>
                <Divider className="w-full" ></Divider>
                <div className='p-2'>
                    <CommandGroup heading="Your Repositories" className='background-gray-50 max-h-60 overflow-y-scroll'>
                        <CommandList >
                            <CommandEmpty></CommandEmpty>
                            {userRepos && userRepos.map((repo) => (
                                <CommandItem key={repo.id} onSelect={() => handleRepositoryClick(repo)}>
                                    <div className='dashboard-search-item-container'>
                                        <CodeContainer width={16} height={16} />
                                        <span>{repo.name}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                    <CommandSeparator />
                    {(loadingWeb || (publicRepos && publicRepos.length > 0)) && <CommandGroup heading="From the web" className='background-gray-50 max-h-60 overflow-y-scroll gap-1'>
                        <CommandList>
                            <CommandEmpty></CommandEmpty>
                            {Array.from({ length: 5 }).map((_, i) =>
                                loadingWeb ? <CommandItem key={'loading-' + i} value={term} disabled><Skeleton className="h-4 w-full pl-1 pr-1 dashboard-search-item-container" /></CommandItem> : null
                            )}

                            {!loadingWeb && publicRepos && publicRepos.length > 0 && publicRepos.map((repo) => (
                                <CommandItem key={repo.id} value={[repo.name, repo.full_name, repo.html_url].filter(Boolean).join(' ')} onSelect={() => handleRepositoryClick(repo)}>
                                    <div className='dashboard-search-item-container'>
                                        <CodeContainer width={16} height={16} />
                                        <span>{repo.name}</span>
                                    </div>
                                </CommandItem>
                            ))}

                        </CommandList>
                    </CommandGroup>}
                </div>
            </Command >
        </div >
    );
}
