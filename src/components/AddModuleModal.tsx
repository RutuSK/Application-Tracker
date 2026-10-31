import React, { useState, useEffect } from 'react';
import { X, Plus, Save, BookOpen, Calculator, Sparkles } from 'lucide-react';
import { CourseModule, SubjectCategory } from '../types/academic';

interface AddModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (module: Partial<CourseModule>) => void;
  initialData?: CourseModule | null;
}

export const AddModuleModal: React.FC<AddModuleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SubjectCategory>('theory');
  const [germanEquivalenceName, setGermanEquivalenceName] = useState('');
  const [homeCredits, setHomeCredits] = useState<number>(4);
  const [conversionFactor, setConversionFactor] = useState<number>(1.5);
  const [grade, setGrade] = useState('A (8.5)');
  const [syllabusSnippet, setSyllabusSnippet] = useState('');
  const [status, setStatus] = useState<'matched' | 'review' | 'deficit'>('matched');

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code);
      setName(initialData.name);
      setCategory(initialData.category);
      setGermanEquivalenceName(initialData.germanEquivalenceName);
      setHomeCredits(initialData.homeCredits);
      setConversionFactor(initialData.conversionFactor);
      setGrade(initialData.grade);
      setSyllabusSnippet(initialData.syllabusSnippet || '');
      setStatus(initialData.status);
    } else {
      setCode('');
      setName('');
      setCategory('theory');
      setGermanEquivalenceName('');
      setHomeCredits(4);
      setConversionFactor(1.5);
      setGrade('A (8.5)');
      setSyllabusSnippet('');
      setStatus('matched');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const resultingEcts = Math.round(homeCredits * conversionFactor * 10) / 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: initialData?.id || `mod-${Date.now()}`,
      code: code || 'CS-MOD',
      name: name.trim(),
      category,
      germanEquivalenceName: germanEquivalenceName || name,
      homeCredits: Number(homeCredits),
      conversionFactor: Number(conversionFactor),
      resultingEcts,
      grade: grade.trim() || 'A',
      syllabusSnippet: syllabusSnippet.trim(),
      status,
      syllabusMatchConfidence: initialData?.syllabusMatchConfidence || 95
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#1E293B] border border-white/[0.12] rounded-xl max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#171f33]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                {initialData ? 'Edit Course Module' : 'Map New Transcript Course'}
              </h3>
              <p className="text-xs text-slate-400">
                Align international coursework to German university module standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Course Code
              </label>
              <input
                type="text"
                placeholder="e.g. CS302"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-numbers"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Course Name (as on transcript) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Automata and Computation Theory"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subject Area Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SubjectCategory)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="math">Mathematics & Statistics</option>
                <option value="theory">Theoretical Computer Science</option>
                <option value="systems">Systems & Architecture</option>
                <option value="software">Software Engineering & Databases</option>
                <option value="electives">Advanced Electives & Specializations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                German Equivalent Title
              </label>
              <input
                type="text"
                placeholder="e.g. Formale Sprachen und Automaten"
                value={germanEquivalenceName}
                onChange={(e) => setGermanEquivalenceName(e.target.value)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Credits & Calculation */}
          <div className="bg-[#0F172A] p-3.5 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center space-x-1.5 text-blue-400">
                <Calculator className="w-3.5 h-3.5" />
                <span>Credit Equivalence Multiplier</span>
              </span>
              <span className="font-mono-numbers text-white font-bold text-sm">
                Resulting: {resultingEcts} ECTS
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Home Credits
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="30"
                  value={homeCredits}
                  onChange={(e) => setHomeCredits(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Multiplier
                </label>
                <select
                  value={conversionFactor}
                  onChange={(e) => setConversionFactor(parseFloat(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-numbers"
                >
                  <option value={1.5}>1.5× (Standard Indian 4-Year)</option>
                  <option value={2.0}>2.0× (US / Canadian Semester)</option>
                  <option value={0.5}>0.5× (UK CATS Credits)</option>
                  <option value={1.0}>1.0× (Direct ECTS)</option>
                  <option value={1.33}>1.33× (Indian 3-Year B.Sc)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Grade / Score
                </label>
                <input
                  type="text"
                  placeholder="e.g. A+ or 9.4"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-numbers"
                />
              </div>
            </div>
          </div>

          {/* Syllabus topics snippet */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
              <span>Syllabus Content / Modulbeschreibung (Key Topics)</span>
              <span className="text-[10px] text-slate-500 font-normal">Required for uni-assist & TUM comparison</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Regular expressions, Pushdown automata, Context-free grammars, Turing computability, Halting problem, NP-completeness proofs."
              value={syllabusSnippet}
              onChange={(e) => setSyllabusSnippet(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Equivalence Assessment
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="matched">Matched (Cleared)</option>
                <option value="review">Review Required (Partial)</option>
                <option value="deficit">Deficit (Incompatible)</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{initialData ? 'Update Module' : 'Add to Curricular Map'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
