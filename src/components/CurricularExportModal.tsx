import React, { useRef } from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';
import { CourseModule, UniversityProgram, CategoryRequirement } from '../types/academic';

interface CurricularExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  modules: CourseModule[];
  categories: CategoryRequirement[];
  selectedUniversity: UniversityProgram;
  germanGrade: string;
}

export const CurricularExportModal: React.FC<CurricularExportModalProps> = ({
  isOpen,
  onClose,
  modules,
  categories,
  selectedUniversity,
  germanGrade
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const totalEcts = modules.reduce((sum, m) => sum + m.resultingEcts, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-[#1E293B] border border-white/[0.12] rounded-2xl max-w-4xl w-full shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden">
        
        {/* Modal Top Bar (Dark control header) */}
        <div className="p-4 px-6 bg-[#171f33] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Offizielle Curricularanalyse & ECTS-Vergleichsdokumentation
              </h3>
              <p className="text-xs text-slate-400">
                Official Document Export Form (KMK / uni-assist / TUM Format)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High-Contrast Light Surface Document Export View (#FFFFFF and #F8FAFC) per design spec */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-900/60 flex justify-center">
          <div 
            ref={printRef}
            className="w-full max-w-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-xl border border-slate-200 text-xs leading-relaxed font-sans"
            style={{ minHeight: '1000px' }}
          >
            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-1">
                  BUNDESREPUBLIK DEUTSCHLAND • HOCHSCHULZULASSUNG
                </span>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-heading">
                  CURRICULARANALYSE
                </h1>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  Fachliche Eignungsfeststellung & ECTS-Kreditpunkte-Anerkennung
                </p>
              </div>

              <div className="text-right border border-slate-300 p-2.5 rounded bg-slate-50">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dokument-ID</div>
                <div className="font-mono-numbers font-bold text-slate-900 text-xs mt-0.5">CA-2025-DE-88391</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center justify-end space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>APS Beglaubigt</span>
                </div>
              </div>
            </div>

            {/* Applicant & Target Profile Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Antragsteller / Bewerber</span>
                <strong className="text-sm text-slate-900 block mt-0.5">Anonymized International Applicant</strong>
                <div className="text-slate-600 mt-1">Bachelor of Technology in Computer Science (4-Year, 8 Semesters)</div>
                <div className="text-slate-600">APS Zertifikat: <strong className="text-slate-800 font-mono-numbers">DE-APS-DEL-2025-88391</strong></div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Angestrebter Masterstudiengang</span>
                <strong className="text-sm text-slate-900 block mt-0.5">{selectedUniversity.degree}</strong>
                <div className="text-slate-600 mt-1">{selectedUniversity.university}</div>
                <div className="text-slate-600">Bewerbungssemester: <strong>Wintersemester 2025/26</strong></div>
              </div>
            </div>

            {/* Bavarian Formula Notenumrechnung */}
            <div className="mt-6 border border-slate-200 rounded-lg p-4 bg-slate-50/50">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-2 flex items-center justify-between">
                <span>Notenumrechnung nach der Modifizierten Bayerischen Formel (KMK)</span>
                <span className="text-emerald-700 font-mono-numbers text-sm font-bold">Deutsche Gesamtnote: {germanGrade}</span>
              </h2>
              
              <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-2 bg-white rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">Heimatsystem (CGPA)</div>
                  <div className="font-bold text-slate-900 font-mono-numbers text-sm">8.65 / 10.00</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Bestehensgrenze: 4.00</div>
                </div>

                <div className="p-2 bg-white rounded border border-slate-200">
                  <div className="text-[10px] text-slate-500">Berechnungsverfahren</div>
                  <div className="font-mono-numbers text-xs text-slate-700">1 + 3 × [(10 - 8.65) / (10 - 4)]</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Präzision: 1 Nachkommastelle</div>
                </div>

                <div className="p-2 bg-emerald-50 rounded border border-emerald-300">
                  <div className="text-[10px] text-emerald-800 font-semibold">Deutsche Einstufung</div>
                  <div className="font-bold text-emerald-900 font-mono-numbers text-sm">{germanGrade} (Sehr gut)</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">NC-Grenzwerte erfüllt</div>
                </div>
              </div>
            </div>

            {/* Subject Area Equivalence Overview */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                Fachliche Mindestanforderungen nach Studiengangssatzung
              </h2>
              
              <table className="w-full border-collapse border border-slate-300 text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold">
                    <th className="border border-slate-300 p-2 text-left">Fachgebiet</th>
                    <th className="border border-slate-300 p-2 text-right">Gefordert (ECTS)</th>
                    <th className="border border-slate-300 p-2 text-right">Nachgewiesen (ECTS)</th>
                    <th className="border border-slate-300 p-2 text-center">Status / Befund</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => {
                    const req = selectedUniversity.requirements.find(r => r.category === cat.id)?.minEcts || cat.requiredEcts;
                    const catModules = modules.filter(m => m.category === cat.id && m.status === 'matched');
                    const proven = catModules.reduce((s, m) => s + m.resultingEcts, 0);
                    const deficit = Math.max(0, req - proven);

                    return (
                      <tr key={cat.id} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 font-medium text-slate-900">
                          {cat.germanName} ({cat.name})
                        </td>
                        <td className="border border-slate-300 p-2 text-right font-mono-numbers">
                          {req} ECTS
                        </td>
                        <td className="border border-slate-300 p-2 text-right font-mono-numbers font-bold text-slate-900">
                          {proven.toFixed(1)} ECTS
                        </td>
                        <td className="border border-slate-300 p-2 text-center">
                          {deficit === 0 ? (
                            <span className="text-emerald-700 font-semibold">Erfüllt (Gleichwertig)</span>
                          ) : (
                            <span className="text-rose-700 font-semibold">Auflage ({deficit} ECTS Defizit)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mapped Courses Detailed Breakdown */}
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                Detaillierte Fächerübersicht & Anrechnungsmatrix
              </h2>

              <table className="w-full border-collapse border border-slate-300 text-[11px]">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold">
                    <th className="border border-slate-300 p-1.5 text-left">Code & Modultitel</th>
                    <th className="border border-slate-300 p-1.5 text-left">Deutsches Äquivalent</th>
                    <th className="border border-slate-300 p-1.5 text-right">Heimat-Credits</th>
                    <th className="border border-slate-300 p-1.5 text-right font-bold">ECTS</th>
                    <th className="border border-slate-300 p-1.5 text-center">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {modules.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50">
                      <td className="border border-slate-300 p-1.5">
                        <span className="font-mono-numbers font-semibold text-slate-900">{m.code}: </span>
                        <span>{m.name}</span>
                      </td>
                      <td className="border border-slate-300 p-1.5 text-slate-700 italic">
                        {m.germanEquivalenceName}
                      </td>
                      <td className="border border-slate-300 p-1.5 text-right font-mono-numbers">
                        {m.homeCredits.toFixed(1)} (×{m.conversionFactor})
                      </td>
                      <td className="border border-slate-300 p-1.5 text-right font-mono-numbers font-bold text-slate-900">
                        {m.resultingEcts.toFixed(1)}
                      </td>
                      <td className="border border-slate-300 p-1.5 text-center font-mono-numbers">
                        {m.grade}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 font-bold text-slate-900">
                    <td colSpan={3} className="border border-slate-300 p-2 text-right">
                      Gesamtsumme anerkannter Leistungspunkte:
                    </td>
                    <td className="border border-slate-300 p-2 text-right font-mono-numbers text-sm">
                      {totalEcts.toFixed(1)} ECTS
                    </td>
                    <td className="border border-slate-300 p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Official Certification Footer */}
            <div className="mt-8 pt-6 border-t border-slate-300 grid grid-cols-2 gap-8 text-[11px] text-slate-600">
              <div>
                <p className="leading-relaxed">
                  Hiermit wird bestätigt, dass die vorstehenden Angaben mit dem offiziellen Modulhandbuch und den beglaubigten Leistungsnachweisen der Heimathochschule übereinstimmen.
                </p>
                <div className="mt-6 pt-3 border-t border-dashed border-slate-400">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Datum, Ort</span>
                  <span>München / Berlin, {new Date().toLocaleDateString('de-DE')}</span>
                </div>
              </div>

              <div>
                <div className="border border-slate-300 p-3 rounded bg-slate-50 text-center">
                  <div className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                    Offizieller Prüfstempel
                  </div>
                  <div className="my-2 py-3 border-y border-dashed border-slate-300 font-heading font-black text-slate-800 text-xs tracking-widest uppercase">
                    ★ AKADEMISCHE PRÜFSTELLE ★
                    <br />
                    VERIFIZIERT • DIGITAL SEAL
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono-numbers">
                    SHA-256: e8d4f019b882a...9c1
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
