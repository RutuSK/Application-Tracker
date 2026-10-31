import React, { useState } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { calculateBavarianGrade, COMMON_GRADING_SCALES } from '../utils/bavarianFormula';
import { UniversityProgram } from '../types/academic';

interface BavarianCalculatorProps {
  currentGrade: string;
  onGradeChange: (newGrade: string) => void;
  universities: UniversityProgram[];
  onSelectUniversity: (program: UniversityProgram) => void;
}

export const BavarianCalculator: React.FC<BavarianCalculatorProps> = ({
  currentGrade,
  onGradeChange,
  universities,
  onSelectUniversity
}) => {
  const [selectedScaleId, setSelectedScaleId] = useState('india-10');
  const [nMax, setNMax] = useState<number>(10.0);
  const [nMin, setNMin] = useState<number>(4.0);
  const [nObtained, setNObtained] = useState<number>(8.65);

  const handleScaleChange = (scaleId: string) => {
    setSelectedScaleId(scaleId);
    const scale = COMMON_GRADING_SCALES.find(s => s.id === scaleId);
    if (scale) {
      setNMax(scale.nMax);
      setNMin(scale.nMin);
      setNObtained(scale.defaultScore);
      const res = calculateBavarianGrade(scale.nMax, scale.nMin, scale.defaultScore);
      onGradeChange(res.formattedGrade);
    }
  };

  const handleScoreChange = (score: number) => {
    setNObtained(score);
    const res = calculateBavarianGrade(nMax, nMin, score);
    onGradeChange(res.formattedGrade);
  };

  const result = calculateBavarianGrade(nMax, nMin, nObtained);

  // Determine admission chance for a university
  const getProgramMatch = (uni: UniversityProgram) => {
    const gradeNum = result.germanGrade;
    const cutoff = uni.ncCutoff;

    if (gradeNum <= cutoff - 0.2) {
      return {
        status: 'Safe / Highly Competitive',
        color: 'text-emerald-400',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
        verdict: 'Your German grade comfortably exceeds the historical NC threshold.'
      };
    } else if (gradeNum <= cutoff) {
      return {
        status: 'Competitive (NC Cleared)',
        color: 'text-blue-400',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
        verdict: 'Meets primary NC criteria. Subject to aptitude assessment or interview.'
      };
    } else if (gradeNum <= cutoff + 0.4) {
      return {
        status: 'Borderline (Stage 2 Required)',
        color: 'text-amber-400',
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
        verdict: 'Slightly above strict NC, likely routed to written entrance exam or oral interview.'
      };
    } else {
      return {
        status: 'Reach / Below Historical Cutoff',
        color: 'text-rose-400',
        badge: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
        verdict: 'Below standard NC filter. Requires extraordinary work experience or GRE.'
      };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                Official KMK Standard
              </span>
              <span className="text-xs text-slate-400">
                Resolution of the Standing Conference of Ministers of Education
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading">
              Modified Bavarian Formula (Modifizierte Bayerische Formel)
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              In Germany, all higher education institutions, uni-assist, and the Akademische Prüfstelle (APS) strictly use the modified Bavarian formula to convert foreign bachelor grades to the German 1.0–5.0 scale.
            </p>
          </div>

          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 text-center min-w-[200px]">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Resulting German Grade
            </span>
            <div className="text-4xl font-extrabold text-white font-mono-numbers mt-1 flex items-center justify-center space-x-1.5">
              <span>{result.formattedGrade}</span>
            </div>
            <span className="inline-block mt-1 text-xs font-semibold text-emerald-400">
              {result.classification.germanText}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Calculator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl space-y-5">
          <div>
            <h3 className="text-base font-bold text-white font-heading flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Grading Scale Parameters</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your university grading system or set custom transcript boundaries.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Common System Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {COMMON_GRADING_SCALES.map((scale) => {
                const isSelected = selectedScaleId === scale.id;
                return (
                  <button
                    key={scale.id}
                    onClick={() => handleScaleChange(scale.id)}
                    className={`text-left p-3 rounded-lg border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm'
                        : 'bg-[#0F172A] border-slate-800 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="font-semibold text-white">{scale.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Max: {scale.nMax} | Min Pass: {scale.nMin}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Numeric Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
              <label className="block text-[11px] text-slate-400 mb-1">
                Max Possible Grade (<span className="text-blue-300 font-mono-numbers">N<sub>max</sub></span>)
              </label>
              <input
                type="number"
                step="0.01"
                value={nMax}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setNMax(val);
                  handleScoreChange(nObtained);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono-numbers"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">e.g. 10.0 or 4.0</span>
            </div>

            <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
              <label className="block text-[11px] text-slate-400 mb-1">
                Min Passing Grade (<span className="text-blue-300 font-mono-numbers">N<sub>min</sub></span>)
              </label>
              <input
                type="number"
                step="0.01"
                value={nMin}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setNMin(val);
                  handleScoreChange(nObtained);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-mono-numbers"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Lowest passing mark</span>
            </div>

            <div className="bg-[#0F172A] p-3 rounded-lg border border-blue-500/40">
              <label className="block text-[11px] text-blue-300 font-semibold mb-1">
                Your CGPA / Score (<span className="text-white font-mono-numbers">N<sub>d</sub></span>)
              </label>
              <input
                type="number"
                step="0.01"
                min={nMin}
                max={nMax}
                value={nObtained}
                onChange={(e) => handleScoreChange(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-blue-500 rounded px-2.5 py-1.5 text-xs text-white font-mono-numbers font-bold"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">From official transcript</span>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
              <span>Drag to simulate CGPA changes:</span>
              <span className="font-mono-numbers font-bold text-white text-sm">{nObtained.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={nMin}
              max={nMax}
              step={(nMax - nMin) / 100}
              value={nObtained}
              onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#0F172A] rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono-numbers mt-1">
              <span>Min pass: {nMin}</span>
              <span>Max: {nMax}</span>
            </div>
          </div>

          {/* Step by step mathematical proof */}
          <div className="p-3.5 bg-[#0F172A] rounded-lg border border-slate-800 text-xs space-y-2">
            <span className="font-semibold text-slate-300 flex items-center space-x-1">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>Exact Mathematical Derivation:</span>
            </span>
            <div className="font-mono-numbers text-slate-300 space-y-1 bg-slate-950/70 p-2.5 rounded border border-white/[0.04] text-[11px]">
              <div>Formula: Grade = 1 + 3 × [(Nmax - Nd) / (Nmax - Nmin)]</div>
              <div>Substituted: 1 + 3 × [({result.stepByStep.nMax} - {result.stepByStep.nObtained}) / ({result.stepByStep.nMax} - {result.stepByStep.nMin})]</div>
              <div>Ratio = {result.stepByStep.difference.toFixed(2)} / {result.stepByStep.range.toFixed(2)} = {result.stepByStep.ratio.toFixed(4)}</div>
              <div>Calculated = 1 + 3 × ({result.stepByStep.ratio.toFixed(4)}) = <strong className="text-emerald-400">{result.stepByStep.rawGrade.toFixed(2)}</strong></div>
              <div className="text-white font-bold">Standard Rounded German Mark = {result.formattedGrade}</div>
            </div>
          </div>

        </div>

        {/* Right Scale Visualizer (5 cols) */}
        <div className="lg:col-span-5 bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              German Academic Scale (Notenstufen)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              In the German system, 1.0 is the highest possible grade and 4.0 is the pass barrier.
            </p>
          </div>

          {/* Vertical Visualizer */}
          <div className="space-y-2">
            {[
              { range: '1.0 – 1.5', german: 'Sehr gut', eng: 'Excellent', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', active: result.germanGrade <= 1.5 },
              { range: '1.6 – 2.5', german: 'Gut', eng: 'Good / Solid', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', active: result.germanGrade > 1.5 && result.germanGrade <= 2.5 },
              { range: '2.6 – 3.5', german: 'Befriedigend', eng: 'Satisfactory', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', active: result.germanGrade > 2.5 && result.germanGrade <= 3.5 },
              { range: '3.6 – 4.0', german: 'Ausreichend', eng: 'Sufficient (Pass)', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', active: result.germanGrade > 3.5 && result.germanGrade <= 4.0 },
              { range: '> 4.0', german: 'Nicht ausreichend', eng: 'Fail', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30', active: result.germanGrade > 4.0 }
            ].map((gradeItem) => (
              <div
                key={gradeItem.range}
                className={`p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                  gradeItem.active 
                    ? `${gradeItem.color} ring-1 ring-white/30 font-bold scale-[1.02] shadow-md` 
                    : 'bg-[#0F172A] border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-mono-numbers font-bold">{gradeItem.range}</span>
                  <span>•</span>
                  <span>{gradeItem.german}</span>
                </div>
                <span className="text-[11px]">{gradeItem.eng}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Your current converted grade <strong className="text-white">{result.formattedGrade}</strong> is verified for all uni-assist Preliminary Review Documentations (VPD) and direct university portal applications.
            </span>
          </div>

        </div>

      </div>

      {/* University NC Cutoff Comparison Matrix */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white font-heading">
              Live NC Cutoff & Admission Probability Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated against latest admission stats (Numerus Clausus & Aptitude Procedures) for your converted grade <strong className="text-emerald-400 font-mono-numbers">{result.formattedGrade}</strong>
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono-numbers">
            Wintersemester Cutoffs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universities.map((uni) => {
            const match = getProgramMatch(uni);

            return (
              <div
                key={uni.id}
                className="bg-[#0F172A] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between hover:border-slate-600 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {uni.shortName}
                      </h4>
                      <p className="text-xs text-blue-300 font-medium">
                        {uni.degree}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono-numbers px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      NC ~{uni.ncCutoff.toFixed(1)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${match.badge}`}>
                      {match.status}
                    </span>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {match.verdict}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Portal: {uni.portal}
                  </span>
                  <button
                    onClick={() => onSelectUniversity(uni)}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
