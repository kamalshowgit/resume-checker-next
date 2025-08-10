"use client";

import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { apiService } from "../../lib/services/api-service";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm your career advisor based on your resume. Ask me about job targeting, improving specific sections, or skills needed for particular roles.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await apiService.chatWithAI(userMessage.text, {
        history: messages.filter(m => m.sender === "user" || m.sender === "bot").map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }))
      });

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.response || response.error || "I'm sorry, I couldn't process that request.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format time consistently without locale dependencies
  const formatTime = (timestamp: Date) => {
    if (!mounted) return '--:--';
    
    try {
      const hours = timestamp.getUTCHours().toString().padStart(2, '0');
      const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch {
      return '--:--';
    }
  };

  // Example questions for the user to ask
  const exampleQuestions = [
    "What jobs should I target?",
    "How can I improve my leadership section?",
    "Which skills are missing for a Data Analyst role?",
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Career Guidance</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Chat with AI about your career options based on your resume
        </p>
      </div>

      <div className="flex h-[400px] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                }`}
              >
                <p>{message.text}</p>
                <p className="mt-1 text-right text-xs opacity-70">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="mx-4 mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => {
                  setInputValue(question);
                }}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a career question..."
              className="flex-1 resize-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
            >
              <FiSend className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
