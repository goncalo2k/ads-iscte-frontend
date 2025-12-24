"use client";
import { Contributor } from "@/types/contributor.model";
import { Repository } from "@/types/repository.model";
import { User } from "@/types/user.model";
import React, { createContext, useContext, useMemo, useState } from "react";

type AppContextType = {
  user: User | null;
  userRepos: Repository[] | null;
  publicRepos: Repository[] | null;
  selectedRepo: Repository | null;
  selectedContributor: Contributor | null;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserRepos: React.Dispatch<React.SetStateAction<Repository[] | null>>;
  setPublicRepos: React.Dispatch<React.SetStateAction<Repository[] | null>>;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | null>>;
  setSelectedContributor: React.Dispatch<React.SetStateAction<Contributor | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialUser, initialUserRepos }: {
  children: React.ReactNode, initialUser: User | null;
  initialUserRepos: Repository[];
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [userRepos, setUserRepos] = useState<Repository[] | null>(initialUserRepos);
  const [publicRepos, setPublicRepos] = useState<Repository[] | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);

  const value = useMemo(
    () => ({
      user,
      userRepos,
      publicRepos,
      selectedRepo,
      selectedContributor,
      setUser,
      setUserRepos,
      setPublicRepos,
      setSelectedRepo,
      setSelectedContributor
    }),
    [user, userRepos, publicRepos, selectedRepo, selectedContributor]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
