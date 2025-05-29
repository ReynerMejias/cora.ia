import React from "react";

const ChatHeader = () => (
  <div className="flex flex-col gap-2 items-center justify-center px-4 py-3 bg-slate-800 border-b border-slate-700">
    <img src="/robot.png" alt="Cora Logo" className="w-12 h-12" />
    <h1 className="text-lg font-semibold text-slate-100">
      Cora Chat – AI Assistant
    </h1>
  </div>
);

export default ChatHeader;
