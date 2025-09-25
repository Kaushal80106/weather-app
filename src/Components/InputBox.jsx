import React, { useState } from "react";
import { Send, Trash2, CornerDownLeft } from "lucide-react";

const InputBox = ({ onSendMessage, disabled, theme, messages = [], onClearChat }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`border-t ${theme.border} ${theme.chatBg} p-4`}>
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          {/* Delete Chat Button */}
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearChat}
              className={`p-3 ${theme.inputBg} ${theme.textSecondary} rounded-xl border ${theme.inputBorder} hover:text-red-500 hover:border-red-500 transition-all duration-200 disabled:opacity-50`}
              disabled={disabled}
              title="Clear chat history"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}

          {/* Main Input */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about weather in any city... (e.g., 'What's the weather in London?')"
              className={`w-full px-4 py-3 ${theme.inputBg} ${theme.text} rounded-xl border ${theme.inputBorder} focus:outline-none ${theme.inputFocus} resize-none transition-all duration-200 disabled:opacity-50`}
              disabled={disabled}
              rows="1"
              style={{
                minHeight: '48px',
                maxHeight: '120px',
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
            />
            
            {/* Enter hint */}
            {input.trim() && (
              <div className="absolute right-3 bottom-2 flex items-center space-x-1 px-2 py-1 bg-black text-white text-xs rounded-md pointer-events-none">
                <CornerDownLeft className="w-3 h-3" />
                <span>Enter</span>
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className={`p-3 rounded-xl transition-all duration-200 disabled:opacity-50 ${
              input.trim() && !disabled
                ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl hover:scale-105'
                : `${theme.inputBg} ${theme.textSecondary} cursor-not-allowed`
            }`}
            disabled={!input.trim() || disabled}
            title="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Quick Suggestions */}
        {messages.length === 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Weather in New York",
              "Temperature in London",
              "Forecast for Tokyo",
              "Is it raining in Paris?"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => !disabled && onSendMessage(suggestion)}
                className={`px-3 py-1 text-xs rounded-full border ${theme.border} ${theme.textSecondary} hover:${theme.text} hover:border-blue-500 transition-all duration-200 disabled:opacity-50`}
                disabled={disabled}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBox;