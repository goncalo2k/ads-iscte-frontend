"use client";

import { useEffect } from "react";
import { User } from "@/types/user.model";
import { Repository } from "@/types/repository.model";
import { useAppContext } from "@/app/provider";

export default function DashboardHydrator({
    user,
    repos,
}: {
    user: User;
    repos: Repository[];
}) {
    const { setUser, setUserRepos } = useAppContext();

    useEffect(() => {
        setUser(user);
        setUserRepos(repos);
    }, [user, repos, setUser, setUserRepos]);

    return null;
}
