import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import ChatWindow from "./Components/ChatWindow";
import InputBox from "./Components/InputBox";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Theme definitions - updated for modern design
  const theme = {
    dark: {
      bg: "bg-gray-900",
      sidebarBg: "bg-gray-800",
      chatBg: "bg-gray-900",
      border: "border-gray-700",
      text: "text-white",
      textSecondary: "text-gray-400",
      inputBg: "bg-gray-800",
      inputBorder: "border-gray-600",
      inputFocus: "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
      messageBg: "bg-gray-800",
      weatherCardBg: "bg-gray-800 bg-opacity-50",
      userMessageBg: "bg-gray-600",
      userMessageBg_Icon: "bg-black",
      botMessageBg: "bg-gray-800",
    },
    light: {
      bg: "bg-gray-50",
      sidebarBg: "bg-white",
      chatBg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      inputBg: "bg-white",
      inputBorder: "border-gray-300",
      inputFocus: "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
      messageBg: "bg-white",
      weatherCardBg: "bg-white bg-opacity-80",
      userMessageBg: "bg-gray-400",
      userMessageBg_Icon: "bg-black",
      botMessageBg: "bg-white",
    },
  };

  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  // Handle clearing chat
  const handleClearChat = () => {
    setMessages([]);
  };

  // Handle sending messages with streaming
  const handleSendMessage = async (message) => {
    const newMessage = { content: message, isUser: true };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    try {
      const { streamWeatherData } = await import("./utils/fetchWeatherData");
      
      // Add empty bot message to start streaming into
      const botMessageIndex = messages.length + 1;
      setMessages((prev) => [...prev, { content: "", isUser: false, isStreaming: true }]);
      
      await streamWeatherData(message, (chunk) => {
        // Update the bot message with streaming content
        setMessages((prev) => 
          prev.map((msg, index) => 
            index === botMessageIndex 
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      });

      // Mark streaming as complete
      setMessages((prev) => 
        prev.map((msg, index) => 
          index === botMessageIndex 
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
      
      setIsTyping(false);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          content: `Sorry, I couldn't fetch weather data. ${error.message}`,
          isUser: false,
        },
      ]);
    }
  };

  return (
    <div className={`h-screen ${currentTheme.bg} flex`}>
      {/* Sidebar */}
      <div
        className={`w-80 ${currentTheme.sidebarBg} border-r ${currentTheme.border} hidden lg:flex flex-col`}
      >
        <div
          className={`p-6 border-b ${currentTheme.border} flex justify-between items-center`}
        >
          <div>
            <h1 className={`${currentTheme.text} text-xl font-bold`}>Weather Assistant</h1>
            <p className={`${currentTheme.textSecondary} text-sm mt-1`}>
              Ask me about weather anywhere
            </p>
          </div>
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={`p-2 rounded-lg ${currentTheme.inputBg} ${currentTheme.text} hover:opacity-80 transition-all duration-200 hover:scale-105`}
          >
            {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        
        {/* Chat History or Quick Actions could go here */}
        <div className="flex-1 p-6">
          <div className={`${currentTheme.textSecondary} text-sm`}>
            <h3 className={`${currentTheme.text} font-semibold mb-3`}>Quick Examples</h3>
            <div className="space-y-2">
              <div className={`p-3 rounded-lg ${currentTheme.messageBg} text-xs`}>
                "What's the weather in London?"
              </div>
              <div className={`p-3 rounded-lg ${currentTheme.messageBg} text-xs`}>
                "Temperature in Tokyo today"
              </div>
              <div className={`p-3 rounded-lg ${currentTheme.messageBg} text-xs`}>
                "Weather forecast for Paris"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow messages={messages} isTyping={isTyping} theme={currentTheme} />
        <InputBox 
          onSendMessage={handleSendMessage} 
          onClearChat={handleClearChat}
          disabled={isTyping} 
          theme={currentTheme} 
          messages={messages} 
        />
      </div>
    </div>
  );
};

export default App;