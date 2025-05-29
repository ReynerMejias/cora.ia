import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import React from "react";

const ChatMessages = ({ messages, isAiTyping, messagesEndRef }) => (
  <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto custom-scrollbar">
    {messages.map((msg) => (
      <MessageBubble key={msg.id} msg={msg} />
    ))}
    {isAiTyping && <TypingIndicator />}
    <div ref={messagesEndRef} />
  </div>
);

export default ChatMessages;
