import { useRef } from 'react';
import Button from './Button';
import FileInfo from './FileInfo';

/**
 * UploadCard component.
 *
 * @param {Object} props
 * @param {File} props.file - Current selected file.
 * @param {function} props.onFileSelect - Callback when file is selected.
 * @param {function} props.onFileRemove - Callback when file is removed.
 * @param {function} props.onUpload - Callback when upload button is clicked.
 */
const UploadCard = ({ file, onFileSelect, onFileRemove, onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl max-w-md w-full flex flex-col items-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />

      {/* Upload Zone / File Info */}
      {!file ? (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-slate-300 hover:border-violet-500 rounded-xl p-8 w-full flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group bg-slate-50 hover:bg-violet-50/30"
        >
          <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200" role="img" aria-label="Upload cloud">
            📤
          </span>
          <p className="text-sm font-semibold text-slate-700">Choose Restaurant Menu (PDF)</p>
          <p className="text-xs text-slate-400 mt-1">Accepts only PDF files</p>
        </div>
      ) : (
        <div className="w-full">
          <FileInfo file={file} onRemove={onFileRemove} />
        </div>
      )}

      {/* Upload Button - Always visible, disabled until file is selected */}
      <Button
        onClick={onUpload}
        disabled={!file}
        className="w-full mt-5 flex items-center justify-center space-x-2"
      >
        <span>Upload Menu</span>
        <span role="img" aria-label="Sparkles">✨</span>
      </Button>
    </div>
  );
};

export default UploadCard;
