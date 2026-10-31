import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { CourseModule, SubjectCategory } from '../types/academic';

interface ModuleTableProps {
  modules: CourseModule[];
  onDeleteModule: (id: string) => void;
  onEditModule: (module: CourseModule) => void;
  selectedCategoryFilter: string | null;
  onClearFilter: () => void;
}

export const ModuleTable: React.FC<ModuleTableProps> = ({
  modules,
  onDeleteModule,
  onEditModule,
  selectedCategoryFilter,
  onClearFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const filteredModules = modules.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.germanEquivalenceName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategoryFilter ? m.category === selectedCategoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const getCategoryLabel = (cat: SubjectCategory) => {
    switch (cat) {
      case 'math': return 'Math & Statistics';
      case 'theory': return 'Theoretical CS';
      case 'systems': return 'Systems & Hardware';
      case 'software': return 'Software & Databases';
      case 'electives': return 'Advanced Electives';
    }
  };

  const getStatusBadge = (status: CourseModule['status']) => {
    switch (status) {
      case 'matched':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
            <span>Matched</span>
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Review Required</span>
          </span>
        );
      case 'deficit':
        return (
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>Deficit</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] shadow-xl overflow-hidden">
      
      {/* Controls & Search Header */}
      <div className="p-4 sm:p-5 border-b border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-bold text-white font-heading">
              Curricular Equivalence Matrix
            </h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300 font-mono-numbers">
              {filteredModules.length} Modules
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual course credit conversion using Anabin multiplier standard (1 Home Credit ≈ 1.5 ECTS)
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Active filter badge */}
          {selectedCategoryFilter && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs">
              <span>Filter: {getCategoryLabel(selectedCategoryFilter as SubjectCategory)}</span>
              <button 
                onClick={onClearFilter}
                className="hover:text-white ml-1 font-bold cursor-pointer"
                title="Clear filter"
              >
                ✕
              </button>
            </div>
          )}

          {/* Search field */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search course, code, or German topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 focus:border-blue-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table container with responsive horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#0F172A]/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/[0.08] text-[11px]">
              <th className="py-3 px-4 w-10"></th>
              <th className="py-3 px-4">Code & Course Title</th>
              <th className="py-3 px-4">Subject Area</th>
              <th className="py-3 px-4">German Curriculum Equivalent</th>
              <th className="py-3 px-4 text-right">Home Cr.</th>
              <th className="py-3 px-4 text-right">Multiplier</th>
              <th className="py-3 px-4 text-right font-bold text-white">Resulting ECTS</th>
              <th className="py-3 px-4 text-center">Syllabus Match</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filteredModules.map((m, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedRowId === m.id;

              return (
                <React.Fragment key={m.id}>
                  <tr 
                    className={`transition-colors cursor-pointer group ${
                      isEven ? 'bg-[#1E293B]' : 'bg-[#182234]'
                    } hover:bg-slate-800/80`}
                    onClick={() => setExpandedRowId(isExpanded ? null : m.id)}
                  >
                    {/* Expand icon */}
                    <td className="py-2.5 px-3 text-slate-500">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-blue-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 group-hover:text-slate-300" />
                      )}
                    </td>

                    {/* Course Code & Name */}
                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-white font-mono-numbers">
                        {m.code}
                      </div>
                      <div className="text-slate-300 font-medium">
                        {m.name}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-2.5 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800/80 border border-slate-700/60">
                        {getCategoryLabel(m.category)}
                      </span>
                    </td>

                    {/* German Equivalence */}
                    <td className="py-2.5 px-4 font-medium text-slate-300">
                      <div className="text-blue-300 flex items-center space-x-1">
                        <span>{m.germanEquivalenceName}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono-numbers">
                        Grade: {m.grade}
                      </div>
                    </td>

                    {/* Numeric columns right-aligned per spec */}
                    <td className="py-2.5 px-4 text-right font-mono-numbers text-slate-300">
                      {m.homeCredits.toFixed(1)}
                    </td>

                    <td className="py-2.5 px-4 text-right font-mono-numbers text-slate-400">
                      ×{m.conversionFactor.toFixed(1)}
                    </td>

                    <td className="py-2.5 px-4 text-right font-mono-numbers font-bold text-white text-sm">
                      {m.resultingEcts.toFixed(1)}
                    </td>

                    {/* Syllabus Match Confidence */}
                    <td className="py-2.5 px-4 text-center">
                      <div className="inline-flex items-center space-x-1 font-mono-numbers text-[11px] text-slate-300">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{m.syllabusMatchConfidence}%</span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="py-2.5 px-4">
                      {getStatusBadge(m.status)}
                    </td>

                    {/* Action buttons */}
                    <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onEditModule(m)}
                          className="p-1 text-slate-400 hover:text-blue-400 hover:bg-slate-700/60 rounded transition-colors cursor-pointer"
                          title="Edit Module"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteModule(m.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 rounded transition-colors cursor-pointer"
                          title="Remove Module"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded syllabus snippet row */}
                  {isExpanded && (
                    <tr className="bg-slate-900/90 border-y border-blue-500/20">
                      <td colSpan={10} className="p-4 pl-12 text-xs">
                        <div className="bg-[#0F172A] p-3.5 rounded-lg border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-blue-400 flex items-center space-x-1.5">
                              <BookMarked className="w-4 h-4" />
                              <span>Official Modulhandbuch Excerpt / Syllabus Topics for uni-assist Curricularanalyse:</span>
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono-numbers">
                              AI OCR Extracted from Semester Transcript
                            </span>
                          </div>
                          <p className="text-slate-300 leading-relaxed font-sans">
                            {m.syllabusSnippet || 'No detailed course syllabus entered yet. You can edit this module to add specific course catalog descriptions required for uni-assist and TUM Curricularanalyse.'}
                          </p>
                          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <span>German Module Classification: <strong className="text-white">{m.germanEquivalenceName}</strong></span>
                            <span>Conversion standard: 30 hours per ECTS credit</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}

            {filteredModules.length === 0 && (
              <tr>
                <td colSpan={10} className="py-10 text-center text-slate-400">
                  No courses found matching criteria. Clear filter or add a course module.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count & info */}
      <div className="p-4 bg-[#0F172A]/90 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center space-x-2">
          <span>Formula:</span>
          <code className="text-blue-300 font-mono-numbers bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            ECTS = Home Credits × Multiplier (e.g. 4.0 × 1.5 = 6.0 ECTS)
          </code>
        </div>
        <div className="font-mono-numbers text-slate-300">
          Total Credits: <strong className="text-white">{modules.reduce((s, m) => s + m.resultingEcts, 0).toFixed(1)} ECTS</strong>
        </div>
      </div>

    </div>
  );
};
