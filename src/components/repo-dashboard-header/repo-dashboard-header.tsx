'use client';

import { Repository } from '@/types/repository.model';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from 'cmdk';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useRef, useState } from 'react';

type RepoSummaryContainerProps = {
    selectedRepo: Repository;
};

export default function RepoDashboardHeader(props: RepoSummaryContainerProps) {

    return (
        <div>
            <h1>Repository Summary</h1>
            <div>
                <p>Name: {props.selectedRepo.name}</p>
                <p>Description: {props.selectedRepo.description}</p>
                <p>Stars: {props.selectedRepo.stargazers_count}</p>
                <p>Forks: {props.selectedRepo.forks_count}</p>
            </div>
        </div>
    );
}
