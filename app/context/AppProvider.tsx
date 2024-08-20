"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { uuidv4 } from "../lib/utils";
import Loading from "../loading";
import { logout } from "../actions/auth";
import { useRouter, usePathname } from "next/navigation";

interface AppInterface {
  startLoader: () => string;
  completeLoader: (processId: string) => void;
  isLoggedIn: boolean;
  userProfile: User | null;
  logoutUser: () => void;
}

const AppContext = createContext<AppInterface>({
  startLoader: () => "",
  completeLoader: console.log,
  isLoggedIn: false,
  userProfile: null,
  logoutUser: () => {},
});

interface User {
  _id: string;
  name: string;
  email: string;
}

export function useApp() {
  return useContext(AppContext);
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const [loadingProcesses, setLoadingProcesses] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const isLoggedIn = userProfile !== null;
  const router = useRouter();
  const path = usePathname();

  function startNewLoadingProcess() {
    const loadingProcessId = uuidv4();
    setLoadingProcesses((existing) => [...existing, loadingProcessId]);
    return loadingProcessId;
  }

  function markLoadingCompleted(processId: string) {
    setLoadingProcesses((existing) => {
      return existing.filter((x) => x !== processId);
    });
  }

  useEffect(() => {
    async function getUser() {
      if (!userProfile) {
        const loaderId = startNewLoadingProcess();
        try {
          const response = await fetch('/api/user');
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const { user } = await response.json();
          setUserProfile(user);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUserProfile(null);
        } finally {
          markLoadingCompleted(loaderId);
        }
      }
    }
  
    getUser();
  }, []);

   async function logoutUser() {
    setUserProfile(null);
    await logout();
  }

  return (
    <AppContext.Provider
      value={{
        startLoader: startNewLoadingProcess,
        completeLoader: markLoadingCompleted,
        isLoggedIn,
        userProfile,
        logoutUser,
      }}
    >
      {children}
      {loadingProcesses.length > 0 && <Loading />}
    </AppContext.Provider>
  );
}

export default AppProvider;
