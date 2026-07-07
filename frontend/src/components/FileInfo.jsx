/**
 * FileInfo component to display selected file metadata.
 *
 * @param {Object} props
 * @param {File} props.file - The selected File object.
 * @param {function} props.onRemove - Callback to clear the selected file.
 */
const FileInfo = ({ file, onRemove }) => {
  if (!file) return null;

  // Format file size helper
  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full">
      <div className="flex items-center space-x-3 overflow-hidden">
        <span className="text-red-500 text-2xl flex-shrink-0" role="img" aria-label="PDF File">
          📄
        </span>
        <div className="overflow-hidden">
          <p className="font-medium text-slate-700 truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-slate-400">
            {formatSize(file.size)}
          </p>
        </div>
      </div>
      
      <button
        type="button"
        onClick={onRemove}
        className="text-slate-400 hover:text-red-500 font-medium text-xs p-1 rounded transition-colors duration-200 cursor-pointer"
        title="Remove file"
      >
        ✕
      </button>
    </div>
  );
};

export default FileInfo;
