import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Euro, 
  Calendar, 
  Globe2, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  PlusCircle, 
  SlidersHorizontal,
  ChevronDown,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { DaadCourse, FieldOfStudy, UserCandidateProfile } from '../types/daad';
import { evaluateCourseEligibility } from '../utils/eligibilityEngine';

interface DaadSearchPlatformProps {
  courses: DaadCourse[];
  candidateProfile: UserCandidateProfile;
  onSelectCourseForEligibility: (course: DaadCourse) => void;
  onAddToTracker: (course: DaadCourse) => void;
  appliedCourseIds: string[];
}

export const DaadSearchPlatform: React.FC<DaadSearchPlatformProps> = ({
  courses,
  candidateProfile,
  onSelectCourseForEligibility,
  onAddToTracker,
  appliedCourseIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedTuition, setSelectedTuition] = useState<string>('All');
  const [selectedPortal, setSelectedPortal] = useState<string>('All');
  const [tu9Only, setTu9Only] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'nc' | 'deadline'>('match');
  const [selectedDetailCourse, setSelectedDetailCourse] = useState<DaadCourse | null>(null);

  const fieldsList: string[] = [
    'All',
    'Computer Science & Software',
    'Data Science & Artificial Intelligence',
    'Mechanical & Automotive Engineering',
    'Electrical Engineering & Embedded Systems',
    'Robotics & Autonomous Systems',
    'Renewable Energy & Environmental Tech',
    'Biotechnology & Biomedical Engineering',
    'Industrial Engineering & Management'
  ];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // Search query
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        c.courseName.toLowerCase().includes(q) ||
        c.university.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.germanName.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Field of study
      if (selectedField !== 'All' && c.fieldOfStudy !== selectedField) return false;

      // Language
      if (selectedLanguage !== 'All' && !c.courseLanguage.includes(selectedLanguage)) return false;

      // Tuition
      if (selectedTuition === 'free' && !c.isTuitionFree) return false;
      if (selectedTuition === 'paid' && c.isTuitionFree) return false;

      // Portal
      if (selectedPortal === 'vpd' && !c.portalType.includes('VPD')) return false;
      if (selectedPortal === 'direct' && !c.portalType.includes('Direct')) return false;

      // TU9 filter
      if (tu9Only && !c.universityType.includes('TU9')) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nc') {
        return a.ncCutoff - b.ncCutoff; // lower NC is more competitive
      }
      if (sortBy === 'deadline') {
        return a.deadlineWarningDays - b.deadlineWarningDays;
      }
      // Default: match score
      const scoreA = evaluateCourseEligibility(candidateProfile, a).overallScore;
      const scoreB = evaluateCourseEligibility(candidateProfile, b).overallScore;
      return scoreB - scoreA;
    });
  }, [courses, searchQuery, selectedField, selectedLanguage, selectedTuition, selectedPortal, tu9Only, sortBy, candidateProfile]);

  return (
    <div className="space-y-6">
      
      {/* DAAD Search Hero Banner */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25 flex items-center space-x-1.5">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                <span>DAAD International Programmes Germany</span>
              </span>
              <span className="text-xs text-slate-400 font-mono-numbers">
                Wintersemester 2025/26 Database
              </span>
            </div>
            
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading">
              German Master's Degree Explorer & Automated Eligibility Checker
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore accredited Master of Science, Master of Engineering, and elite international curricula across German public universities. Instant AI analysis matches your CV, transcripts, Bavarian GPA, and ECTS against each faculty's admission criteria.
            </p>
          </div>

          {/* Quick Profile Summary Badge */}
          <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-800 flex items-center space-x-3.5 shadow-lg shrink-0">
            <div className="p-3 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                Active Candidate Profile
              </span>
              <span className="text-sm font-bold text-white">
                {candidateProfile.fullName}
              </span>
              <div className="flex items-center space-x-2 text-xs text-emerald-400 font-mono-numbers mt-0.5">
                <span>German GPA: {candidateProfile.bavarianGpa.toFixed(1)}</span>
                <span>•</span>
                <span>IELTS {candidateProfile.ieltsScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by degree title, subject, university name (e.g., TUM, RWTH, Robotics, Data Science, Stuttgart)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F172A] border border-slate-700 focus:border-blue-500 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-1.5 bg-[#0F172A] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300">
              <span className="text-slate-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="match" className="bg-slate-900 text-white">Best CV Match %</option>
                <option value="nc" className="bg-slate-900 text-white">NC Cutoff (Easiest First)</option>
                <option value="deadline" className="bg-slate-900 text-white">Urgent Deadlines First</option>
              </select>
            </div>

            {/* Quick TU9 filter */}
            <button
              onClick={() => setTu9Only(!tu9Only)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                tu9Only 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-[#0F172A] border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              TU9 Elite Only
            </button>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="mt-4 flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
            Discipline:
          </span>
          {fieldsList.map((field) => {
            const isSelected = selectedField === field;
            return (
              <button
                key={field}
                onClick={() => setSelectedField(field)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-[#0F172A] text-slate-300 border border-slate-800 hover:border-slate-600'
                }`}
              >
                {field}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters row */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
          <span className="text-[11px] font-semibold text-slate-400">Filters:</span>
          
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-[#0F172A] border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Languages</option>
            <option value="English 100%">English 100%</option>
            <option value="German">German</option>
            <option value="Bilingual">Bilingual</option>
          </select>

          <select
            value={selectedTuition}
            onChange={(e) => setSelectedTuition(e.target.value)}
            className="bg-[#0F172A] border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Tuition Types</option>
            <option value="free">Tuition Free (€0)</option>
            <option value="paid">Tuition / Academy Fee</option>
          </select>

          <select
            value={selectedPortal}
            onChange={(e) => setSelectedPortal(e.target.value)}
            className="bg-[#0F172A] border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Portals</option>
            <option value="vpd">uni-assist (VPD)</option>
            <option value="direct">Direct Portal</option>
          </select>

          <span className="ml-auto text-[11px] font-mono-numbers text-slate-400">
            Showing <strong className="text-white">{filteredCourses.length}</strong> accredited programs
          </span>
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const evalResult = evaluateCourseEligibility(candidateProfile, course);
          const isApplied = appliedCourseIds.includes(course.id);
          const isUrgent = course.deadlineWarningDays <= 14;

          return (
            <div
              key={course.id}
              className="bg-[#1E293B] border border-white/[0.08] hover:border-blue-500/50 rounded-xl p-5 shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* University and Type */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider font-mono-numbers">
                      {course.shortName}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug font-heading mt-0.5">
                      {course.courseName}
                    </h3>
                  </div>

                  {/* Match percentage badge */}
                  <div className="text-right shrink-0">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-bold font-mono-numbers flex items-center space-x-1 border"
                      style={{ 
                        backgroundColor: `${evalResult.verdictColor}15`, 
                        color: evalResult.verdictColor,
                        borderColor: `${evalResult.verdictColor}30`
                      }}
                      title={evalResult.verdict}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{evalResult.overallScore}% Fit</span>
                    </span>
                  </div>
                </div>

                {/* Location and German Name */}
                <div className="text-xs text-slate-400 flex items-center space-x-1.5 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{course.city}, {course.federalState}</span>
                </div>

                <div className="text-[11px] text-slate-400 italic mb-3 line-clamp-1">
                  {course.germanName}
                </div>

                {/* Key attribute pills */}
                <div className="flex flex-wrap gap-1.5 text-[11px] mb-4">
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] border border-slate-800 text-slate-300">
                    {course.degree}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] border border-slate-800 text-emerald-400">
                    {course.courseLanguage}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] border border-slate-800 text-slate-300">
                    {course.isTuitionFree ? '€0 Tuition Fee' : 'Tuition Required'}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] border border-slate-800 text-slate-300 font-mono-numbers">
                    NC ~{course.ncCutoff.toFixed(1)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#0F172A] border border-slate-800 text-slate-300 font-mono-numbers">
                    IELTS {course.minIelts}+
                  </span>
                </div>

                {/* Quick eligibility diagnostic status */}
                <div className="p-2.5 rounded-lg bg-[#0F172A] border border-slate-800/80 text-xs mb-4">
                  <div className="flex items-center justify-between font-mono-numbers text-[11px]">
                    <span className="text-slate-400">Profile Verdict:</span>
                    <strong style={{ color: evalResult.verdictColor }}>
                      {evalResult.verdict.split('(')[0].trim()}
                    </strong>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300" 
                      style={{ 
                        width: `${evalResult.overallScore}%`,
                        backgroundColor: evalResult.verdictColor 
                      }} 
                    />
                  </div>
                </div>

                {/* Deadline pill with Amber warning if <=14 days per spec */}
                <div className={`p-2 rounded-lg border text-xs flex items-center justify-between font-mono-numbers mb-4 ${
                  isUrgent 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-semibold' 
                    : 'bg-[#0F172A] border-slate-800 text-slate-400'
                }`}>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Non-EU Deadline: {course.applicationDeadlineNonEu}</span>
                  </span>
                  <span className={isUrgent ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                    ({course.deadlineWarningDays}d)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectCourseForEligibility(course)}
                  className="flex-1 py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer shadow-sm shadow-blue-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Check Eligibility</span>
                </button>

                <button
                  onClick={() => onAddToTracker(course)}
                  disabled={isApplied}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all flex items-center space-x-1 cursor-pointer ${
                    isApplied
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                  title={isApplied ? 'Application in progress' : 'Add to Application Tracker'}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tracking</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Track</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setSelectedDetailCourse(course)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  title="View Course Details & ECTS breakdown"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Course Detail Modal Drawer */}
      {selectedDetailCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#1E293B] border border-white/[0.12] rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            
            <div className="p-5 border-b border-white/[0.08] bg-[#171f33] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono-numbers">
                  {selectedDetailCourse.shortName} • {selectedDetailCourse.universityType}
                </span>
                <h3 className="text-lg font-bold text-white font-heading mt-0.5">
                  {selectedDetailCourse.courseName}
                </h3>
                <p className="text-xs text-slate-400 italic">
                  {selectedDetailCourse.germanName}
                </p>
              </div>
              <button
                onClick={() => setSelectedDetailCourse(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Curriculum Overview
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedDetailCourse.overview}
                </p>
              </div>

              {/* ECTS Prerequisites */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mandatory ECTS Prerequisites (Satzung der Hochschule)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedDetailCourse.ectsPrerequisites.map((req, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#0F172A] border border-slate-800 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span>{req.category}</span>
                        <span className="text-blue-400 font-mono-numbers">{req.minEcts} ECTS</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        {req.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Outcomes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Career Outcomes & Industry Pipeline
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDetailCourse.careerOutcomes}
                </p>
              </div>

              {/* Details table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#0F172A] p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Application Portal</span>
                  <span className="font-semibold text-white">{selectedDetailCourse.portalType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Tuition Fee</span>
                  <span className="font-semibold text-white">{selectedDetailCourse.tuitionFee}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">GRE Policy</span>
                  <span className="font-semibold text-white">{selectedDetailCourse.greRequired}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Standard Duration</span>
                  <span className="font-semibold text-white">{selectedDetailCourse.durationSemesters} Semesters</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.08] bg-[#171f33] flex items-center justify-between">
              <a
                href={selectedDetailCourse.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <span>Official University Faculty Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    onSelectCourseForEligibility(selectedDetailCourse);
                    setSelectedDetailCourse(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Analyze My Eligibility
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
