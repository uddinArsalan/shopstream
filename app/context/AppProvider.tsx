"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { uuidv4 } from "../lib/utils";
import Loading from "../loading";
import { logout } from "../actions/auth";

interface AppInterface {
  startLoader: () => string;
  completeLoader: (processId: string) => void;
  isLoggedIn: boolean;
  userProfile: User | null;
  logoutUser: () => void;
  startLoadingUser : () => void;
}

const AppContext = createContext<AppInterface>({
  startLoader: () => "",
  completeLoader: console.log,
  isLoggedIn: false,
  userProfile: null,
  logoutUser: () => {},
  startLoadingUser : () => {}
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
  const [isUserLoaded,setIsUserLoaded] = useState<boolean>(false);
  const isLoggedIn = userProfile !== null;

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

  function startLoadingUser(){
    setUserProfile(null);
    setIsUserLoaded(true)
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
  }, [userProfile,isUserLoaded]);

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
        startLoadingUser
      }}
    >
      {children}
      {loadingProcesses.length > 0 && <Loading />}
    </AppContext.Provider>
  );
}

export default AppProvider;
