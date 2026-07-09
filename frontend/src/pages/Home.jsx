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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col text-slate-800 antialiased">
      <header className="py-6 px-8 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl" role="img" aria-label="Robot and burger">🤖🍔</span>
            <span className="font-extrabold text-xl tracking-tight text-violet-600">AI Restaurant Menu Assistant</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 w-full max-w-6xl mx-auto">
        {/* Upload Container - kept in DOM for transition animations */}
        <div className={`transition-all duration-500 ease-in-out flex flex-col items-center w-full ${
          uploaded 
            ? 'opacity-0 max-h-0 overflow-hidden pointer-events-none scale-95' 
            : 'opacity-100 max-h-[1000px] scale-100'
        }`}>
          <div className="text-center mb-8 max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              AI Restaurant Menu Assistant
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
              Upload a restaurant menu PDF to get started.
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
