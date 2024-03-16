'use client';

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useRouter } from 'next/navigation'

// Model
import { User } from "@/model";

interface IChatContext {
  // user: User | null;
  // setUser: Dispatch<SetStateAction<IChatContext['user']>>;
  // isLoggedIn: boolean;
  // setIsLoggedIn: Dispatch<SetStateAction<IChatContext['isLoggedIn']>>;
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
  // const [selectedChat, setSelectedChat] = useState();
  // const [chats, setChats] = useState([]);
  // const [notification, setNotification] = useState([]);

  return (
    <ChatContext.Provider
      value={{

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