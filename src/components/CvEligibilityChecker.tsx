import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Upload, 
  User, 
  GraduationCap, 
  Calculator, 
  ShieldCheck, 
  Briefcase, 
  Globe, 
  Code, 
  ArrowRight,
  BookOpen,
  Award,
  RefreshCw,
  Edit3,
  ExternalLink
} from 'lucide-react';
import { DaadCourse, UserCandidateProfile, EligibilityResult } from '../types/daad';
import { evaluateCourseEligibility } from '../utils/eligibilityEngine';
import { calculateBavarianGrade } from '../utils/bavarianFormula';

interface CvEligibilityCheckerProps {
  candidateProfile: UserCandidateProfile;
  onUpdateProfile: (updated: UserCandidateProfile) => void;
  courses: DaadCourse[];
  selectedCourse: DaadCourse;
  onSelectCourse: (course: DaadCourse) => void;
  onAddToTracker: (course: DaadCourse) => void;
  isApplied: boolean;
}

export const CvEligibilityChecker: React.FC<CvEligibilityCheckerProps> = ({
  candidateProfile,
  onUpdateProfile,
  courses,
  selectedCourse,
  onSelectCourse,
  onAddToTracker,
  isApplied
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserCandidateProfile>(candidateProfile);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Compute live eligibility
  const eligibility = evaluateCourseEligibility(candidateProfile, selectedCourse);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Recalculate Bavarian GPA if scores changed
    const calc = calculateBavarianGrade(tempProfile.maxGpa, tempProfile.minPassGpa, tempProfile.cgpaObtained);
    const updated = {
      ...tempProfile,
      bavarianGpa: calc.germanGrade
    };
    onUpdateProfile(updated);
    setIsEditingProfile(false);
  };

  const handleSimulatedCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSimulatingUpload(true);
    setUploadSuccessMessage(null);

    setTimeout(() => {
      setIsSimulatingUpload(false);
      setUploadSuccessMessage(`Successfully parsed "${file.name}": Extracted 18 Months Experience, B.Tech CSE, and 8 Key Technical Competencies.`);
      onUpdateProfile({
        ...candidateProfile,
        cvFileName: file.name
      });
    }, 800);
  };

  const getStatusIcon = (status: 'passed' | 'warning' | 'failed') => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-rose-400 shrink-0" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Profile & Portfolio Engine</span>
              </span>
              <span className="text-xs text-slate-400 font-mono-numbers">
                Multi-Factor German Admissions Audit
              </span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading">
              CV, Portfolio & Transcripts Eligibility Scanner
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              German university admissions committees assess your degree based on legal criteria (FPSO): academic grade conversion via the Bavarian formula, theoretical ECTS prerequisites, language certifications, and relevant research or industry portfolios.
            </p>
          </div>

          {/* Target Course Selector Dropdown */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 space-y-2 min-w-[280px]">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
              Active Evaluation Target
            </span>
            <select
              value={selectedCourse.id}
              onChange={(e) => {
                const found = courses.find(c => c.id === e.target.value);
                if (found) onSelectCourse(found);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.shortName} – {c.courseName}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>NC: <strong className="text-white font-mono-numbers">~{selectedCourse.ncCutoff.toFixed(1)}</strong></span>
              <span>Language: <strong className="text-emerald-400">{selectedCourse.courseLanguage}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Candidate Profile (Left 5 cols) & Deep Eligibility Audit (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Candidate CV & Portfolio Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">
                    {candidateProfile.fullName}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Applicant Dossier & Credentials
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setTempProfile(candidateProfile);
                  setIsEditingProfile(!isEditingProfile);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors text-xs flex items-center space-x-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>

            {/* Profile Edit Mode */}
            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={tempProfile.fullName}
                    onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded p-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Undergraduate Degree Title</label>
                  <input
                    type="text"
                    value={tempProfile.currentDegree}
                    onChange={(e) => setTempProfile({ ...tempProfile, currentDegree: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded p-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">CGPA / Score</label>
                    <input
                      type="number"
                      step="0.01"
                      value={tempProfile.cgpaObtained}
                      onChange={(e) => setTempProfile({ ...tempProfile, cgpaObtained: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white font-mono-numbers"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Max Scale</label>
                    <input
                      type="number"
                      value={tempProfile.maxGpa}
                      onChange={(e) => setTempProfile({ ...tempProfile, maxGpa: parseFloat(e.target.value) || 10 })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white font-mono-numbers"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Pass Mark</label>
                    <input
                      type="number"
                      value={tempProfile.minPassGpa}
                      onChange={(e) => setTempProfile({ ...tempProfile, minPassGpa: parseFloat(e.target.value) || 4 })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white font-mono-numbers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">IELTS Band</label>
                    <input
                      type="number"
                      step="0.5"
                      value={tempProfile.ieltsScore}
                      onChange={(e) => setTempProfile({ ...tempProfile, ieltsScore: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white font-mono-numbers"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">German CEFR</label>
                    <select
                      value={tempProfile.germanLevel}
                      onChange={(e) => setTempProfile({ ...tempProfile, germanLevel: e.target.value as any })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white"
                    >
                      <option value="None">None</option>
                      <option value="A1">A1 Beginner</option>
                      <option value="A2">A2 Elementary</option>
                      <option value="B1">B1 Intermediate</option>
                      <option value="B2">B2 Vantage</option>
                      <option value="C1">C1 Proficient</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Work Exp (Months)</label>
                    <input
                      type="number"
                      value={tempProfile.workExpMonths}
                      onChange={(e) => setTempProfile({ ...tempProfile, workExpMonths: parseInt(e.target.value) || 0 })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white font-mono-numbers"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">GRE Quant Score</label>
                    <input
                      type="number"
                      value={tempProfile.greScore?.quant || 165}
                      onChange={(e) => setTempProfile({ 
                        ...tempProfile, 
                        greScore: { 
                          total: (tempProfile.greScore?.verbal || 155) + (parseInt(e.target.value) || 160),
                          quant: parseInt(e.target.value) || 160,
                          verbal: tempProfile.greScore?.verbal || 155,
                          awa: 4.0
                        } 
                      })}
                      className="w-full bg-[#0F172A] border border-slate-700 rounded p-1.5 text-white font-mono-numbers"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Portfolio or GitHub URL</label>
                  <input
                    type="url"
                    value={tempProfile.portfolioUrl || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, portfolioUrl: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded p-2 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Recalculate & Save Profile
                </button>
              </form>
            ) : (
              /* Profile Display Mode */
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Undergraduate Qualification</span>
                  <strong className="text-white text-xs block mt-0.5">{candidateProfile.currentDegree}</strong>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#0F172A] p-3 rounded-lg border border-slate-800 font-mono-numbers">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Home CGPA</span>
                    <strong className="text-white">{candidateProfile.cgpaObtained.toFixed(2)} / {candidateProfile.maxGpa}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">German Grade (Bavarian)</span>
                    <strong className="text-emerald-400 font-bold">{candidateProfile.bavarianGpa.toFixed(1)} (Sehr gut)</strong>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#0F172A] p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">IELTS</span>
                    <strong className="text-white font-mono-numbers">{candidateProfile.ieltsScore}</strong>
                  </div>
                  <div className="bg-[#0F172A] p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">GRE Quant</span>
                    <strong className="text-white font-mono-numbers">{candidateProfile.greScore?.quant || 'N/A'}</strong>
                  </div>
                  <div className="bg-[#0F172A] p-2.5 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">German</span>
                    <strong className="text-white">{candidateProfile.germanLevel}</strong>
                  </div>
                </div>

                {/* CV Summary & Portfolio */}
                <div className="p-3 bg-[#0F172A] rounded-lg border border-slate-800 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    CV & Research Profile Summary
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {candidateProfile.cvSummary}
                  </p>
                  
                  {candidateProfile.portfolioUrl && (
                    <a
                      href={candidateProfile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center space-x-1 pt-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>{candidateProfile.portfolioUrl}</span>
                    </a>
                  )}
                </div>

                {/* Key Skills Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Verified Competency Areas
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {candidateProfile.keySkills.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CV Upload Parser */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">
                    Upload or Update CV Document (PDF / DOCX):
                  </label>
                  <label className="flex items-center justify-center space-x-2 w-full p-2.5 rounded-lg border border-dashed border-slate-600 hover:border-blue-500 bg-[#0F172A] hover:bg-slate-900 cursor-pointer transition-colors text-xs text-slate-300">
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>{candidateProfile.cvFileName || 'Select CV file to parse'}</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleSimulatedCvUpload}
                      className="hidden"
                    />
                  </label>

                  {isSimulatingUpload && (
                    <div className="mt-2 text-[11px] text-blue-400 flex items-center space-x-1.5 animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Extracting academic modules, grades, and thesis keywords...</span>
                    </div>
                  )}

                  {uploadSuccessMessage && (
                    <div className="mt-2 text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                      {uploadSuccessMessage}
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

        {/* Right Column: Deep Multi-Factor Eligibility Audit */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Main Verdict Card */}
          <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono-numbers">
                  {selectedCourse.shortName} Admissions Board Assessment
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  {selectedCourse.courseName}
                </h3>
                <p className="text-xs text-slate-400 italic">
                  {selectedCourse.germanName}
                </p>
              </div>

              {/* Overall Score Dial */}
              <div className="bg-[#0F172A] p-3.5 rounded-xl border border-slate-800 text-center min-w-[130px] shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Eligibility Score
                </span>
                <div 
                  className="text-3xl font-extrabold font-mono-numbers mt-0.5"
                  style={{ color: eligibility.verdictColor }}
                >
                  {eligibility.overallScore}%
                </div>
                <span className="text-[10px] font-semibold block mt-0.5" style={{ color: eligibility.verdictColor }}>
                  {eligibility.verdict.split('(')[0].trim()}
                </span>
              </div>
            </div>

            {/* Criteria Breakdown List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Statutory Admissions Criteria Audit (FPSO Regulations)
              </h4>

              {eligibility.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0F172A] border border-white/[0.06] flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                    <div className="space-y-1">
                      <div className="font-bold text-white">{item.criterion}</div>
                      <div className="text-[11px] text-slate-300 leading-snug">
                        {item.details}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono-numbers flex flex-wrap gap-2 pt-0.5">
                        <span>Your Record: <strong className="text-slate-300">{item.studentValue}</strong></span>
                        <span>•</span>
                        <span>Official Requirement: <strong className="text-slate-300">{item.requiredValue}</strong></span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded shrink-0 font-mono-numbers ${
                    item.status === 'passed' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                      : item.status === 'warning'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Strategic Action Plan for this university */}
            <div className="p-4 rounded-xl bg-[#0F172A] border border-blue-500/20 space-y-2 text-xs">
              <span className="font-bold text-blue-400 flex items-center space-x-1.5 text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Admissions Board Strategy & Deficit Mitigation:</span>
              </span>
              <ul className="space-y-1.5 text-slate-300 pl-1">
                {eligibility.remedyActionPlan.map((plan, i) => (
                  <li key={i} className="flex items-start space-x-2 text-[11px] leading-relaxed">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tracker Call To Action */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-400 font-mono-numbers">
                Application Deadline: <strong className="text-amber-400">{selectedCourse.applicationDeadlineNonEu}</strong> ({selectedCourse.deadlineWarningDays} days left)
              </div>

              <button
                onClick={() => onAddToTracker(selectedCourse)}
                disabled={isApplied}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-md ${
                  isApplied
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Added to Application Tracker</span>
                  </>
                ) : (
                  <>
                    <span>Add to My Application Tracker</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
