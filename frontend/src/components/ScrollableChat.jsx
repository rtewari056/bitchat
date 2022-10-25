import { Avatar, Tooltip } from "@chakra-ui/react";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <div style={{ overflowX: "hidden", overflowY: "auto" }}>
      {/* If something inside the messages, render the messages */}
      {messages &&
        messages.map((message, index) => (
          <div key={message._id} style={{ display: "flex" }}>
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr="1"
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.pic}
                />
              </Tooltip>
            )}

            <span
              style={{
                backgroundColor: `${
                  message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",

                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user._id
                ),
                marginTop: isSameUser(messages, message, index, user._id)
                  ? 3
                  : 10,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
