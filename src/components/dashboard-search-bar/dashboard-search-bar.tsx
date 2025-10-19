'use client';

import { Repository } from '@/types/repository.model';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useRef, useState } from 'react';

type DashboardSearchBarProps = {
    userRepos: Repository[];
};

export default function DashboardSearchBar(props: DashboardSearchBarProps) {
    const { userRepos } = props;

    const [term, setTerm] = useState('');
    const [webResults, setWebResults] = useState<Repository[]>([]);
    const [loadingWeb, setLoadingWeb] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (term.trim().length < 2) {
            if (abortRef.current) abortRef.current.abort();
            setWebResults([]);
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
                setWebResults(data ?? []);
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
        <>
            <h1 className="text-4xl">Dashboard</h1>
            <Command className="rounded-lg border shadow-md md:min-w-[450px] px-4 py-2">
                <CommandInput
                    placeholder="Search..." className='w-full outline-none' onValueChange={setTerm} />
                <CommandGroup heading="Your Repos" className='background-gray-50 max-h-60 overflow-y-scroll'>
                    <CommandList>
                        <CommandEmpty></CommandEmpty>
                        {userRepos.map((repo) => (
                            <CommandItem key={repo.id}>{repo.name}</CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>
                <CommandSeparator />
                {webResults && webResults.length > 0 && <CommandGroup heading="From the web..." className='background-gray-50 max-h-60 overflow-y-scroll'>
                    <CommandList>
                        {loadingWeb && <Skeleton className="h-4 w-full" />}
                        {!loadingWeb && webResults.map((repo) => (
                            <CommandItem
                                key={repo.id}
                                value={[repo.name, repo.full_name, repo.html_url].filter(Boolean).join(' ')}
                            >
                                {repo.name}
                            </CommandItem>
                        ))}
                    </CommandList>
                </CommandGroup>}
            </Command>
        </>
    );
}
