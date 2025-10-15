'use client';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk';

export default function DashboardSearchBar() {

    return (
        <>
            <h1 className="text-4xl">Dashboard</h1>
            <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                <CommandInput placeholder="Search..." className='w-full'/>
                <CommandGroup heading="Your Repos">
                    <CommandList>
                        <CommandEmpty></CommandEmpty>
                        <CommandItem>Item 1</CommandItem>
                        <CommandItem>Item 2</CommandItem>
                        <CommandItem>Item 3</CommandItem>
                    </CommandList>
                </CommandGroup>
            </Command>
        </>
    );
}
