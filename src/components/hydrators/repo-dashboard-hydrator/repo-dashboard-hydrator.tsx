"use client";

import { useEffect } from "react";
import { Repository } from "@/types/repository.model";
import { useAppContext } from "@/app/provider";

export default function RepoDashboardHydrator({
    selectedRepo,
}: {
    selectedRepo: Repository;
}) {
    const { setSelectedRepo } = useAppContext();

    useEffect(() => {
        setSelectedRepo(selectedRepo);
    }, [selectedRepo, setSelectedRepo]);

    return null;
}
