"use client";

import { useEffect } from "react";
import { useAppContext } from "@/app/provider";

export default function GlobalLoadingHydrator({
    isLoading,
}: {
    isLoading: boolean;
}) {
    const { setGlobalLoading } = useAppContext();

    useEffect(() => {
        setGlobalLoading(isLoading);
    }, [isLoading, setGlobalLoading]);

    return null;
}
