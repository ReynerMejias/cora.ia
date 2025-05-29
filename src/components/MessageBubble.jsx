import React from "react";

const formatAiResponse = (text) => {
  const bulletItems = text.split(/•\s*/).filter(Boolean);
  if (bulletItems.length > 1) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {bulletItems.map((item, index) => (
          <li key={index}>{item.trim()}</li>
        ))}
      </ul>
    );
  }
  return text.split("\n").map((line, i) => <p key={i}>{line}</p>);
};

const MessageBubble = ({ msg }) => {
  if (!msg) return null;
  const isAi = msg.sender === "ai";

  return (
    <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[75%] p-3 rounded-lg ${
          isAi ? "bg-slate-800 text-slate-100" : "bg-blue-600 text-white"
        }`}
      >
        {isAi ? formatAiResponse(msg.text) : <p>{msg.text}</p>}
      </div>
    </div>
  );
};

export default MessageBubble;
