import React from 'react';

/**
 * ChatMessage component to render an individual message in the chat feed.
 * Supports distinct styles for user and AI senders, including circular text avatars.
 *
 * @param {Object} props
 * @param {Object} props.message - The message object.
 * @param {string} props.message.id - Unique identifier for the message.
 * @param {string} props.message.sender - Sender type: 'user' or 'ai'.
 * @param {string} props.message.text - Text content of the message.
 */
const ChatMessage = ({ message }) => {
  const { sender, text } = message;
  const isUser = sender === 'user';

  return (
    <div className={`flex items-start gap-3 w-full my-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Circular Avatar */}
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 select-none shadow-sm transition-transform duration-200 hover:scale-105 ${
          isUser 
            ? 'bg-violet-600 text-white' 
            : 'bg-slate-200 text-slate-700 border border-slate-300/50'
        }`}
      >
        {isUser ? 'You' : 'AI'}
      </div>

      {/* Message Bubble Container */}
      <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Message Bubble */}
        <div 
          className={`px-4 py-3 text-sm leading-relaxed shadow-sm transition-all duration-200 ${
            isUser 
              ? 'bg-violet-600 text-white rounded-2xl rounded-tr-none' 
              : 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-none border border-slate-200/50'
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
