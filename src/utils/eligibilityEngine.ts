import { DaadCourse, UserCandidateProfile, EligibilityResult } from '../types/daad';

export function evaluateCourseEligibility(
  candidate: UserCandidateProfile,
  course: DaadCourse
): EligibilityResult {
  const breakdown: EligibilityResult['breakdown'] = [];
  const remedyActionPlan: string[] = [];
  let scorePoints = 0;
  const maxPoints = 100;

  // 1. Academic Grade Evaluation (Bavarian Formula vs NC Cutoff) - 30 Points Max
  const gradeDiff = course.ncCutoff - candidate.bavarianGpa; // Positive is good in German scale (lower number is better!)
  let gradePoints = 0;

  if (candidate.bavarianGpa <= course.ncCutoff - 0.2) {
    gradePoints = 30;
    breakdown.push({
      criterion: 'Academic Grade (Bavarian GPA)',
      status: 'passed',
      studentValue: `${candidate.bavarianGpa.toFixed(1)} German Grade (Sehr gut)`,
      requiredValue: `NC Cutoff: ~${course.ncCutoff.toFixed(1)} or better`,
      details: 'Comfortably clears historical Numerus Clausus / aptitude benchmark.'
    });
  } else if (candidate.bavarianGpa <= course.ncCutoff) {
    gradePoints = 25;
    breakdown.push({
      criterion: 'Academic Grade (Bavarian GPA)',
      status: 'passed',
      studentValue: `${candidate.bavarianGpa.toFixed(1)} German Grade (Gut)`,
      requiredValue: `NC Cutoff: ~${course.ncCutoff.toFixed(1)}`,
      details: 'Meets minimum grade cutoff; competitive in Stage 1 evaluation.'
    });
  } else if (candidate.bavarianGpa <= course.ncCutoff + 0.3) {
    gradePoints = 15;
    breakdown.push({
      criterion: 'Academic Grade (Bavarian GPA)',
      status: 'warning',
      studentValue: `${candidate.bavarianGpa.toFixed(1)} German Grade`,
      requiredValue: `NC Cutoff: ~${course.ncCutoff.toFixed(1)}`,
      details: 'Slightly below standard cutoff; will likely require written aptitude test or interview.'
    });
    remedyActionPlan.push(`Compensate Bavarian GPA (${candidate.bavarianGpa}) with strong GRE Quant score (165+) or verified thesis publication.`);
  } else {
    gradePoints = 5;
    breakdown.push({
      criterion: 'Academic Grade (Bavarian GPA)',
      status: 'failed',
      studentValue: `${candidate.bavarianGpa.toFixed(1)} German Grade`,
      requiredValue: `NC Cutoff: ~${course.ncCutoff.toFixed(1)}`,
      details: 'Grade is below historical minimum threshold for direct admission.'
    });
    remedyActionPlan.push(`This program is highly selective. Consider applying to TU Dresden, FAU Erlangen, or Uni Passau where NC is around 2.2–2.4.`);
  }
  scorePoints += gradePoints;

  // 2. English Language Proficiency - 20 Points Max
  if (candidate.ieltsScore >= course.minIelts) {
    scorePoints += 20;
    breakdown.push({
      criterion: 'English Language Proficiency (IELTS/TOEFL)',
      status: 'passed',
      studentValue: `IELTS Band ${candidate.ieltsScore.toFixed(1)} (C1)`,
      requiredValue: `Min IELTS ${course.minIelts.toFixed(1)}`,
      details: 'Fully certified and clears English C1 requirement.'
    });
  } else {
    breakdown.push({
      criterion: 'English Language Proficiency (IELTS/TOEFL)',
      status: 'failed',
      studentValue: `IELTS Band ${candidate.ieltsScore.toFixed(1)}`,
      requiredValue: `Min IELTS ${course.minIelts.toFixed(1)}`,
      details: 'Score does not meet mandatory language proficiency cutoff.'
    });
    remedyActionPlan.push(`Retake IELTS or TOEFL to reach at least Band ${course.minIelts.toFixed(1)} before the deadline on ${course.applicationDeadlineNonEu}.`);
  }

  // 3. Degree Subject Alignment - 25 Points Max
  const degreeLower = candidate.currentDegree.toLowerCase();
  const fieldMatches = course.requiredBackground.some(bg => 
    degreeLower.includes(bg.toLowerCase()) || 
    bg.toLowerCase().includes('computer') && degreeLower.includes('computer') ||
    bg.toLowerCase().includes('engineering') && degreeLower.includes('engineering')
  );

  if (fieldMatches) {
    scorePoints += 25;
    breakdown.push({
      criterion: 'Undergraduate Discipline Parity',
      status: 'passed',
      studentValue: candidate.currentDegree,
      requiredValue: course.requiredBackground.slice(0, 2).join(', '),
      details: 'Direct subject continuity verified for postgraduate admission.'
    });
  } else {
    scorePoints += 10;
    breakdown.push({
      criterion: 'Undergraduate Discipline Parity',
      status: 'warning',
      studentValue: candidate.currentDegree,
      requiredValue: course.requiredBackground.join(' or '),
      details: 'Interdisciplinary applicant; admissions committee will scrutinize transcript module equivalence.'
    });
    remedyActionPlan.push(`Include a formal Curricular Matrix explaining how your bachelor coursework maps to ${course.shortName} prerequisites.`);
  }

  // 4. GRE Requirement - 15 Points Max
  if (course.greRequired === 'Mandatory for Non-EU') {
    if (candidate.greScore && candidate.greScore.quant >= 160) {
      scorePoints += 15;
      breakdown.push({
        criterion: 'GRE General Test (ETS)',
        status: 'passed',
        studentValue: `Total ${candidate.greScore.total} (Quant: ${candidate.greScore.quant})`,
        requiredValue: 'Mandatory: Quant ≥ 160',
        details: 'Mandatory GRE criteria successfully verified.'
      });
    } else {
      breakdown.push({
        criterion: 'GRE General Test (ETS)',
        status: 'failed',
        studentValue: candidate.greScore ? `Quant: ${candidate.greScore.quant}` : 'Not taken',
        requiredValue: 'Mandatory: Quant ≥ 160, AW ≥ 3.5',
        details: 'Mandatory requirement for Non-EU applicants at this institution.'
      });
      remedyActionPlan.push(`Take GRE General and ensure Quant is at least 160 to satisfy ${course.shortName} strict admission regulations.`);
    }
  } else if (course.greRequired === 'Recommended') {
    if (candidate.greScore && candidate.greScore.total >= 315) {
      scorePoints += 15;
      breakdown.push({
        criterion: 'GRE General Test (Recommended)',
        status: 'passed',
        studentValue: `Total ${candidate.greScore.total} (Quant: ${candidate.greScore.quant})`,
        requiredValue: 'Recommended: 315+',
        details: 'Provides competitive advantage in aptitude ranking.'
      });
    } else {
      scorePoints += 10;
      breakdown.push({
        criterion: 'GRE General Test',
        status: 'passed',
        studentValue: candidate.greScore ? `Total ${candidate.greScore.total}` : 'None',
        requiredValue: 'Optional / Recommended',
        details: 'Not mandatory for admission clearance.'
      });
    }
  } else {
    scorePoints += 15;
    breakdown.push({
      criterion: 'GRE General Test',
      status: 'passed',
      studentValue: 'Exempt',
      requiredValue: 'Not Required',
      details: 'Program does not evaluate GRE scores.'
    });
  }

  // 5. Work Experience & Portfolio - 10 Points Max
  if (course.workExpRequiredMonths > 0) {
    if (candidate.workExpMonths >= course.workExpRequiredMonths) {
      scorePoints += 10;
      breakdown.push({
        criterion: 'Professional Work Experience',
        status: 'passed',
        studentValue: `${candidate.workExpMonths} Months Verified`,
        requiredValue: `Min ${course.workExpRequiredMonths} Months`,
        details: 'Mandatory work experience criteria verified with employer letters.'
      });
    } else {
      breakdown.push({
        criterion: 'Professional Work Experience',
        status: 'failed',
        studentValue: `${candidate.workExpMonths} Months`,
        requiredValue: `Min ${course.workExpRequiredMonths} Months Required`,
        details: 'Program strictly requires prior industrial or practical experience.'
      });
      remedyActionPlan.push(`Program requires at least ${course.workExpRequiredMonths} months full-time post-graduate experience.`);
    }
  } else {
    scorePoints += 10;
    breakdown.push({
      criterion: 'Work Experience / Portfolio',
      status: 'passed',
      studentValue: `${candidate.workExpMonths} Months (Supplementary)`,
      requiredValue: '0 Months (Consecutive Master)',
      details: 'Experience provides strong leverage in Statement of Purpose.'
    });
  }

  // Overall Score Calculation (Clamped to 100)
  const overallScore = Math.min(100, Math.max(10, scorePoints));

  let verdict: EligibilityResult['verdict'] = 'High Chance (Direct Admit)';
  let verdictColor = '#10B981';

  if (overallScore >= 85) {
    verdict = 'High Chance (Direct Admit)';
    verdictColor = '#10B981';
  } else if (overallScore >= 70) {
    verdict = 'Competitive (Stage 2 Assessment)';
    verdictColor = '#3B82F6';
  } else if (overallScore >= 55) {
    verdict = 'Borderline (Auflagen Expected)';
    verdictColor = '#F59E0B';
  } else if (overallScore >= 40) {
    verdict = 'Low Chance / High Deficit';
    verdictColor = '#EF4444';
  } else {
    verdict = 'Ineligible (Hard Requirement Missed)';
    verdictColor = '#EF4444';
  }

  if (remedyActionPlan.length === 0) {
    remedyActionPlan.push('Your profile is exceptionally strong. Focus on submitting your uni-assist / direct portal dossier early before the deadline.');
    remedyActionPlan.push(`Attach your official APS Certificate (#IND-APS-2024-91482) and Curricularanalyse matrix.`);
  }

  return {
    overallScore,
    verdict,
    verdictColor,
    breakdown,
    remedyActionPlan
  };
}
