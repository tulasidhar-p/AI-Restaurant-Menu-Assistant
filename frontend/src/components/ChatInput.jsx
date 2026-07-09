import React, { useState } from 'react';

/**
 * ChatInput component containing a text input field and a send button.
 * Triggers the message submission via the send button or pressing Enter.
 *
 * @param {Object} props
 * @param {function} props.onSendMessage - Callback triggered when a non-empty message is sent.
 * @param {boolean} [props.disabled=false] - Whether the input and send button should be disabled.
 */
const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim() || disabled) return;

    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200/80 rounded-2xl focus-within:ring-4 focus-within:ring-violet-500/10 focus-within:border-violet-500/80 focus-within:bg-white transition-all duration-300"
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message about the menu..."
        disabled={disabled}
        className="flex-grow bg-transparent px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:cursor-not-allowed font-medium"
      />
      
      <button
        type="submit"
        disabled={disabled || !inputText.trim()}
        className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white disabled:from-slate-100 disabled:to-slate-100 disabled:text-slate-400 transition-all duration-200 select-none cursor-pointer focus:outline-none shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-95 disabled:pointer-events-none disabled:shadow-none"
        title="Send message"
      >
        {/* Modern Send Icon (SVG) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2.5} 
          stroke="currentColor" 
          className="w-4.5 h-4.5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" 
          />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;
