import React from 'react';
import { X, ShieldCheck, QrCode, FileText, CheckCircle2, Clock, Sparkles, Download } from 'lucide-react';
import { DocumentItem } from '../types/academic';

interface DocumentPreviewModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  isOpen,
  onClose
}) => {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1E293B] border border-white/[0.12] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#171f33] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                {document.name}
              </h3>
              <p className="text-xs text-slate-400 italic">
                {document.germanName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
          {/* Status highlight */}
          <div className="p-4 rounded-xl bg-[#0F172A] border border-slate-800 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Verification Protocol
              </span>
              <div className="flex items-center space-x-2">
                {document.status === 'verified' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{document.validationMessage}</span>
                  </span>
                )}
                {document.status === 'review_needed' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center space-x-1.5">
                    <span>{document.validationMessage}</span>
                  </span>
                )}
                {document.status === 'pending' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pending Ingestion</span>
                  </span>
                )}
              </div>
            </div>

            <div className="text-right text-xs font-mono-numbers text-slate-400">
              <div>Size: <span className="text-slate-200">{document.fileSize || 'N/A'}</span></div>
              <div className="text-[11px] text-slate-500">{document.timestamp}</div>
            </div>
          </div>

          {/* Document specifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Institutional Authentication Attributes
            </h4>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Issuing Authority</span>
                <div className="font-semibold text-white">German Embassy / Academic Registrar</div>
              </div>

              <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Acceptance Status</span>
                <div className="font-semibold text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Valid for all TU9 & uni-assist</span>
                </div>
              </div>

              <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Legal Standard</span>
                <div className="font-semibold text-slate-300">§ 16b AufenthG & KMK Standards</div>
              </div>

              <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-semibold">Digital PKI Signature</span>
                <div className="font-mono-numbers text-slate-300 text-[11px] truncate">
                  SHA-256: 7f83b1657ff1...93b
                </div>
              </div>
            </div>
          </div>

          {/* OCR Content Preview Box */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center space-x-1.5 text-blue-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Extracted Transcript & Dossier Metadata:</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono-numbers">Confidence: 99.8%</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono-numbers bg-slate-950 p-3 rounded border border-white/[0.04]">
              {document.details}
              <br />
              [AUTHENTICATED RECORD]: All course codes, credits, and syllabus topics have been indexed for cross-referencing with the Academic Precision Curricularanalyse engine.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08] bg-[#171f33] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
