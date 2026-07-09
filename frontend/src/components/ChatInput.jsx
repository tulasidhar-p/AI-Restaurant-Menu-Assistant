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
      className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-violet-500/20 focus-within:border-violet-500 transition-all duration-200"
    >
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something about the menu..."
        disabled={disabled}
        className="flex-grow bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:cursor-not-allowed"
      />
      
      <button
        type="submit"
        disabled={disabled || !inputText.trim()}
        className="flex items-center justify-center p-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white disabled:bg-slate-100 disabled:text-slate-400 transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none"
        title="Send message"
      >
        {/* Modern Send Icon (SVG) */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-4 h-4"
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
