import React from 'react';
import { 
  AlertOctagon, 
  CheckCircle, 
  AlertTriangle, 
  PlusCircle, 
  BookOpen, 
  Info, 
  HelpCircle,
  FileCheck2,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  Sigma,
  Sparkles
} from 'lucide-react';
import { CategoryRequirement, CourseModule, UniversityProgram, SubjectCategory } from '../types/academic';

interface EctsDiagnosticProps {
  categories: CategoryRequirement[];
  modules: CourseModule[];
  selectedUniversity: UniversityProgram;
  onOpenAddModal: () => void;
  selectedCategoryFilter: string | null;
  onSelectCategoryFilter: (category: string | null) => void;
}

export const EctsDiagnostic: React.FC<EctsDiagnosticProps> = ({
  categories,
  modules,
  selectedUniversity,
  onOpenAddModal,
  selectedCategoryFilter,
  onSelectCategoryFilter,
}) => {
  // Calculate transferred ECTS per category
  const categoryStats = categories.map((cat) => {
    // Look up specific program requirements if available, else default to category baseline
    const targetReq = selectedUniversity.requirements.find(r => r.category === cat.id);
    const required = targetReq ? targetReq.minEcts : cat.requiredEcts;

    const catModules = modules.filter(m => m.category === cat.id);
    const verifiedModules = catModules.filter(m => m.status === 'matched');
    const reviewModules = catModules.filter(m => m.status === 'review');

    const verifiedEcts = verifiedModules.reduce((sum, m) => sum + m.resultingEcts, 0);
    const reviewEcts = reviewModules.reduce((sum, m) => sum + m.resultingEcts, 0);
    const totalTransferred = verifiedEcts + reviewEcts;
    const deficit = Math.max(0, required - verifiedEcts);
    const pass = deficit === 0;

    return {
      category: cat,
      required,
      verifiedEcts,
      reviewEcts,
      totalTransferred,
      deficit,
      pass,
      modulesCount: catModules.length,
      verifiedPercentage: Math.min(100, Math.round((verifiedEcts / required) * 100)),
      totalPercentage: Math.min(100, Math.round((totalTransferred / required) * 100))
    };
  });

  const grandRequired = categoryStats.reduce((sum, s) => sum + s.required, 0);
  const grandTransferred = categoryStats.reduce((sum, s) => sum + s.verifiedEcts, 0);
  const grandDeficit = categoryStats.reduce((sum, s) => sum + s.deficit, 0);
  const grandPercentage = Math.min(100, Math.round((grandTransferred / grandRequired) * 100));

  const getCategoryIcon = (id: SubjectCategory) => {
    switch (id) {
      case 'math': return <Sigma className="w-5 h-5 text-blue-400" />;
      case 'theory': return <Cpu className="w-5 h-5 text-rose-400" />;
      case 'systems': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'software': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'electives': return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* High-Impact Diagnostic Banner */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                Curricularanalyse Engine
              </span>
              <span className="text-xs text-slate-400 font-mono-numbers">
                Standard: {selectedUniversity.shortName} Examination Regulations (FPSO/PO)
              </span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading">
              Credit Equivalence & Subject-Area Clearance
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              German university admissions committees evaluate whether an international bachelor curriculum contains equivalent theoretical foundations. A credit deficit exceeding 30 ECTS generally causes direct rejection.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Map New Course Module</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar per design spec */}
        <div className="mt-6 pt-5 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-xs mb-2 font-mono-numbers">
            <span className="text-slate-300 font-medium">
              Overall Subject Equivalence: <span className="text-white font-bold">{grandTransferred} ECTS</span> verified out of <span className="text-slate-400">{grandRequired} ECTS</span> required
            </span>
            <div className="flex items-center space-x-3">
              {grandDeficit > 0 ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>Deficit: -{grandDeficit} ECTS</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>All Subject Thresholds Cleared</span>
                </span>
              )}
              <span className="text-white font-bold">{grandPercentage}%</span>
            </div>
          </div>

          {/* Dual-segment progress bar with base track #0F172A, height 8px, rounded 9999px */}
          <div className="w-full h-2.5 bg-[#0F172A] rounded-full overflow-hidden p-0.5 border border-white/[0.05] relative">
            {/* Verified track (Emerald/Cobalt gradient) */}
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${grandPercentage}%` }}
            />
          </div>

          {/* Critical Warning if Deficit in Theoretical Informatics */}
          {categoryStats.find(c => c.category.id === 'theory' && c.deficit > 0) && (
            <div className="mt-4 p-3.5 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-start space-x-3">
              <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-200">
                <p className="font-semibold text-rose-300">
                  CRITICAL DEFICIT DETECTED IN THEORETICAL COMPUTER SCIENCE:
                </p>
                <p className="mt-1 text-slate-300">
                  {selectedUniversity.shortName} requires at least {categoryStats.find(c => c.category.id === 'theory')?.required} ECTS in Automata Theory, Formal Languages & Computability. Current verified ECTS is {categoryStats.find(c => c.category.id === 'theory')?.verifiedEcts} ECTS (Deficit: {categoryStats.find(c => c.category.id === 'theory')?.deficit} ECTS). You may be assigned mandatory entrance exams (Auflagen) or assessed in Stage 2.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Modular Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-heading">
            Subject-Area Equivalence Breakdown
          </h3>
          <span className="text-xs text-slate-400">
            Click any category to filter the credit mapping table below
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((stat) => {
            const isSelected = selectedCategoryFilter === stat.category.id;
            const hasDeficit = stat.deficit > 0;

            return (
              <div
                key={stat.category.id}
                onClick={() => onSelectCategoryFilter(isSelected ? null : stat.category.id)}
                className={`group p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-[#1E293B] border-blue-500/60 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500' 
                    : 'bg-[#1E293B] border-white/[0.08] hover:border-slate-500 hover:bg-[#1e293b]/90'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-slate-900 border border-white/[0.06]">
                      {getCategoryIcon(stat.category.id)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                        {stat.category.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 italic">
                        {stat.category.germanName}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge per spec */}
                  {hasDeficit ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center space-x-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>-{stat.deficit} ECTS</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Cleared</span>
                    </span>
                  )}
                </div>

                {/* Numbers */}
                <div className="mt-4 flex items-baseline justify-between font-mono-numbers text-xs">
                  <div>
                    <span className="text-xl font-bold text-white">
                      {stat.verifiedEcts}
                    </span>
                    <span className="text-slate-400 ml-1">
                      / {stat.required} ECTS
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    {stat.modulesCount} mapped courses
                  </span>
                </div>

                {/* Progress bar per category */}
                <div className="mt-2 w-full h-2 bg-[#0F172A] rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      hasDeficit ? 'bg-gradient-to-r from-blue-500 to-amber-500' : 'bg-gradient-to-r from-blue-500 to-emerald-400'
                    }`}
                    style={{ width: `${Math.min(100, (stat.verifiedEcts / stat.required) * 100)}%` }}
                  />
                  {/* Tick line if deficit */}
                  {hasDeficit && (
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10" 
                      style={{ left: '98%' }} 
                      title="Required minimum threshold"
                    />
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/[0.04]">
                  <span>{stat.category.description.slice(0, 38)}...</span>
                  <span className="text-blue-400 font-medium group-hover:underline">
                    {isSelected ? 'Show All' : 'Inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
