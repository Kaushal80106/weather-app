import React from "react";
import { User, Bot } from "lucide-react";

const MessageBubble = ({ message, isUser, isStreaming, theme }) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3 max-w-4xl`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full ${isUser ? theme.userMessageBg_Icon : theme.botMessageBg} ${theme.border} border flex items-center justify-center ${isUser ? 'ml-3' : 'mr-3'}`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className={`w-4 h-4 ${theme.text}`} />
          )}
        </div>
        
        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div
            className={`px-4 py-3 rounded-2xl max-w-2xl ${
              isUser
                ? `${theme.userMessageBg} text-white shadow-lg`
                : `${theme.botMessageBg} ${theme.text} border ${theme.border} shadow-sm`
            } ${isUser ? 'rounded-br-md' : 'rounded-bl-md'}`}
          >
            {isUser ? (
              <p className="text-sm leading-relaxed">{message}</p>
            ) : (
              <div className="text-sm leading-relaxed">
                {message ? (
                  <div className="whitespace-pre-wrap">
                    {message}
                    {isStreaming && (
                      <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse rounded-sm"></span>
                    )}
                  </div>
                ) : isStreaming ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className={`text-xs ${theme.textSecondary}`}>Thinking...</span>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            )}
          </div>
          
          {/* Timestamp */}
          <span className={`text-xs ${theme.textSecondary} mt-1 px-1`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;