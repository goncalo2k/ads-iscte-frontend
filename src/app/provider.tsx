"use client";
import { ActivityStats } from "@/types/activity-stats.model";
import { Contributor } from "@/types/contributor.model";
import { PrConversionStats } from "@/types/pr-conversion-stats.model";
import { Repository } from "@/types/repository.model";
import { User } from "@/types/user.model";
import React, { createContext, useContext, useMemo, useState } from "react";

type AppContextType = {
  sidebarStatus: boolean;
  sessionDialogStatus: boolean;
  globalLoading: boolean;

  user: User | null;
  userRepos: Repository[] | null;
  publicRepos: Repository[] | null;
  selectedRepo: Repository | null;
  selectedRepoContributors: Contributor[] | null;
  selectedContributorId: string | null;
  selectedContributor: Contributor | null;
  activityData: ActivityStats | null;
  prConversionData: PrConversionStats | null;

  setSidebarStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionDialogStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setUserRepos: React.Dispatch<React.SetStateAction<Repository[] | null>>;
  setPublicRepos: React.Dispatch<React.SetStateAction<Repository[] | null>>;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | null>>;
  setSelectedRepoContributors: React.Dispatch<React.SetStateAction<Contributor[] | null>>;
  setSelectedContributorId: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedContributor: React.Dispatch<React.SetStateAction<Contributor | null>>;
  setActivityData: React.Dispatch<React.SetStateAction<ActivityStats | null>>;
  setPrConversionData: React.Dispatch<React.SetStateAction<PrConversionStats | null>>;

  clearContext: React.Dispatch<React.SetStateAction<void>>;
  clearSelectedRepoInfo: React.Dispatch<React.SetStateAction<void>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, initialUser, initialUserRepos }: {
  children: React.ReactNode, initialUser: User | null;
  initialUserRepos: Repository[];
}) {
  const [sidebarStatus, setSidebarStatus] = useState<boolean>(false);
  const [sessionDialogStatus, setSessionDialogStatus] = useState<boolean>(false);
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(initialUser);
  const [userRepos, setUserRepos] = useState<Repository[] | null>(initialUserRepos);
  const [publicRepos, setPublicRepos] = useState<Repository[] | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [selectedRepoContributors, setSelectedRepoContributors] = useState<Contributor[] | null>(null);
  const [selectedContributorId, setSelectedContributorId] = useState<string | null>(null);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [activityData, setActivityData] = useState<ActivityStats | null>(null);
  const [prConversionData, setPrConversionData] = useState<PrConversionStats | null>(null);

  const clearContext = () => {
    setSidebarStatus(false);
    setSessionDialogStatus(false);
    setUser(null);
    setUserRepos(null);
    setPublicRepos(null);
    setSelectedRepo(null);
    setSelectedRepoContributors(null);
    setSelectedContributorId(null);
    setSelectedContributor(null);
    setActivityData(null);
    setPrConversionData(null);
  };

  const clearSelectedRepoInfo = () => {
    setSelectedRepo(null);
    setSelectedRepoContributors(null);
    setActivityData(null)
    setPrConversionData(null)
  }

  const value = useMemo(
    () => ({
      sidebarStatus,
      sessionDialogStatus,
      globalLoading,
      user,
      userRepos,
      publicRepos,
      selectedRepo,
      selectedRepoContributors,
      selectedContributorId,
      selectedContributor,
      activityData,
      prConversionData,
      setSidebarStatus,
      setSessionDialogStatus,
      setGlobalLoading,
      setUser,
      setUserRepos,
      setPublicRepos,
      setSelectedRepo,
      setSelectedRepoContributors,
      setSelectedContributorId,
      setSelectedContributor,
      setActivityData,
      setPrConversionData,

      clearContext,
      clearSelectedRepoInfo
    }),
    [sidebarStatus, sessionDialogStatus, globalLoading, user, userRepos, publicRepos, selectedRepo, selectedRepoContributors, selectedContributorId, selectedContributor, activityData, prConversionData]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
