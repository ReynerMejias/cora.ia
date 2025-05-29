import React from "react";

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 text-slate-400">
    <div className="dot-flashing" />
    <span>Escribiendo...</span>
  </div>
);

export default TypingIndicator;
