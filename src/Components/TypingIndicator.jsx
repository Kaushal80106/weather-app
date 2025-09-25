import React from "react";
import { Bot } from "lucide-react";

const TypingIndicator = ({ theme }) => (
  <div className="flex justify-start mb-6">
    <div className="flex items-start space-x-3 max-w-4xl">
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.botMessageBg} ${theme.border} border flex items-center justify-center mr-3`}>
        <Bot className={`w-4 h-4 ${theme.text}`} />
      </div>
      
      {/* Typing Animation */}
      <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${theme.botMessageBg} ${theme.text} border ${theme.border} shadow-sm`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className={`text-xs ${theme.textSecondary} ml-2`}>
            Weather Assistant is analyzing...
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default TypingIndicator;