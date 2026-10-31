import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  BookOpen, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { CourseModule, UniversityProgram } from '../types/academic';

interface AiCopilotProps {
  selectedUniversity: UniversityProgram;
  germanGrade: string;
  modules: CourseModule[];
  totalDeficit: number;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  badges?: string[];
}

export const AiCopilot: React.FC<AiCopilotProps> = ({
  selectedUniversity,
  germanGrade,
  modules,
  totalDeficit
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Guten Tag! I am your Academic Precision Advisor for German Master's Admissions. I have analyzed your transcript of ${modules.length} mapped courses against ${selectedUniversity.shortName} (${selectedUniversity.degree}). Your converted German GPA is ${germanGrade} (Sehr gut), with a total subject deficit of ${totalDeficit} ECTS. How can I assist you with ECTS mapping, syllabus defense, or APS / uni-assist submission today?`,
      timestamp: 'Just now',
      badges: ['KMK Compliant', 'FPSO Analyzed']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const samplePrompts = [
    `Analyze ${selectedUniversity.shortName} TCS Deficit & Strategy`,
    'How can I bridge missing Theoretical ECTS before deadline?',
    'Draft an APS Registrar Verification Follow-up Letter',
    'Compare uni-assist VPD requirements vs Direct Application',
    `Calculate Bavarian Grade breakdown for 8.65 / 10 CGPA`,
    'What syllabus topics does TUM require for Algorithm Equivalence?'
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateAcademicResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('deficit') || q.includes('theoretical') || q.includes('tcs') || q.includes('bridge')) {
      return `### Curricular Analysis & ECTS Deficit Mitigation Strategy

**Current Status for ${selectedUniversity.shortName} (${selectedUniversity.degree}):**
- **Theoretical Computer Science Requirement:** 24–28 ECTS (depending on TUM vs RWTH)
- **Your Verified TCS Credits:** 18 ECTS (via Algorithms, Automata Theory, and Compiler Design)
- **Net Deficit:** Approximately 6 to 10 ECTS in formal logic, computability, or complexity theory.

**Actionable Steps to Mitigate:**
1. **Coursework Regrouping:** Check if your Discrete Mathematics (CS204) or Mathematical Logic courses can be partially allocated under Theoretical CS rather than pure Mathematics in your Curricularanalyse form. German examination boards (Prüfungsausschuss) accept cross-listed theoretical modules.
2. **Supplemental Bachelor Exams (Auflagen):** Under German higher education law (e.g. TUM FPSO § 36), if your deficit is **under 30 ECTS**, the admissions committee will NOT reject you outright. Instead, they will issue **conditional admission with Auflagen** (up to 2 bachelor exams, typically *Grundlagen: Algorithmen und Datenstrukturen* or *Theoretische Informatik 1*), which you must pass within your first year of master's studies.
3. **Syllabus Deep-Dive:** Submit the official Modulhandbuch with weekly lecture hour breakdown showing rigorous formal proof content (Turing machines, Rice's Theorem, NP-Completeness).`;
    }

    if (q.includes('aps') || q.includes('registrar') || q.includes('letter')) {
      return `### Official Follow-Up Template: University Registrar & Professor Verification for APS

**Subject:** URGENT: Academic Verification Request for APS India / German Embassy (Ref: IND-APS-2024-91482)

**Dear Professor / Controller of Examinations,**

I am writing with respect to my ongoing application for post-graduate admission to German public universities for the upcoming Wintersemester.

The Academic Evaluation Centre (Akademische Prüfstelle - APS) of the German Embassy has initiated an institutional verification process for my degree credentials (B.Tech Computer Science & Engineering, Roll No: [Your Roll Number], Graduating Year: 2024).

Could you kindly check your official institutional email inbox (@univ.ac.in) for a communication received from **info@aps-india.de** or the German Embassy verification wing, and provide the requested confirmation of my consolidated grade sheets and degree conferral?

**Applicant Details:**
- Full Name: [Applicant Full Name]
- Degree: Bachelor of Technology (CSE)
- APS Registration ID: IND-APS-2024-91482
- Passport Number: [Your Passport No]

Your swift response is crucial to ensure certificate issuance within the Embassy's statutory window. Thank you for your support.

Sincerely,  
[Your Name]`;
    }

    if (q.includes('vpd') || q.includes('uni-assist') || q.includes('portal')) {
      return `### uni-assist Preliminary Review Documentation (VPD) Protocol

**How uni-assist VPD Functions:**
1. **Who requires VPD?**
   - **TU Berlin, LMU Munich, and University of Stuttgart** mandate a **VPD (Vorprüfungsdokumentation)** issued by uni-assist e.V. before you can finalize your direct portal application.
   - **TUM and RWTH Aachen** run independent direct portals (TUMonline and RWTHonline) but require your verified APS certificate and Curricularanalyse matrix.
2. **Processing Timelines:**
   - Standard uni-assist processing time is **4 to 6 weeks** from payment and document receipt.
   - Because Berlin's deadline is **May 15**, your uni-assist file MUST be submitted and paid no later than **April 1**.
3. **Certified True Copies:**
   - Since the rollout of digital APS certificates with QR validation, digital color scans of your transcripts and degree are accepted directly in the uni-assist MyAssist online portal without needing physical postal mailing.`;
    }

    if (q.includes('bavarian') || q.includes('gpa') || q.includes('cgpa')) {
      return `### Modified Bavarian Formula Breakdown

**Official Standing Conference of Ministers (KMK) Formula:**
$$\\text{German Grade} = 1 + 3 \\times \\frac{N_{\\max} - N_d}{N_{\\max} - N_{\\min}}$$

For an Indian 10-point CGPA grading system:
- **Maximum Possible Score ($N_{\\max}$):** 10.0
- **Lowest Passing Score ($N_{\\min}$):** 4.0 (or 5.0 for autonomous institutions requiring 50%)
- **Your Score ($N_d$):** 8.65 CGPA

**Step-by-step:**
1. Range = $10.0 - 4.0 = 6.0$
2. Difference = $10.0 - 8.65 = 1.35$
3. Ratio = $1.35 / 6.0 = 0.225$
4. Result = $1 + 3 \\times 0.225 = 1 + 0.675 = \\mathbf{1.675}$
5. **German Grade:** **1.6 to 1.7 (Gut / Very competitive)**

A grade of 1.4–1.7 places you in the top tier for TU9 computer science Master's programs, well above the typical 2.0 NC cutoff!`;
    }

    return `### Academic Precision Analysis for ${selectedUniversity.shortName}

Based on your transcript records and the examination regulations (FPSO) for ${selectedUniversity.degree}:

1. **Academic Standing:** Your German equivalent grade of **${germanGrade}** meets the primary academic filter.
2. **ECTS Mapping:** You have mapped **${modules.length} modules** yielding **${modules.reduce((s, m) => s + m.resultingEcts, 0).toFixed(1)} ECTS**.
3. **Key Advice:** For German Master's admissions, admissions committees evaluate *content identity* (Inhaltliche Gleichwertigkeit) rather than just course titles. Ensure that your uploaded course handbook (Modulhandbuch) contains syllabus hours, textbook references (e.g., Cormen, Hopcroft & Ullman, Tanenbaum), and practical laboratory contact hours.`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    setTimeout(() => {
      const responseText = generateAcademicResponse(query);
      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: responseText,
        timestamp: 'Just now',
        badges: ['German Admissions Specialist', 'Verified KMK Source']
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] shadow-xl flex flex-col h-[750px] overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/[0.08] bg-[#171f33] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white font-heading">
                Academic Precision Co-Pilot
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active</span>
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Specialized reasoning on ECTS equivalence, Bavarian GPA, and German admissions law
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block text-xs font-mono-numbers text-slate-400">
          <div>Active Target: <span className="text-white font-semibold">{selectedUniversity.shortName}</span></div>
          <div>Converted GPA: <span className="text-emerald-400 font-semibold">{germanGrade}</span></div>
        </div>
      </div>

      {/* Suggested Prompt Chips (per design spec: horizontal scrolling pill chips with cobalt focus rings) */}
      <div className="p-3 bg-[#0F172A]/90 border-b border-white/[0.04] overflow-x-auto no-scrollbar flex items-center space-x-2">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap pl-1">
          Quick Prompts:
        </span>
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#1E293B] text-slate-300 border border-slate-700 hover:border-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap transition-all cursor-pointer shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message History Area */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isAi ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isAi 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Box */}
              <div className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-2 border ${
                isAi 
                  ? 'bg-[#0F172A] border-white/[0.08] text-slate-200' 
                  : 'bg-blue-600 text-white border-blue-500 font-medium'
              }`}>
                {/* AI badges if any */}
                {isAi && msg.badges && (
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06] mb-2 text-[10px] text-slate-400">
                    <div className="flex items-center space-x-2">
                      {msg.badges.map((b, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono-numbers">
                          {b}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-white flex items-center space-x-1 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Body Text */}
                <div className="whitespace-pre-wrap font-sans text-[13px] leading-relaxed">
                  {msg.text}
                </div>

                <div className={`text-[10px] pt-1 text-right font-mono-numbers ${
                  isAi ? 'text-slate-500' : 'text-blue-200'
                }`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-[#0F172A] p-3 rounded-xl border border-white/[0.08] flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>Consulting KMK regulations & German university admissions ordinances...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form per spec: High-contrast field #0F172A with cobalt focus ring */}
      <div className="p-4 border-t border-white/[0.08] bg-[#171f33]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask anything about ECTS calculation, Bavarian GPA, APS verification, or university FPSO..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
