import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

const App = () => {
  const [messages, setMessages] = useState([
    {
      id: "initial-gemini",
      text: "¡Hello! My name is Cora, your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "user",
      parts: [
        {
          text: "You’re a chill bro who knows a ton about global entertainment. No overthinking unless asked. Your name’s Cora.",
        },
      ],
    },
    {
      role: "model",
      parts: [{ text: "Entendido. Estoy listo para ayudarte." }],
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAiTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      text: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const updatedHistory = [
      ...conversationHistory,
      { role: "user", parts: [{ text: trimmedInput }] },
    ];

    setInputValue("");
    setIsAiTyping(true);

    try {
      const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.2,
        },
      });

      const result = await chat.sendMessage(trimmedInput);
      const aiResponseText = result.response.text();

      const aiMsg = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setConversationHistory([
        ...updatedHistory,
        { role: "model", parts: [{ text: aiResponseText }] },
      ]);
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          text: "Lo siento, no pude procesar eso. Intenta de nuevo.",
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-4 font-['Inter']">
      <div className="w-full max-w-2xl h-[90vh] sm:h-[85vh] md:h-[80vh] bg-slate-900 rounded-xl shadow-2xl flex flex-col border border-slate-700/50 overflow-hidden">
        <ChatHeader />
        <ChatMessages
          messages={messages}
          isAiTyping={isAiTyping}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          isAiTyping={isAiTyping}
          inputRef={inputRef}
        />
      </div>
      <footer className="text-center mt-4 text-xs text-slate-500">
        Created by{" "}
        <a
          href="https://www.studioj2r.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          J2R Studio
        </a>{" "}
        | Powered by{" "}
        <a
          href="https://developers.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Generative AI
        </a>
      </footer>
    </div>
  );
};

export default App;
