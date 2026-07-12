/**
 * SupportedPdfNotice component (Sprint 6.1).
 * Displays clear information about supported and unsupported PDF formats for menu analysis.
 */
const SupportedPdfNotice = () => {
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-100 shadow-md p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center space-x-2.5 mb-4">
        <span className="text-2xl" role="img" aria-label="Page icon">📄</span>
        <h2 className="text-lg font-bold text-slate-800">Supported PDF Formats</h2>
      </div>
      
      <p className="text-sm text-slate-500 mb-5 font-medium">
        The current version of this application supports:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {/* Supported Column */}
        <div className="bg-emerald-50/30 border border-emerald-100/60 rounded-xl p-4 flex flex-col space-y-3">
          <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            Supported Formats
          </h3>
          <ul className="space-y-2.5 text-slate-600 text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 select-none">✅</span>
              <span>Digitally generated restaurant menu PDFs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 select-none">✅</span>
              <span>Searchable text-based PDFs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-emerald-600 select-none">✅</span>
              <span>Computer-generated menu PDFs</span>
            </li>
          </ul>
        </div>

        {/* Not Supported Column */}
        <div className="bg-rose-50/20 border border-rose-100/40 rounded-xl p-4 flex flex-col space-y-3">
          <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider">
            Currently Not Supported
          </h3>
          <ul className="space-y-2.5 text-slate-600 text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-rose-500 select-none">❌</span>
              <span>Scanned PDF menus</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-rose-500 select-none">❌</span>
              <span>Image-only PDFs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-rose-500 select-none">❌</span>
              <span>Photos converted into PDF</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Future Enhancement Banner */}
      <div className="bg-violet-50/30 border border-violet-100/50 rounded-xl p-3 flex items-start space-x-3">
        <span className="text-base select-none mt-0.5" role="img" aria-label="Light bulb">💡</span>
        <div>
          <h4 className="text-xs font-bold text-violet-800 mb-0.5">Future Enhancement</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Support for scanned and image-based menu PDFs through OCR is planned as a future enhancement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportedPdfNotice;
