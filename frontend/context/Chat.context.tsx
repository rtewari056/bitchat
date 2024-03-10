'use client';

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useRouter } from 'next/navigation'

// Model
import { User } from "@/model";

interface IChatContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<IChatContext['user']>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<IChatContext['isLoggedIn']>>;
  // selectedChat,
  // setSelectedChat,
  // chats,
  // setChats,
  // notification,
  // setNotification,
}

const ChatContext = createContext<IChatContext | null>(null);

export function ChatWrapper({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<IChatContext['user']>(null); // If 'userInfo' is available, else set '{}'
  const [isLoggedIn, setIsLoggedIn] = useState<IChatContext['isLoggedIn']>(false);
  // const [selectedChat, setSelectedChat] = useState();
  // const [chats, setChats] = useState([]);
  // const [notification, setNotification] = useState([]);

  const router = useRouter()

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      router.push('/login');
      setUser(null);
      return;
    }

    setUser(JSON.parse(userInfo));
    setIsLoggedIn(true);
    return;

    // eslint-disable-next-line
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        // selectedChat,
        // setSelectedChat,
        // chats,
        // setChats,
        // notification,
        // setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const chatContext = useContext(ChatContext);
  if (!chatContext) {
    throw new Error('useChatContext must be used within a ChatContextProvider');
  }
  return chatContext;
};