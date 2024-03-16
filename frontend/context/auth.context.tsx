'use client';

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useRouter } from 'next/navigation'

// Model
import { User } from "@/model";

interface IAuthContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<IAuthContext['user']>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<IAuthContext['isLoggedIn']>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthWrapper({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<IAuthContext['user']>(null); // If 'userInfo' is available, else set '{}'
  const [isLoggedIn, setIsLoggedIn] = useState<IAuthContext['isLoggedIn']>(false);

  const router = useRouter()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      // router.push('/login');
      setUser(null);
      return;
    }

    setUser(JSON.parse(userInfo));
    setIsLoggedIn(true);
    return;

    // eslint-disable-next-line
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuthContext must be used within a AuthContextProvider');
  }
  return authContext;
};