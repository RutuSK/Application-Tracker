import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Euro, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  ExternalLink,
  Sigma,
  Cpu,
  Layers,
  Code2,
  Sparkles
} from 'lucide-react';
import { CourseModule, SubjectCategory, UniversityProgram } from '../types/academic';

interface UniversityMatcherProps {
  universities: UniversityProgram[];
  selectedUniversity: UniversityProgram;
  onSelectUniversity: (program: UniversityProgram) => void;
  modules: CourseModule[];
}

export const UniversityMatcher: React.FC<UniversityMatcherProps> = ({
  universities,
  selectedUniversity,
  onSelectUniversity,
  modules
}) => {
  const [filterPortal, setFilterPortal] = useState<'all' | 'vpd' | 'direct'>('all');
  const [filterTuition, setFilterTuition] = useState<'all' | 'free' | 'paid'>('all');

  const filteredUniversities = universities.filter(uni => {
    if (filterPortal === 'vpd' && !uni.portal.includes('VPD')) return false;
    if (filterPortal === 'direct' && !uni.portal.includes('Direct')) return false;
    if (filterTuition === 'free' && !uni.tuitionFee.includes('€0')) return false;
    if (filterTuition === 'paid' && uni.tuitionFee.includes('€0')) return false;
    return true;
  });

  // Calculate ECTS compatibility for a program
  const getProgramEctsDeficits = (uni: UniversityProgram) => {
    let totalDeficit = 0;
    const categoryChecks = uni.requirements.map(req => {
      const catModules = modules.filter(m => m.category === req.category && m.status === 'matched');
      const verifiedEcts = catModules.reduce((s, m) => s + m.resultingEcts, 0);
      const deficit = Math.max(0, req.minEcts - verifiedEcts);
      totalDeficit += deficit;
      return {
        category: req.category,
        required: req.minEcts,
        verified: verifiedEcts,
        deficit,
        isCleared: deficit === 0
      };
    });

    return { totalDeficit, categoryChecks };
  };

  const getCategoryName = (cat: SubjectCategory) => {
    switch (cat) {
      case 'math': return 'Math & Stats';
      case 'theory': return 'Theoretical CS';
      case 'systems': return 'Systems';
      case 'software': return 'Software & DB';
      case 'electives': return 'Electives';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Header */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                TU9 & Excellence Universities
              </span>
              <span className="text-xs text-slate-400">
                Official FPSO & PO Admissions Regulations
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading mt-1">
              German University Curricular Standards & NC Matcher
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Compare your current academic record against German institutions. Each university sets autonomous subject-area thresholds. Deficits can trigger mandatory entrance exams (Auflagen) or immediate disqualification.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-[#0F172A] p-1 rounded-lg border border-slate-800 flex text-xs">
              <button
                onClick={() => setFilterPortal('all')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                  filterPortal === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Portals
              </button>
              <button
                onClick={() => setFilterPortal('vpd')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                  filterPortal === 'vpd' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                uni-assist (VPD)
              </button>
              <button
                onClick={() => setFilterPortal('direct')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                  filterPortal === 'direct' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Direct Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* University Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredUniversities.map((uni) => {
          const isCurrentSelected = selectedUniversity.id === uni.id;
          const { totalDeficit, categoryChecks } = getProgramEctsDeficits(uni);
          const isUrgent = uni.deadlineWarningDays <= 14;

          return (
            <div
              key={uni.id}
              className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isCurrentSelected
                  ? 'bg-[#1E293B] border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500'
                  : 'bg-[#1E293B] border-white/[0.08] hover:border-slate-500'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-blue-400 tracking-wider uppercase font-mono-numbers">
                        {uni.shortName}
                      </span>
                      {isCurrentSelected && (
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Active Benchmark
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                      {uni.degree}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center space-x-1.5 mt-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{uni.university}</span>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{uni.location}</span>
                    </p>
                  </div>

                  {/* Cutoff Tag */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      NC Cutoff
                    </span>
                    <span className="text-base font-extrabold text-white font-mono-numbers">
                      ~{uni.ncCutoff.toFixed(1)}
                    </span>
                  </div>
                </div>

                {/* Key metadata pills */}
                <div className="mt-3.5 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono-numbers">
                    {uni.portal}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {uni.tuitionFee}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {uni.languageReq}
                  </span>
                  
                  {/* Deadline with Amber Alert (<14 days) per spec */}
                  <span className={`px-2 py-0.5 rounded-full border flex items-center space-x-1 font-mono-numbers ${
                    isUrgent 
                      ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 font-semibold' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    {isUrgent && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                    <span>Deadline: {uni.applicationDeadline} ({uni.deadlineWarningDays}d left)</span>
                  </span>
                </div>

                {/* Subject-Area Equivalence Status for this university */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">
                      Curricular Prerequisite Match:
                    </span>
                    {totalDeficit > 0 ? (
                      <span className="text-xs font-semibold text-rose-400 font-mono-numbers">
                        Total Deficit: -{totalDeficit} ECTS
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>All ECTS Met</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categoryChecks.map((check) => (
                      <div
                        key={check.category}
                        className={`p-2 rounded-lg border text-[11px] ${
                          check.isCleared
                            ? 'bg-[#0F172A] border-emerald-500/30 text-emerald-300'
                            : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                        }`}
                      >
                        <div className="font-medium text-slate-300 truncate">
                          {getCategoryName(check.category)}
                        </div>
                        <div className="font-mono-numbers font-bold mt-0.5 flex items-baseline justify-between">
                          <span>{check.verified} / {check.required}</span>
                          {!check.isCleared && (
                            <span className="text-[10px] text-rose-400">-{check.deficit}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes & Aptitude Procedure */}
                <div className="mt-3 p-3 rounded-lg bg-[#0F172A] border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-blue-300">
                    Admissions Procedure:
                  </div>
                  <p className="leading-relaxed text-slate-300 text-[11px]">
                    {uni.admissionFormula}
                  </p>
                  <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                    {uni.notes}
                  </p>
                </div>

              </div>

              {/* Action buttons */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono-numbers">
                  Application Portal: {uni.portal}
                </span>

                <button
                  onClick={() => onSelectUniversity(uni)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    isCurrentSelected
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-500/20'
                  }`}
                >
                  <span>{isCurrentSelected ? 'Current Active Target' : 'Set as Benchmark'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
