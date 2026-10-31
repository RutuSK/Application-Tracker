export type FieldOfStudy =
  | 'Computer Science & Software'
  | 'Data Science & Artificial Intelligence'
  | 'Mechanical & Automotive Engineering'
  | 'Electrical Engineering & Embedded Systems'
  | 'Renewable Energy & Environmental Tech'
  | 'Biotechnology & Biomedical Engineering'
  | 'Industrial Engineering & Management'
  | 'Physics & Materials Science'
  | 'Robotics & Autonomous Systems';

export type UniversityType = 
  | 'Technical University (TU9 / Research)'
  | 'Comprehensive University'
  | 'University of Applied Sciences (HAW / FH)';

export interface DaadCourse {
  id: string;
  courseName: string;
  germanName: string;
  university: string;
  shortName: string;
  universityType: UniversityType;
  city: string;
  federalState: string;
  degree: string; // e.g. "Master of Science (M.Sc.)"
  fieldOfStudy: FieldOfStudy;
  tuitionFee: string; // e.g. "None (€0 / semester, approx. €310 semester fee)"
  isTuitionFree: boolean;
  courseLanguage: 'English 100%' | 'German' | 'Bilingual (EN/DE)';
  minIelts: number;
  minToefl: number;
  durationSemesters: number;
  intake: 'Wintersemester' | 'Sommersemester' | 'Winter & Summer';
  applicationDeadlineNonEu: string;
  deadlineWarningDays: number;
  portalType: 'uni-assist (VPD)' | 'uni-assist (Direct)' | 'University Direct Portal';
  ncCutoff: number; // Bavarian formula grade benchmark (e.g. 1.8)
  greRequired: 'Mandatory for Non-EU' | 'Recommended' | 'Not Required';
  workExpRequiredMonths: number;
  portfolioRequired: boolean;
  requiredBackground: string[];
  ectsPrerequisites: {
    category: string;
    minEcts: number;
    description: string;
  }[];
  overview: string;
  careerOutcomes: string;
  officialUrl: string;
  daadProgramId: string;
}

export interface UserCandidateProfile {
  fullName: string;
  currentDegree: string; // e.g. "Bachelor of Technology in Computer Science & Engineering"
  homeGradingScale: 'india-10' | 'us-4' | 'percentage-100' | 'custom';
  cgpaObtained: number; // e.g. 8.65
  maxGpa: number; // e.g. 10.0
  minPassGpa: number; // e.g. 4.0
  bavarianGpa: number; // calculated e.g. 1.4
  ieltsScore: number; // e.g. 7.5
  toeflScore?: number;
  germanLevel: 'None' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  greScore?: {
    total: number; // e.g. 320
    quant: number; // e.g. 165
    verbal: number; // e.g. 155
    awa: number; // e.g. 4.0
  };
  workExpMonths: number;
  portfolioUrl?: string;
  githubUrl?: string;
  cvFileName?: string;
  cvSummary: string;
  keySkills: string[];
  majorField: FieldOfStudy;
}

export interface EligibilityResult {
  overallScore: number; // 0 - 100%
  verdict: 'High Chance (Direct Admit)' | 'Competitive (Stage 2 Assessment)' | 'Borderline (Auflagen Expected)' | 'Low Chance / High Deficit' | 'Ineligible (Hard Requirement Missed)';
  verdictColor: string;
  breakdown: {
    criterion: string;
    status: 'passed' | 'warning' | 'failed';
    studentValue: string;
    requiredValue: string;
    details: string;
  }[];
  remedyActionPlan: string[];
}

export type ApplicationStage = 
  | 'Shortlisted'
  | 'Preparing Documents / VPD'
  | 'Application Submitted'
  | 'Under Examination Board Review'
  | 'Interview / Aptitude Test'
  | 'Admission Offer (Zulassung)'
  | 'Conditional Admit (Auflagen)'
  | 'Enrolled / Visa Phase';

export interface ApplicationTrackerItem {
  id: string;
  courseId: string;
  courseName: string;
  university: string;
  shortName: string;
  city: string;
  degree: string;
  stage: ApplicationStage;
  portal: string;
  portalApplicationId?: string;
  deadline: string;
  appliedDate?: string;
  vpdStatus?: 'Not Needed' | 'Applied at uni-assist' | 'VPD Issued' | 'Pending Payment';
  apsCertificateAttached: boolean;
  notes: string;
  nextTaskDeadline: string;
  tasks: {
    id: string;
    text: string;
    completed: boolean;
  }[];
}
