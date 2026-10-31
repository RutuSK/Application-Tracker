export type SubjectCategory = 
  | 'math'
  | 'theory'
  | 'systems'
  | 'software'
  | 'electives';

export interface CourseModule {
  id: string;
  code: string;
  name: string;
  category: SubjectCategory;
  homeCredits: number;
  conversionFactor: number;
  resultingEcts: number;
  germanEquivalenceName: string;
  status: 'matched' | 'review' | 'deficit';
  syllabusMatchConfidence: number; // percentage
  grade: string;
  syllabusSnippet?: string;
}

export interface CategoryRequirement {
  id: SubjectCategory;
  name: string;
  germanName: string;
  requiredEcts: number;
  description: string;
  color: string;
  typicalModules: string[];
}

export interface UniversityProgram {
  id: string;
  university: string;
  shortName: string;
  degree: string;
  location: string;
  ncCutoff: number; // Bavarian formula cutoff
  applicationDeadline: string;
  deadlineWarningDays: number;
  portal: 'uni-assist (VPD)' | 'Direct Portal' | 'uni-assist (Direct)';
  tuitionFee: string;
  languageReq: string;
  requirements: {
    category: SubjectCategory;
    minEcts: number;
  }[];
  notes: string;
  admissionFormula: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  germanName: string;
  category: 'academic' | 'identity' | 'language' | 'administrative';
  isUploaded: boolean;
  status: 'verified' | 'pending' | 'review_needed' | 'missing';
  validationMessage: string;
  timestamp: string;
  fileSize?: string;
  mandatory: boolean;
  details: string;
}

export interface ApsStage {
  id: number;
  title: string;
  germanTitle: string;
  status: 'completed' | 'in_progress' | 'pending';
  date: string;
  description: string;
  details: string[];
}
