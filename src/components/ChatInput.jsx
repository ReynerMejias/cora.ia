import React from "react";

const ChatInput = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isAiTyping,
  inputRef,
}) => (
  <form
    onSubmit={handleSendMessage}
    className="p-4 border-t border-slate-700 bg-slate-900"
  >
    <div className="flex items-center space-x-2">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isAiTyping}
        placeholder="Escribe tu mensaje..."
        className="flex-grow px-4 py-2 rounded-lg bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <button
        type="submit"
        disabled={isAiTyping}
        className="bg-sky-600 hover:bg-sky-700 px-4 py-2 rounded-lg text-white disabled:opacity-50"
      >
        Enviar
      </button>
    </div>
  </form>
);

export default ChatInput;
