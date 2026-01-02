import React from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  return (
    <div className="flex flex-1 flex-col min-h-0">
      <ChatHeader />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
