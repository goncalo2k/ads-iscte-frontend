'use client';
import ContentContainer from '@/components/content-container/content-container-component';
import PageContainer from '@/components/page-container/page-container-component';
import { Command } from 'cmdk';

export default function DashboardPage() {
    return (
        <ContentContainer>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Command>
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Item>Item 1</Command.Item>
                    <Command.Item>Item 2</Command.Item>
                    <Command.Item>Item 3</Command.Item>
                </Command.List>
            </Command>
        </ContentContainer>
    );
}
