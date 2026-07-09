import { useState } from 'react';
import UploadCard from '../components/UploadCard';
import ChatWindow from '../components/ChatWindow';
import { uploadMenu, askQuestion } from '../services/api';

/**
 * Home page for the AI Restaurant Menu Assistant (Sprint 1 & 5).
 */
const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  
  // Sprint 5 integration states
  const [uploaded, setUploaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setStatusMessage(null);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setStatusMessage(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setStatusMessage(null);

    try {
      const data = await uploadMenu(selectedFile);
      console.log('Upload successful:', data);
      
      // Initialize conversation when upload succeeds
      setMessages([
        {
          id: 'init',
          sender: 'ai',
          text: 'Hello! Your menu has been uploaded successfully. Ask me anything about the menu.'
        }
      ]);
      setUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatusMessage({ text: 'Upload failed.', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await askQuestion(text.trim());
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error asking question:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Sorry, I couldn't process your request."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/20 via-slate-50 to-slate-100/50 flex flex-col text-slate-800 antialiased">
      <header className="py-5 px-6 md:px-8 border-b border-slate-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-50 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-3xl transform hover:rotate-12 transition-transform duration-300 select-none" role="img" aria-label="Robot and burger">🤖🍔</span>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-lg md:text-xl tracking-tight text-slate-800">
                  AI Restaurant Menu Assistant
                </span>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[10px] font-semibold text-emerald-600 border border-emerald-100/60 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">Ask anything about your uploaded menu.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 md:py-16 max-w-5xl w-full mx-auto transition-all">
        {/* Upload Container - kept in DOM for transition animations */}
        <div className={`transition-all duration-500 ease-in-out flex flex-col items-center w-full ${
          uploaded 
            ? 'opacity-0 max-h-0 overflow-hidden pointer-events-none scale-95' 
            : 'opacity-100 max-h-[1000px] scale-100'
        }`}>
          <div className="text-center mb-10 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              AI Restaurant Menu Assistant
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              Upload your restaurant menu PDF and immediately ask our AI assistant about dishes, pricing, or ingredients.
            </p>
          </div>

          <UploadCard
            file={selectedFile}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            onUpload={handleUpload}
            uploading={uploading}
            statusMessage={statusMessage}
          />
        </div>

        {/* Chat Container - kept in DOM for transition animations */}
        <div className={`transition-all duration-500 ease-in-out w-full flex justify-center ${
          uploaded 
            ? 'opacity-100 max-h-[1000px] scale-100 mt-0' 
            : 'opacity-0 max-h-0 overflow-hidden pointer-events-none scale-95'
        }`}>
          <ChatWindow
            messages={loading ? [...messages, { id: 'thinking', sender: 'ai', text: '🤖 Thinking...' }] : messages}
            onSendMessage={handleSendMessage}
            disabled={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
