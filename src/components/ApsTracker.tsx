import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  FileCheck, 
  Upload, 
  Eye, 
  AlertCircle, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  FileText
} from 'lucide-react';
import { ApsStage, DocumentItem } from '../types/academic';

interface ApsTrackerProps {
  stages: ApsStage[];
  documents: DocumentItem[];
  onToggleDocument: (id: string) => void;
  onPreviewDocument: (doc: DocumentItem) => void;
  onUploadMockDoc: (docId: string) => void;
}

export const ApsTracker: React.FC<ApsTrackerProps> = ({
  stages,
  documents,
  onToggleDocument,
  onPreviewDocument,
  onUploadMockDoc
}) => {
  const [activeStageId, setActiveStageId] = useState<number>(5);

  const completedStagesCount = stages.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedStagesCount / stages.length) * 100);

  const verifiedDocsCount = documents.filter(d => d.isUploaded && d.status === 'verified').length;

  return (
    <div className="space-y-6">
      
      {/* APS Milestone Status Card */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>APS Certificate Verified</span>
              </span>
              <span className="text-xs text-slate-400 font-mono-numbers">
                Akademische Prüfstelle der Deutschen Botschaft
              </span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading">
              APS Certification & uni-assist Verification Dossier
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Mandatory prerequisite for Indian, Chinese, and Vietnamese applicants under § 16b AufenthG for student visa issuance and uni-assist VPD processing. Authenticates your degree credentials and transcripts.
            </p>
          </div>

          {/* Quick Certificate Badge */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-emerald-500/30 flex items-center space-x-3.5 shadow-lg">
            <div className="p-3 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                Official Digital Certificate
              </span>
              <span className="text-sm font-bold text-white font-mono-numbers">
                DE-APS-DEL-2025-88391
              </span>
              <div className="flex items-center space-x-1 text-[11px] text-emerald-400 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified by Embassy Embassy Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Stage Milestone Progress Bar */}
        <div className="mt-8 pt-5 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-xs mb-2 font-mono-numbers">
            <span className="text-slate-300 font-medium">
              APS Verification Pipeline: <strong className="text-white">Stage {completedStagesCount} of {stages.length} Completed</strong>
            </span>
            <span className="text-emerald-400 font-bold">{progressPercent}% Cleared</span>
          </div>

          <div className="w-full h-2.5 bg-[#0F172A] rounded-full overflow-hidden p-0.5 border border-white/[0.05] relative mb-6">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Milestone Step Indicator Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stages.map((st) => {
              const isSelected = activeStageId === st.id;
              const isDone = st.status === 'completed';

              return (
                <div
                  key={st.id}
                  onClick={() => setActiveStageId(st.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-blue-500 shadow-md ring-1 ring-blue-500'
                      : isDone
                      ? 'bg-[#0F172A] border-emerald-500/30 hover:border-emerald-500/60'
                      : 'bg-[#0F172A] border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono-numbers text-[10px] uppercase font-bold text-slate-400">
                      Stage 0{st.id}
                    </span>
                    {isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>
                  <div className="font-bold text-white leading-tight">
                    {st.title}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono-numbers">
                    {st.date}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed View for Active Stage */}
          {stages.find(s => s.id === activeStageId) && (
            <div className="mt-4 p-4 rounded-xl bg-[#0F172A] border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">
                  Stage {activeStageId}: {stages.find(s => s.id === activeStageId)?.title}
                </span>
                <span className="text-[11px] text-slate-400 italic">
                  {stages.find(s => s.id === activeStageId)?.germanTitle}
                </span>
              </div>
              <p className="text-slate-300">
                {stages.find(s => s.id === activeStageId)?.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {stages.find(s => s.id === activeStageId)?.details.map((detail, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800 font-mono-numbers text-[11px] flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{detail}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document Checklist Items per Design Specification */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Certified Document Checklist & OCR Extractor
            </h3>
            <p className="text-xs text-slate-400">
              German university requirements: verified transcripts, degree certificates, module handbook, and language test records.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono-numbers text-slate-300">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
              {verifiedDocsCount} / {documents.length} Verified
            </span>
          </div>
        </div>

        {/* List of Document Checklist items */}
        <div className="space-y-2.5">
          {documents.map((doc) => {
            const isCompleted = doc.isUploaded;

            return (
              <div
                key={doc.id}
                className="group p-4 rounded-xl border border-white/[0.06] bg-[#1E293B] hover:bg-slate-800/80 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left check & info */}
                <div className="flex items-start space-x-3.5">
                  {/* Interactive custom square checkbox (20x20px, 6px radius) per spec */}
                  <button
                    type="button"
                    onClick={() => onToggleDocument(doc.id)}
                    className={`mt-0.5 w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-500/50'
                        : 'bg-[#0F172A] border-slate-600 hover:border-slate-400 text-transparent'
                    }`}
                    title={isCompleted ? 'Mark as pending' : 'Mark as uploaded'}
                  >
                    <svg className={`w-3.5 h-3.5 stroke-current stroke-2 fill-none ${isCompleted ? 'block' : 'hidden'}`} viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-slate-300'}`}>
                        {doc.name}
                      </span>
                      {doc.mandatory && (
                        <span className="text-[10px] text-rose-400 font-semibold uppercase px-1.5 py-0.2 rounded bg-rose-500/10 border border-rose-500/20">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 italic">
                      {doc.germanName}
                    </div>
                    <p className="text-xs text-slate-300 leading-snug">
                      {doc.details}
                    </p>
                  </div>
                </div>

                {/* Micro-actions pinned right per spec:
                    quick-preview icon button, AI extraction validation pill, and upload timestamp in data-mono */}
                <div className="flex flex-wrap items-center justify-end gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/[0.04]">
                  {/* AI extraction validation pill */}
                  {doc.status === 'verified' && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center space-x-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>{doc.validationMessage}</span>
                    </span>
                  )}

                  {doc.status === 'review_needed' && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center space-x-1.5">
                      <AlertCircle className="w-3 h-3 text-amber-400" />
                      <span>{doc.validationMessage}</span>
                    </span>
                  )}

                  {doc.status === 'pending' && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700 flex items-center space-x-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{doc.validationMessage}</span>
                    </span>
                  )}

                  {/* Upload timestamp in data-mono per spec */}
                  <span className="text-[11px] font-mono-numbers text-slate-400 hidden sm:inline">
                    {doc.timestamp}
                  </span>

                  {/* Quick-preview button */}
                  <button
                    onClick={() => onPreviewDocument(doc)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer flex items-center space-x-1 text-xs"
                    title="Quick Dossier Preview"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Inspect</span>
                  </button>

                  {/* Upload trigger button if not uploaded */}
                  {!doc.isUploaded && (
                    <button
                      onClick={() => onUploadMockDoc(doc.id)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center space-x-1 transition-all cursor-pointer shadow-sm shadow-blue-500/25"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
