import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

// Initial dummy conversation data required for Sprint 5
const DUMMY_CONVERSATION = [
  { 
    id: '1', 
    sender: 'ai', 
    text: 'Hello! Upload a restaurant menu and ask me anything.' 
  },
  { 
    id: '2', 
    sender: 'user', 
    text: 'Which dishes contain paneer?' 
  },
  { 
    id: '3', 
    sender: 'ai', 
    text: 'Paneer Tikka Shashlik, Kurkure Paneer Tikka, and Basil Malai Paneer Tikka are available.' 
  }
];

/**
 * ChatWindow component to display the conversational interface.
 * Designed to easily transition the message state to a parent component (Home.jsx) later.
 * Supports automatic scrolling, clean layouts, and local state fallbacks.
 *
 * @param {Object} props
 * @param {Array} [props.messages] - Optional external array of message objects.
 * @param {function} [props.onSendMessage] - Optional external callback function when a message is sent.
 * @param {boolean} [props.disabled] - Whether the input and send button should be disabled.
 */
const ChatWindow = ({ messages: propMessages, onSendMessage, disabled = false }) => {
  // Use local state if messages aren't passed down from a parent component (Home.jsx)
  const [localMessages, setLocalMessages] = useState(DUMMY_CONVERSATION);
  const activeMessages = propMessages || localMessages;

  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages]);

  const handleSendMessage = (text) => {
    if (onSendMessage) {
      onSendMessage(text);
    } else {
      // Local state fallback logic for Sprint 5 interactive demonstration
      const userMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text
      };
      setLocalMessages((prev) => [...prev, userMessage]);

      // Simulate a generic mock AI response to make the dummy interface feel alive
      setTimeout(() => {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `You asked: "${text}". I'm currently running in dummy mode for Sprint 5, but I can read your menus soon!`
        };
        setLocalMessages((prev) => [...prev, aiMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col bg-white/85 backdrop-blur-md border border-slate-200/70 rounded-3xl shadow-2xl shadow-slate-200/60 max-w-4xl w-full h-[650px] overflow-hidden transition-all duration-500">
      {/* Header section of the Chat Window */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white/40 backdrop-blur-sm">
        <div className="flex items-center space-x-3.5">
          {/* Decorative Menu Assistant Icon */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/20 text-base">
            🍽️
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Menu Companion</h2>
            <p className="text-xs text-slate-400 font-medium">Ask about items, ingredients, or prices</p>
          </div>
        </div>
      </div>

      {/* Messages Scrollable Area */}
      <div className="flex-grow overflow-y-auto px-6 py-5 bg-slate-50/10 scroll-smooth flex flex-col gap-1.5">
        {activeMessages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {/* Helper element to target scroll view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Area */}
      <div className="p-5 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <ChatInput onSendMessage={handleSendMessage} disabled={disabled} />
      </div>
    </div>
  );
};

export default ChatWindow;
