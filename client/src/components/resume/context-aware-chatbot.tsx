"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiSend, FiUser, FiMessageSquare, FiChevronDown, FiChevronUp, FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { apiService } from "../../lib/services/api-service";
import { useResumeContext } from "../../lib/context/resume-context";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  context?: {
    resumeSection?: string;
    score?: number;
    suggestion?: string;
  };
}

const ContextAwareChatbot: React.FC = () => {
  const { state, actions } = useResumeContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: generateWelcomeMessage(),
      sender: "bot",
      timestamp: new Date(),
      context: { suggestion: "Get started with your resume analysis" },
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    scrollToBottom();
    
    // Add event listener to close chatbot when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node) && isExpanded) {
        setIsExpanded(false);
      }
    };

    // Add event listener to close chatbot when pressing Escape
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isExpanded]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Generate context-aware welcome message
  function generateWelcomeMessage(): string {
    if (!state.resumeData) {
      return "Hey there! 👋 I'm Coach, your AI career buddy. I'd love to help you with your career goals, resume tips, or job search strategies. Feel free to upload your resume anytime for personalized advice!";
    }

    const score = state.resumeData.atsScore || 0;
    const keyPointsCount = state.resumeData.keyPoints?.length || 0;
    const filename = state.resumeData.filename || 'resume';

    let message = `Hey! 👋 I just finished looking at your resume "${filename}" and I'm excited to chat about it!\n\n`;
    
    if (score < 70) {
      message += `I can see your ATS score is ${score}% - honestly, there's definitely room to make this even stronger! I spotted ${keyPointsCount} key highlights in your experience, which is great.\n\n`;
      message += `What would you like to work on first? Maybe we could focus on boosting that ATS score, or I could help you highlight some of your achievements better. What sounds most helpful to you right now?`;
    } else if (score >= 85) {
      message += `Wow, ${score}% ATS score - that's really impressive! 🎉 You've clearly put some solid work into this. I found ${keyPointsCount} great highlights in your experience.\n\n`;
      message += `Your resume is already in great shape! What's next on your mind? Are you looking to target specific roles, or maybe just want to keep it sharp for future opportunities?`;
    } else {
      message += `Your ATS score is ${score}% - that's a solid foundation! I found ${keyPointsCount} great highlights in your experience that we can definitely build on.\n\n`;
      message += `There's definitely potential here to make it even stronger. What aspect would you like to focus on? Maybe we could work on the content, or perhaps you want to target specific job roles?`;
    }

    return message;
  }

  // Generate context-aware suggestions
  function generateContextSuggestions(): string[] {
    const suggestions: string[] = [];

    if (!state.resumeData) {
      suggestions.push("What jobs should I target?");
      suggestions.push("How can I improve my resume?");
      suggestions.push("What skills are in demand?");
      suggestions.push("How to write a professional summary?");
      return suggestions;
    }

    const score = state.resumeData.atsScore || 0;
    const keyPointsCount = state.resumeData.keyPoints?.length || 0;

    // Score-based suggestions
    if (score < 70) {
      suggestions.push("Help me boost my ATS score!");
      suggestions.push("What keywords am I missing?");
      suggestions.push("How can I make my resume stand out?");
    } else if (score >= 85) {
      suggestions.push("How can I make this even better?");
      suggestions.push("What jobs am I perfect for?");
      suggestions.push("How do I leverage my strong resume?");
    } else {
      suggestions.push("What should I focus on improving?");
      suggestions.push("How can I get to the next level?");
      suggestions.push("What's holding me back?");
    }

    // Content-based suggestions
    if (keyPointsCount < 5) {
      suggestions.push("How can I highlight my achievements?");
      suggestions.push("What metrics should I include?");
      suggestions.push("How do I make my experience pop?");
    }

    // General resume suggestions
    suggestions.push("What jobs should I go for?");
    suggestions.push("How can I make my skills shine?");
    suggestions.push("How do I write killer bullet points?");
    suggestions.push("What am I missing?");

    return suggestions.slice(0, 6); // Limit to 6 suggestions
  }

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

    // Track chat activity
    actions.addAction('Chat message sent', { message: inputValue.trim() });

    try {
      // Prepare context for AI
      const context = {
        resumeData: state.resumeData,
        currentScore: state.resumeData?.atsScore,
        keyPoints: state.resumeData?.keyPoints,
        recentActions: state.recentActions,
        userSession: state.userSession,
      };

      const response = await apiService.chatWithAI(userMessage.text, {
        history: messages.filter(m => m.sender === "user" || m.sender === "bot").map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        })),
        context: context
      });

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: response.response || response.error || "I'm sorry, I couldn't process that request.",
        sender: "bot",
        timestamp: new Date(),
        context: {
          resumeSection: extractResumeSection(userMessage.text),
          score: state.resumeData?.atsScore,
          suggestion: extractSuggestion(response.response || ""),
        },
      };

      setMessages((prev) => [...prev, botMessage]);
      
      // Update session
      actions.addAction('AI response received', { 
        query: userMessage.text,
        responseLength: botMessage.text.length 
      });
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  // Extract resume section from user query
  function extractResumeSection(text: string): string | undefined {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('summary') || lowerText.includes('objective')) return 'summary';
    if (lowerText.includes('experience') || lowerText.includes('work')) return 'workExperience';
    if (lowerText.includes('skill')) return 'skills';
    if (lowerText.includes('education') || lowerText.includes('degree')) return 'education';
    if (lowerText.includes('achievement') || lowerText.includes('accomplishment')) return 'achievements';
    return undefined;
  }

  // Extract actionable suggestion from AI response
  function extractSuggestion(text: string): string | undefined {
    if (text.includes('suggest') || text.includes('recommend')) {
      const sentences = text.split(/[.!?]+/);
      for (const sentence of sentences) {
        if (sentence.includes('suggest') || sentence.includes('recommend')) {
          return sentence.trim();
        }
      }
    }
    return undefined;
  }

  // Format message text with markdown-like formatting
  const formatMessageText = (text: string): string => {
    if (!text) return '';
    
    return text
      // Bold text: **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic text: *text* -> <em>text</em>
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Bullet points: • text -> <span class="text-blue-500">•</span> text
      .replace(/•\s*/g, '<span class="text-blue-500 mr-2">•</span>')
      // Checkmarks: ✓ text -> <span class="text-green-500">✓</span> text
      .replace(/✓\s*/g, '<span class="text-green-500 mr-2">✓</span>')
      // Warning: ⚠️ text -> <span class="text-yellow-500">⚠️</span> text
      .replace(/⚠️\s*/g, '<span class="text-yellow-500 mr-2">⚠️</span>')
      // Success: ✅ text -> <span class="text-green-500">✅</span> text
      .replace(/✅\s*/g, '<span class="text-green-500 mr-2">✅</span>')
      // Info: 📊 text -> <span class="text-blue-500">📊</span> text
      .replace(/📊\s*/g, '<span class="text-blue-500 mr-2">📊</span>')
      // Lightbulb: 💡 text -> <span class="text-yellow-500">💡</span> text
      .replace(/💡\s*/g, '<span class="text-yellow-500 mr-2">💡</span>')
      // Rocket: 🚀 text -> <span class="text-purple-500">🚀</span> text
      .replace(/🚀\s*/g, '<span class="text-purple-500 mr-2">🚀</span>')
      // File: 📄 text -> <span class="text-blue-500">📄</span> text
      .replace(/📄\s*/g, '<span class="text-blue-500 mr-2">📄</span>')
      // Refresh: 🔄 text -> <span class="text-orange-500">🔄</span> text
      .replace(/🔄\s*/g, '<span class="text-orange-500 mr-2">🔄</span>')
      // Line breaks: \n -> <br>
      .replace(/\n/g, '<br>')
      // Double line breaks: \n\n -> <br><br>
      .replace(/\n\n/g, '<br><br>');
  };

  // Format time consistently
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

  const contextSuggestions = generateContextSuggestions();

  // Toggle chatbot expansion
  const toggleChatbot = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div 
      ref={chatbotRef}
      className={`fixed ${isExpanded ? 'bottom-4 right-4 z-50 w-[350px] md:w-[400px]' : 'bottom-4 right-4 z-50'}`}
    >
      {/* Collapsed chatbot - small circular icon */}
      {!isExpanded && (
        <button
          onClick={toggleChatbot}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 animate-bounce"
          aria-label="Open AI Career Advisor"
        >
          <FiMessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Expanded chatbot - full interface */}
      {isExpanded && (
        <div className="rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900 overflow-hidden transition-all duration-300 ease-in-out">
          {/* Chatbot header */}
          <div className="border-b border-gray-200 p-3 dark:border-gray-800 bg-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FiMessageCircle className="h-5 w-5 mr-2" />
                <h2 className="text-base font-semibold">AI Career Advisor</h2>
              </div>
              <div className="flex items-center space-x-2">
                {state.resumeData && (
                  <div className="flex items-center mr-2 bg-blue-700 rounded-full px-2 py-0.5 text-xs">
                    <FiMessageSquare className="h-3 w-3 mr-1" />
                    <span>
                      {state.resumeData.atsScore || 'N/A'}%
                    </span>
                  </div>
                )}
                <button
                  onClick={toggleChatbot}
                  className="text-white hover:bg-blue-700 rounded p-1"
                  aria-label="Minimize chatbot"
                >
                  <FiMinimize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {state.resumeData && (
              <p className="text-xs text-blue-100 mt-1 truncate">
                Analyzing: {state.resumeData.filename || 'your resume'}
              </p>
            )}
          </div>

          {/* Chatbot messages */}
          <div className="flex h-[400px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                      <FiMessageSquare className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white text-gray-900 shadow-sm dark:bg-gray-800 dark:text-white rounded-tl-none"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-line" dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }} />
                    {message.context && message.context.suggestion && (
                      <div className="mt-2 rounded bg-blue-50 p-2 dark:bg-blue-900/20">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          💡 {message.context.suggestion}
                        </p>
                      </div>
                    )}
                    <p className="mt-1 text-right text-xs opacity-70">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center ml-2 flex-shrink-0">
                      <FiUser className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                    <FiMessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="max-w-[75%] rounded-lg bg-white px-3 py-2 shadow-sm dark:bg-gray-800 rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500"></div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0.2s]"></div>
                      <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Context-Aware Suggestions */}
            {messages.length === 1 && (
              <div className="mx-3 my-2">
                <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                  💡 Try asking:
                </p>
                <div className="flex flex-wrap gap-2">
                  {contextSuggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 hover:bg-blue-100 transition-colors dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="border-t border-gray-200 p-3 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="flex items-center space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={state.resumeData 
                    ? "Ask about your resume or career advice..."
                    : "Ask a career question..."
                  }
                  className="flex-1 resize-none rounded-full border border-gray-300 bg-white px-4 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
                >
                  <FiSend className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContextAwareChatbot;
