import { useState } from 'react';
import UploadCard from '../components/UploadCard';

/**
 * Home page for the AI Restaurant Menu Assistant (Sprint 1).
 */
const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

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

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      setStatusMessage({ text: 'Menu uploaded successfully.', type: 'success' });
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatusMessage({ text: 'Upload failed.', type: 'error' });
    } finally {
      setUploading(false);
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

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
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
      </main>
    </div>
  );
};

export default Home;
