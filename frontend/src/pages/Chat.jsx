import axios from "axios";
import { useState, useEffect } from "react";

const Chat = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.chatName}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chat;
