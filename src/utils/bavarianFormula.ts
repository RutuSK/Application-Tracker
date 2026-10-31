/**
 * Standard Modified Bavarian Formula (Modifizierte Bayerische Formel)
 * Enforced by the German Standing Conference of Ministers of Education (KMK)
 * 
 * N = 1 + 3 * ((Nmax - Nd) / (Nmax - Nmin))
 * 
 * Where:
 * Nmax = Maximum possible grade/score in home grading system
 * Nmin = Lowest passing grade/score in home grading system
 * Nd   = Applicant's obtained average grade/CGPA
 * N    = Resulting German Grade (1.0 is best, 4.0 is minimum pass, >4.0 fail)
 */

export interface BavarianCalculationResult {
  germanGrade: number;
  formattedGrade: string;
  classification: {
    germanText: string;
    englishText: string;
    color: string;
    badgeStyle: 'emerald' | 'cobalt' | 'amber' | 'crimson';
  };
  stepByStep: {
    nMax: number;
    nMin: number;
    nObtained: number;
    range: number;
    difference: number;
    ratio: number;
    rawGrade: number;
  };
}

export function calculateBavarianGrade(
  nMax: number,
  nMin: number,
  nObtained: number
): BavarianCalculationResult {
  // Boundary safety
  const safeNMax = Math.max(nMax, nMin + 0.01);
  const safeNd = Math.min(Math.max(nObtained, nMin), safeNMax);
  
  const range = safeNMax - nMin;
  const difference = safeNMax - safeNd;
  const ratio = range > 0 ? difference / range : 0;
  
  // Standard KMK formula
  const rawGrade = 1 + 3 * ratio;
  // Round to one decimal place according to German university standards (e.g., 1.3, 1.7, 2.0)
  const roundedGrade = Math.round(rawGrade * 10) / 10;
  
  // German grade classifications
  let germanText = 'Sehr gut';
  let englishText = 'Excellent';
  let color = '#10B981';
  let badgeStyle: 'emerald' | 'cobalt' | 'amber' | 'crimson' = 'emerald';

  if (roundedGrade <= 1.5) {
    germanText = 'Sehr gut (1.0 – 1.5)';
    englishText = 'Excellent (Top admission competitiveness)';
    color = '#10B981';
    badgeStyle = 'emerald';
  } else if (roundedGrade <= 2.5) {
    germanText = 'Gut (1.6 – 2.5)';
    englishText = 'Good (Solid NC competitiveness)';
    color = '#3B82F6';
    badgeStyle = 'cobalt';
  } else if (roundedGrade <= 3.5) {
    germanText = 'Befriedigend (2.6 – 3.5)';
    englishText = 'Satisfactory (Restricted admissions likely)';
    color = '#F59E0B';
    badgeStyle = 'amber';
  } else if (roundedGrade <= 4.0) {
    germanText = 'Ausreichend (3.6 – 4.0)';
    englishText = 'Sufficient (Minimum pass threshold)';
    color = '#F59E0B';
    badgeStyle = 'amber';
  } else {
    germanText = 'Nicht ausreichend (> 4.0)';
    englishText = 'Ineligible (Below German passing grade)';
    color = '#EF4444';
    badgeStyle = 'crimson';
  }

  return {
    germanGrade: roundedGrade,
    formattedGrade: roundedGrade.toFixed(1),
    classification: {
      germanText,
      englishText,
      color,
      badgeStyle
    },
    stepByStep: {
      nMax: safeNMax,
      nMin,
      nObtained: safeNd,
      range,
      difference,
      ratio,
      rawGrade
    }
  };
}

export const COMMON_GRADING_SCALES = [
  {
    id: 'india-10',
    name: 'India: 10-Point CGPA (VTU, Mumbai, Pune, Anna Univ, IITs, NITs)',
    nMax: 10.0,
    nMin: 4.0,
    defaultScore: 8.65,
    note: 'Lowest passing grade typically 4.0 (40%) or 5.0 (50%) depending on university regulation.'
  },
  {
    id: 'us-4',
    name: 'US / Canada: 4.0 GPA Scale',
    nMax: 4.0,
    nMin: 2.0,
    defaultScore: 3.65,
    note: 'Undergraduate pass mark is commonly C (2.0) or D (1.0). Default set to 2.0.'
  },
  {
    id: 'percentage-100',
    name: 'Percentage Scale (Out of 100%)',
    nMax: 100,
    nMin: 40,
    defaultScore: 78.5,
    note: 'Standard university passing mark is 40% (or 50% for 1st Class).'
  },
  {
    id: 'uk-honours',
    name: 'UK Honours Degree Scale',
    nMax: 80,
    nMin: 40,
    defaultScore: 68,
    note: 'First class 70+, Upper second (2:1) 60-69, Pass 40.'
  },
  {
    id: 'custom',
    name: 'Custom Grading Scale',
    nMax: 10.0,
    nMin: 4.0,
    defaultScore: 8.0,
    note: 'Set exact maximum and minimum passing scores per your official transcript.'
  }
];
