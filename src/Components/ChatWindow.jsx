import React, { useRef, useEffect } from "react";
import { MessageCircle, CloudSun } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({ messages, isTyping, theme }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className={`flex-1 overflow-y-auto ${theme.chatBg}`}>
      {messages.length === 0 && (
        <div
          className={`flex flex-col items-center justify-center h-full ${theme.textSecondary} px-6`}
        >
          <div className={`p-6 rounded-2xl ${theme.messageBg} mb-6 shadow-lg`}>
            <CloudSun className="w-20 h-20 mx-auto mb-4 text-blue-500 opacity-80" />
            <h2 className={`text-2xl font-bold mb-3 ${theme.text} text-center`}>
              Weather Assistant
            </h2>
            <p className="text-center text-lg mb-2">
              Ask me about the weather anywhere in the world!
            </p>
            <p className="text-center text-sm opacity-75">
              I can provide real-time weather updates, forecasts, and climate information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
            <div className={`p-4 rounded-xl ${theme.messageBg} border ${theme.border}`}>
              <h3 className={`font-semibold ${theme.text} mb-2`}>Current Weather</h3>
              <p className="text-sm opacity-75">Get instant weather conditions for any city</p>
            </div>
            <div className={`p-4 rounded-xl ${theme.messageBg} border ${theme.border}`}>
              <h3 className={`font-semibold ${theme.text} mb-2`}>Detailed Forecast</h3>
              <p className="text-sm opacity-75">Comprehensive weather analysis and predictions</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message.content}
            isUser={message.isUser}
            isStreaming={message.isStreaming}
            theme={theme}
          />
        ))}

        {isTyping && <TypingIndicator theme={theme} />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;