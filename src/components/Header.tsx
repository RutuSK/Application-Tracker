import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { UniversityProgram } from '../types/academic';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedUniversity: UniversityProgram;
  onSelectUniversity: (program: UniversityProgram) => void;
  allUniversities: UniversityProgram[];
  germanGrade: string;
  totalEcts: number;
  requiredEcts: number;
  totalDeficit: number;
  onOpenExport: () => void;
  onOpenAiDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  selectedUniversity,
  onSelectUniversity,
  allUniversities,
  germanGrade,
  totalEcts,
  requiredEcts,
  totalDeficit,
  onOpenExport,
  onOpenAiDrawer
}) => {
  const tabs = [
    { id: 'daad', label: 'DAAD Course Directory', icon: '🔍' },
    { id: 'eligibility', label: 'CV & Portfolio Eligibility', icon: '🎯' },
    { id: 'tracker', label: 'Application Pipeline', icon: '📌' },
    { id: 'ects', label: 'ECTS Diagnostic & Modules', icon: '📊' },
    { id: 'bavarian', label: 'Bavarian GPA & NC Cutoff', icon: '🧮' },
    { id: 'aps', label: 'APS & uni-assist Dossier', icon: '📑' },
    { id: 'copilot', label: 'AI Curricular Co-Pilot', icon: '⚡' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/90 backdrop-blur-md border-b border-white/[0.08]">
      {/* Top utility status bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-white/[0.04] flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center space-x-3 text-slate-400">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>KMK / ANABIN COMPLIANT</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline">Standards: TUM Satzung 2024 • uni-assist VPD Regulations</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 font-mono-numbers">APS ID: IND-APS-2024-91482</span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-slate-400 hidden md:inline">Intake:</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Wintersemester 2025/26
          </span>
          <button 
            onClick={onOpenExport}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors text-xs font-medium cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Export Curricularanalyse</span>
          </button>
        </div>
      </div>

      {/* Main navigation & target program selector */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-blue-400/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-heading">
                  ACADEMIC PRECISION
                </h1>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  DE Master Pro
                </span>
              </div>
              <p className="text-xs text-slate-400">
                German University Admissions & ECTS Credit Diagnostic Engine
              </p>
            </div>
          </div>

          {/* Target University Selector Dropdown & Live KPI Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* University Switcher */}
            <div className="relative group">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                Target Benchmark Program
              </div>
              <div className="relative">
                <select
                  value={selectedUniversity.id}
                  onChange={(e) => {
                    const found = allUniversities.find(u => u.id === e.target.value);
                    if (found) onSelectUniversity(found);
                  }}
                  className="appearance-none bg-slate-900 border border-slate-700 hover:border-blue-500/50 rounded-lg px-3 py-1.5 pr-8 text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-inner min-w-[210px]"
                >
                  {allUniversities.map((uni) => (
                    <option key={uni.id} value={uni.id} className="bg-slate-900 text-white">
                      {uni.shortName} – {uni.degree}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* German Grade Badge */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 flex flex-col items-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">German GPA</span>
              <div className="flex items-center space-x-1 text-emerald-400 font-bold text-sm font-mono-numbers">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{germanGrade}</span>
                <span className="text-[10px] text-emerald-500/80 font-normal">Sehr gut</span>
              </div>
            </div>

            {/* Total ECTS Badge */}
            <div className={`bg-slate-900/90 border rounded-lg px-3 py-1.5 flex flex-col items-center ${
              totalDeficit > 0 ? 'border-amber-500/30' : 'border-emerald-500/30'
            }`}>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Core ECTS Transferred
              </span>
              <div className="flex items-center space-x-1 font-bold text-sm font-mono-numbers">
                <span className={totalDeficit > 0 ? 'text-amber-400' : 'text-emerald-400'}>
                  {totalEcts} / {requiredEcts}
                </span>
                {totalDeficit > 0 ? (
                  <span className="text-[10px] text-amber-400 font-medium ml-1">
                    (-{totalDeficit} ECTS)
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-400 font-medium ml-1">
                    (Cleared)
                  </span>
                )}
              </div>
            </div>

            {/* Deadline Pill */}
            <div className="hidden lg:flex flex-col items-start bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Deadline</span>
              <div className="flex items-center space-x-1.5 text-xs text-amber-300 font-medium font-mono-numbers">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedUniversity.applicationDeadline}</span>
                <span className="text-[10px] text-amber-500">
                  ({selectedUniversity.deadlineWarningDays}d left)
                </span>
              </div>
            </div>

            {/* AI Assistant button */}
            <button
              onClick={onOpenAiDrawer}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer"
              title="Launch AI Admissions Co-pilot"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>
          </div>

        </div>

        {/* Tab Bar */}
        <div className="mt-4 flex items-center space-x-1 overflow-x-auto no-scrollbar border-t border-white/[0.06] pt-2">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
