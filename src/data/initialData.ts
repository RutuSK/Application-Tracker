import { CategoryRequirement, CourseModule, DocumentItem, ApsStage, UniversityProgram } from '../types/academic';

export const CATEGORY_REQUIREMENTS: CategoryRequirement[] = [
  {
    id: 'math',
    name: 'Mathematics & Statistics',
    germanName: 'Höhere Mathematik & Statistik',
    requiredEcts: 28,
    description: 'Linear Algebra, Advanced Calculus, Discrete Mathematics, Numerical Analysis, Probability & Statistics.',
    color: '#3B82F6',
    typicalModules: ['Linear Algebra', 'Calculus I & II', 'Discrete Mathematics', 'Applied Probability & Statistics']
  },
  {
    id: 'theory',
    name: 'Theoretical Computer Science',
    germanName: 'Theoretische Informatik',
    requiredEcts: 24,
    description: 'Formal Languages, Automata Theory, Computability, Complexity Theory, Logic, and Compiler Construction.',
    color: '#EF4444', // Marked critical due to frequent deficits in international degrees
    typicalModules: ['Formal Languages & Automata', 'Theory of Computation', 'Algorithm Design & Analysis', 'Mathematical Logic']
  },
  {
    id: 'systems',
    name: 'Computer Systems & Architecture',
    germanName: 'Technische Informatik & Rechnernetze',
    requiredEcts: 22,
    description: 'Computer Architecture, Operating Systems, Computer Networks, Distributed Systems, Embedded Systems.',
    color: '#10B981',
    typicalModules: ['Computer Architecture', 'Operating Systems', 'Computer Networks', 'Microprocessors']
  },
  {
    id: 'software',
    name: 'Software Engineering & Databases',
    germanName: 'Praktische Informatik & Softwareentwicklung',
    requiredEcts: 32,
    description: 'Object-Oriented Programming, Data Structures, Relational Databases, Software Engineering Methodologies.',
    color: '#4EDEA3',
    typicalModules: ['Object-Oriented Programming', 'Data Structures', 'Database Management Systems', 'Software Engineering']
  },
  {
    id: 'electives',
    name: 'Advanced CS & Specializations',
    germanName: 'Wahlpflichtfächer & Spezialisierungen',
    requiredEcts: 14,
    description: 'Machine Learning, Artificial Intelligence, Cloud Computing, Cybersecurity, Human-Computer Interaction.',
    color: '#F59E0B',
    typicalModules: ['Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Information Security']
  }
];

export const INITIAL_MODULES: CourseModule[] = [
  // Math & Statistics
  {
    id: 'mod-1',
    code: 'MATH101',
    name: 'Engineering Mathematics I (Linear Algebra & Calculus)',
    category: 'math',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Lineare Algebra & Analysis I',
    status: 'matched',
    syllabusMatchConfidence: 98,
    grade: 'A+ (9.2)',
    syllabusSnippet: 'Matrices, Eigenvalues, Vector spaces, Single variable calculus, Taylor series.'
  },
  {
    id: 'mod-2',
    code: 'MATH102',
    name: 'Engineering Mathematics II (Multivariable Calculus & Differential Eq)',
    category: 'math',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Analysis II & Gewöhnliche DGL',
    status: 'matched',
    syllabusMatchConfidence: 96,
    grade: 'A (8.8)',
    syllabusSnippet: 'Partial derivatives, Multiple integrals, Vector calculus, First and second order ODEs.'
  },
  {
    id: 'mod-3',
    code: 'CS204',
    name: 'Discrete Mathematical Structures',
    category: 'math',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Diskrete Strukturen für Informatiker',
    status: 'matched',
    syllabusMatchConfidence: 99,
    grade: 'A+ (9.5)',
    syllabusSnippet: 'Propositional logic, Set theory, Combinatorics, Graph theory, Recurrence relations.'
  },
  {
    id: 'mod-4',
    code: 'MATH301',
    name: 'Probability, Statistics & Stochastic Processes',
    category: 'math',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Wahrscheinlichkeitstheorie und Statistik',
    status: 'matched',
    syllabusMatchConfidence: 95,
    grade: 'B+ (7.9)',
    syllabusSnippet: 'Bayesian probability, Continuous distributions, Markov chains, Hypothesis testing.'
  },
  {
    id: 'mod-5',
    code: 'MATH402',
    name: 'Numerical Methods & Optimization',
    category: 'math',
    homeCredits: 3,
    conversionFactor: 1.5,
    resultingEcts: 4.5,
    germanEquivalenceName: 'Numerische Methoden',
    status: 'matched',
    syllabusMatchConfidence: 94,
    grade: 'A (8.5)',
    syllabusSnippet: 'Root finding, Linear system solvers, Numerical integration, Convex optimization basics.'
  },

  // Theoretical Informatics (Often has deficits in Indian/Asian 4-year degrees)
  {
    id: 'mod-6',
    code: 'CS302',
    name: 'Design and Analysis of Algorithms',
    category: 'theory',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Effiziente Algorithmen & Datenstrukturen',
    status: 'matched',
    syllabusMatchConfidence: 97,
    grade: 'A+ (9.4)',
    syllabusSnippet: 'Asymptotic notation, Divide and conquer, Dynamic programming, Greedy, NP-completeness.'
  },
  {
    id: 'mod-7',
    code: 'CS305',
    name: 'Formal Languages and Automata Theory',
    category: 'theory',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Formale Sprachen, Automaten & Berechenbarkeit',
    status: 'matched',
    syllabusMatchConfidence: 96,
    grade: 'A (8.7)',
    syllabusSnippet: 'DFA, NFA, Regular expressions, Context-free grammars, Pushdown automata, Turing machines.'
  },
  {
    id: 'mod-8',
    code: 'CS401',
    name: 'Compiler Design & Semantic Analysis',
    category: 'theory',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Grundlagen des Compilerbaus',
    status: 'review',
    syllabusMatchConfidence: 74,
    grade: 'B+ (7.8)',
    syllabusSnippet: 'Lexical analysis, LL/LR parsing, Intermediate code generation, Optimization.'
  },

  // Systems & Architecture
  {
    id: 'mod-9',
    code: 'CS201',
    name: 'Computer Organization & Architecture',
    category: 'systems',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Rechnerarchitektur',
    status: 'matched',
    syllabusMatchConfidence: 99,
    grade: 'A (8.6)',
    syllabusSnippet: 'MIPS instruction set, Pipelining, Memory hierarchy, Cache coherence, I/O systems.'
  },
  {
    id: 'mod-10',
    code: 'CS303',
    name: 'Operating Systems Principles & Concurrency',
    category: 'systems',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Betriebssysteme und Nebenläufigkeit',
    status: 'matched',
    syllabusMatchConfidence: 98,
    grade: 'A+ (9.1)',
    syllabusSnippet: 'Process scheduling, Semaphores, Mutex, Virtual memory, Paging, File systems.'
  },
  {
    id: 'mod-11',
    code: 'CS304',
    name: 'Computer Networks & Internet Protocols',
    category: 'systems',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Rechnernetze und verteilte Systeme',
    status: 'matched',
    syllabusMatchConfidence: 97,
    grade: 'A (8.9)',
    syllabusSnippet: 'OSI 7 layers, TCP/IP, Congestion control, Routing algorithms, Socket programming.'
  },
  {
    id: 'mod-12',
    code: 'CS405',
    name: 'Distributed Systems & Cloud Infrastructure',
    category: 'systems',
    homeCredits: 3,
    conversionFactor: 1.5,
    resultingEcts: 4.5,
    germanEquivalenceName: 'Verteilte Systeme',
    status: 'matched',
    syllabusMatchConfidence: 92,
    grade: 'A (8.7)',
    syllabusSnippet: 'CAP theorem, Consensus algorithms, RPC, Message queues, Container orchestration.'
  },

  // Software Engineering & Practical CS
  {
    id: 'mod-13',
    code: 'CS101',
    name: 'Data Structures with C++',
    category: 'software',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Datenstrukturen und Programmierung I',
    status: 'matched',
    syllabusMatchConfidence: 100,
    grade: 'A+ (9.8)',
    syllabusSnippet: 'Arrays, Linked lists, Stacks, Queues, Binary search trees, Hashing, Graph representations.'
  },
  {
    id: 'mod-14',
    code: 'CS202',
    name: 'Object-Oriented Design & Java Programming',
    category: 'software',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Objektorientierte Softwareentwicklung',
    status: 'matched',
    syllabusMatchConfidence: 98,
    grade: 'A (9.0)',
    syllabusSnippet: 'Polymorphism, Inheritance, Design patterns (Factory, Observer, Singleton), Unit testing.'
  },
  {
    id: 'mod-15',
    code: 'CS203',
    name: 'Database Management Systems & SQL',
    category: 'software',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Datenbanksysteme',
    status: 'matched',
    syllabusMatchConfidence: 97,
    grade: 'A+ (9.3)',
    syllabusSnippet: 'Relational algebra, SQL queries, Normal forms (1NF-BCNF), ACID transactions, B-Trees.'
  },
  {
    id: 'mod-16',
    code: 'CS306',
    name: 'Software Engineering & Agile Methodologies',
    category: 'software',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Software Engineering Praktikum',
    status: 'matched',
    syllabusMatchConfidence: 95,
    grade: 'A (8.8)',
    syllabusSnippet: 'Requirements engineering, UML diagrams, CI/CD pipelines, Scrum, Clean code principles.'
  },
  {
    id: 'mod-17',
    code: 'CS499',
    name: 'Capstone Engineering Project',
    category: 'software',
    homeCredits: 6,
    conversionFactor: 1.5,
    resultingEcts: 9,
    germanEquivalenceName: 'Bachelor-Arbeit / Abschlussprojekt',
    status: 'matched',
    syllabusMatchConfidence: 91,
    grade: 'A+ (9.6)',
    syllabusSnippet: 'Full lifecycle software project implementation, architectural documentation, defense.'
  },

  // Electives / Specializations
  {
    id: 'mod-18',
    code: 'CS412',
    name: 'Machine Learning & Neural Networks',
    category: 'electives',
    homeCredits: 4,
    conversionFactor: 1.5,
    resultingEcts: 6,
    germanEquivalenceName: 'Maschinelles Lernen',
    status: 'matched',
    syllabusMatchConfidence: 96,
    grade: 'A+ (9.5)',
    syllabusSnippet: 'Supervised learning, Linear regression, Support vector machines, Deep learning basics, CNNs.'
  },
  {
    id: 'mod-19',
    code: 'CS418',
    name: 'Cryptography and Information Security',
    category: 'electives',
    homeCredits: 3,
    conversionFactor: 1.5,
    resultingEcts: 4.5,
    germanEquivalenceName: 'Kryptographie und Datensicherheit',
    status: 'matched',
    syllabusMatchConfidence: 93,
    grade: 'A (8.5)',
    syllabusSnippet: 'Symmetric/Asymmetric encryption, RSA, AES, Hash functions, Public key infrastructure.'
  },
  {
    id: 'mod-20',
    code: 'CS425',
    name: 'Natural Language Processing',
    category: 'electives',
    homeCredits: 3,
    conversionFactor: 1.5,
    resultingEcts: 4.5,
    germanEquivalenceName: 'Verarbeitung natürlicher Sprache',
    status: 'matched',
    syllabusMatchConfidence: 92,
    grade: 'A (8.9)',
    syllabusSnippet: 'Tokenization, N-grams, Word embeddings, Attention mechanisms, Transformer models.'
  }
];

export const UNIVERSITY_PROGRAMS: UniversityProgram[] = [
  {
    id: 'tum-inf',
    university: 'Technical University of Munich (TUM)',
    shortName: 'TUM',
    degree: 'M.Sc. Informatics',
    location: 'Munich / Garching, Bavaria',
    ncCutoff: 1.7,
    applicationDeadline: '2025-05-31',
    deadlineWarningDays: 12,
    portal: 'Direct Portal',
    tuitionFee: '€4,000–6,000 / semester (Non-EU fee)',
    languageReq: 'English C1 (TOEFL 88+ / IELTS 6.5+)',
    requirements: [
      { category: 'math', minEcts: 28 },
      { category: 'theory', minEcts: 28 }, // TUM is notorious for high TCS requirement!
      { category: 'systems', minEcts: 22 },
      { category: 'software', minEcts: 32 }
    ],
    notes: 'Strict Curricularanalyse! If TCS deficit is <= 30 ECTS, you are routed to Stage 2 Assessment Exam in Garching or online proctoring.',
    admissionFormula: 'Eignungsverfahren: Curricular Analysis score (0-50 pts) + Bavarian Grade (0-30 pts) + Statement of Purpose (0-20 pts). Need ≥70 pts for direct admission.'
  },
  {
    id: 'rwth-cs',
    university: 'RWTH Aachen University',
    shortName: 'RWTH Aachen',
    degree: 'M.Sc. Computer Science',
    location: 'Aachen, North Rhine-Westphalia',
    ncCutoff: 1.8,
    applicationDeadline: '2025-03-01',
    deadlineWarningDays: 45,
    portal: 'Direct Portal',
    tuitionFee: '€0 tuition (approx. €320 semester ticket fee)',
    languageReq: 'English C1 (GRE General required for Non-EU graduates)',
    requirements: [
      { category: 'math', minEcts: 25 },
      { category: 'theory', minEcts: 27 }, // Very strict Theoretical CS cutoff
      { category: 'systems', minEcts: 20 },
      { category: 'software', minEcts: 28 }
    ],
    notes: 'Mandatory GRE General Test for non-EU applicants: Quantitative Reasoning minimum 160 required, Analytical Writing minimum 3.5.',
    admissionFormula: 'Zero-Tolerance Subject Equivalence. Deficit cannot exceed 30 ECTS total across all categories to receive conditional admission (Auflagen).'
  },
  {
    id: 'tuberlin-cs',
    university: 'Technical University of Berlin (TU Berlin)',
    shortName: 'TU Berlin',
    degree: 'M.Sc. Computer Science (Informatik)',
    location: 'Berlin',
    ncCutoff: 1.6,
    applicationDeadline: '2025-05-15',
    deadlineWarningDays: 14,
    portal: 'uni-assist (VPD)',
    tuitionFee: '€0 tuition (€310 semester fee incl. transport)',
    languageReq: 'English C1 & German A1 Certificate by end of 1st semester',
    requirements: [
      { category: 'math', minEcts: 20 },
      { category: 'theory', minEcts: 22 },
      { category: 'systems', minEcts: 18 },
      { category: 'software', minEcts: 30 }
    ],
    notes: 'Requires Preliminary Review Documentation (VPD) issued by uni-assist e.V. Apply to uni-assist at least 6 weeks before Berlin deadline!',
    admissionFormula: 'Bavarian GPA ranking with NC barrier. In recent semesters, cutoff was around 1.5 to 1.7 German grade.'
  },
  {
    id: 'kit-inf',
    university: 'Karlsruhe Institute of Technology (KIT)',
    shortName: 'KIT',
    degree: 'M.Sc. Informatics',
    location: 'Karlsruhe, Baden-Württemberg',
    ncCutoff: 2.0,
    applicationDeadline: '2025-07-15',
    deadlineWarningDays: 80,
    portal: 'Direct Portal',
    tuitionFee: '€1,500 / semester (State of Baden-Württemberg non-EU law)',
    languageReq: 'English B2/C1 (IELTS 6.5)',
    requirements: [
      { category: 'math', minEcts: 24 },
      { category: 'theory', minEcts: 20 },
      { category: 'systems', minEcts: 24 },
      { category: 'software', minEcts: 30 }
    ],
    notes: 'High focus on hardware-software co-design and formal methods. GRE optional but boosts ranking.',
    admissionFormula: 'Prüfungsausschuss evaluates theoretical equivalence. Auflagen (additional bachelor exams) often capped at 30 ECTS.'
  },
  {
    id: 'lmu-ds',
    university: 'Ludwig Maximilian University of Munich (LMU)',
    shortName: 'LMU Munich',
    degree: 'M.Sc. Data Science',
    location: 'Munich, Bavaria',
    ncCutoff: 1.9,
    applicationDeadline: '2025-06-01',
    deadlineWarningDays: 20,
    portal: 'Direct Portal',
    tuitionFee: '€0 tuition (approx. €150 semester fee)',
    languageReq: 'English C1',
    requirements: [
      { category: 'math', minEcts: 30 },
      { category: 'theory', minEcts: 15 },
      { category: 'systems', minEcts: 12 },
      { category: 'software', minEcts: 30 }
    ],
    notes: 'Elite program within the Elite Network of Bavaria. Written aptitude entrance exam or technical interview required for shortlisted candidates.',
    admissionFormula: 'Two-stage assessment: Portfolio review followed by mandatory 60-minute technical test in Mathematics & Programming.'
  },
  {
    id: 'tuda-ds',
    university: 'Technical University of Darmstadt',
    shortName: 'TU Darmstadt',
    degree: 'M.Sc. Computer Science',
    location: 'Darmstadt, Hesse',
    ncCutoff: 2.2,
    applicationDeadline: '2025-07-15',
    deadlineWarningDays: 78,
    portal: 'Direct Portal',
    tuitionFee: '€0 tuition (approx. €340 semester fee)',
    languageReq: 'English C1',
    requirements: [
      { category: 'math', minEcts: 22 },
      { category: 'theory', minEcts: 18 },
      { category: 'systems', minEcts: 18 },
      { category: 'software', minEcts: 28 }
    ],
    notes: 'Renowned for Cybersecurity (CRISP) and Autonomous Systems. Has formal Entrance Competency Assessment (Eingangskompetenzprüfung).',
    admissionFormula: 'Direct entry if comprehensive module map matches >= 80%. Otherwise conditional entry with 2 bachelor oral/written exams.'
  }
];

export const INITIAL_APS_STAGES: ApsStage[] = [
  {
    id: 1,
    title: 'Registration & Online Submission',
    germanTitle: 'Online-Registrierung & Gebührenzahlung',
    status: 'completed',
    date: '2024-11-14',
    description: 'Online account creation on the official APS India portal, filling academic details, and INR 18,000 fee transfer via CC/Netbanking.',
    details: [
      'APS Registration ID: IND-APS-2024-91482',
      'Payment Reference: CC-HDFC-991823019 (Verified)',
      'Consent form generated and digitally signed'
    ]
  },
  {
    id: 2,
    title: 'Physical Dossier Inwarding',
    germanTitle: 'Postalischer Eingang des Dokumentendossiers',
    status: 'completed',
    date: '2024-11-22',
    description: 'Physical submission of attested transcripts, degree certificates, and printed application form via BlueDart courier to German Embassy APS Section, New Delhi.',
    details: [
      'AWB Tracking: BLUEDART-8829104812 (Delivered to Chanakyapuri)',
      'Security barcode inwarded at gate scanner',
      'Weight & page count verified (32 sheets)'
    ]
  },
  {
    id: 3,
    title: 'DigiLocker & Institutional Verification',
    germanTitle: 'DigiLocker- und Hochschulabgleich',
    status: 'completed',
    date: '2024-12-08',
    description: 'Direct institutional cross-check against National Academic Depository (NAD / DigiLocker) and university registrar database.',
    details: [
      'DigiLocker API response: 100% cryptographic signature match',
      'Roll Number & Year of Passing validated with Examination Controller',
      'Provisional certificate authenticated'
    ]
  },
  {
    id: 4,
    title: 'Professor / Registrar Academic Verification',
    germanTitle: 'Akademische Verifikation & Telefon-/Mail-Check',
    status: 'completed',
    date: '2025-01-15',
    description: 'Official verification email sent to HOD / Registrar university domain email (@univ.ac.in) and professor response received.',
    details: [
      'Official verification email confirmed by Dr. K. Sharma (HOD CSE)',
      'Academic syllabus catalog authenticity ratified',
      'Medium of Instruction (MOI) English letter cross-checked'
    ]
  },
  {
    id: 5,
    title: 'Digital APS Certificate Issuance',
    germanTitle: 'Ausstellung des digitalen APS-Zertifikats',
    status: 'completed',
    date: '2025-01-28',
    description: 'Cryptographically signed digital APS certificate issued with verifiable QR code and official German Embassy seal.',
    details: [
      'Certificate Number: DE-APS-DEL-2025-88391',
      'Validity: Unlimited (for academic Master admission in Germany)',
      'Verified German Grade: 1.4 (Bavarian Formula / Bavarian KMK scale)'
    ]
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-aps',
    name: 'Official Digital APS Certificate',
    germanName: 'Digitales APS-Zertifikat der Botschaft',
    category: 'administrative',
    isUploaded: true,
    status: 'verified',
    validationMessage: 'Cryptographically Verified • Cert #DE-APS-DEL-2025-88391',
    timestamp: '2025-01-28 14:22:10 CET',
    fileSize: '1.2 MB',
    mandatory: true,
    details: 'Digital PDF with PKI seal and QR verification URL to aps-india.de'
  },
  {
    id: 'doc-transcript',
    name: 'Consolidated Transcript of Records (Semesters 1–8)',
    germanName: 'Vollständige Notenübersicht / Fächer- und Notenliste',
    category: 'academic',
    isUploaded: true,
    status: 'verified',
    validationMessage: 'OCR 99.4% Match • 8 Semesters • 168 Indian Credits',
    timestamp: '2024-11-18 09:12:44 CET',
    fileSize: '4.8 MB',
    mandatory: true,
    details: 'Official university registrar stamp & watermark on all 8 semesters.'
  },
  {
    id: 'doc-degree',
    name: 'Bachelor of Technology Degree Certificate',
    germanName: 'Bachelor-Urkunde / Abschlusszeugnis',
    category: 'academic',
    isUploaded: true,
    status: 'verified',
    validationMessage: 'Verified Seal • First Class with Distinction',
    timestamp: '2024-11-18 09:15:20 CET',
    fileSize: '2.4 MB',
    mandatory: true,
    details: 'Graduation Year: 2024. Major: Computer Science & Engineering.'
  },
  {
    id: 'doc-syllabus',
    name: 'Curriculum & Module Handbook (Modulhandbuch)',
    germanName: 'Offizielles Modulhandbuch / Curricularanalyse-Katalog',
    category: 'academic',
    isUploaded: true,
    status: 'verified',
    validationMessage: '42 Course Modules Extracted • ECTS Mapping Synchronized',
    timestamp: '2024-11-20 16:40:02 CET',
    fileSize: '18.6 MB',
    mandatory: true,
    details: 'Detailed course syllabus with weekly lecture hours, lab credits, and literature citations.'
  },
  {
    id: 'doc-ielts',
    name: 'IELTS Academic English Test Report Form (TRF)',
    germanName: 'Englisch-Sprachnachweis (IELTS / TOEFL)',
    category: 'language',
    isUploaded: true,
    status: 'verified',
    validationMessage: 'Overall Band 8.0 (C1 CEFR Level) • Online Verification Passed',
    timestamp: '2024-10-12 11:05:19 CET',
    fileSize: '890 KB',
    mandatory: true,
    details: 'Listening: 8.5, Reading: 8.5, Writing: 7.0, Speaking: 7.5. Valid until Oct 2026.'
  },
  {
    id: 'doc-german',
    name: 'German Language Certificate (Goethe-Zertifikat A1/A2)',
    germanName: 'Deutschnachweis (Goethe / TestDaF / telc)',
    category: 'language',
    isUploaded: true,
    status: 'review_needed',
    validationMessage: 'A2 in progress (Exam scheduled) • A1 Certificate uploaded',
    timestamp: '2025-01-10 17:33:05 CET',
    fileSize: '1.1 MB',
    mandatory: false,
    details: 'Goethe A1 Passed (Score: 88/100). Satisfies visa & TU Berlin prerequisite.'
  },
  {
    id: 'doc-vpd',
    name: 'uni-assist Vorprüfungsdokumentation (VPD)',
    germanName: 'Vorprüfungsdokumentation (VPD) von uni-assist e.V.',
    category: 'administrative',
    isUploaded: false,
    status: 'pending',
    validationMessage: 'Pending processing at uni-assist Berlin • Est. completion 3 weeks',
    timestamp: '2025-02-01 10:00:00 CET',
    mandatory: true,
    details: 'Application submitted to uni-assist with application number UA-2025-77192.'
  },
  {
    id: 'doc-sop',
    name: 'Academic Statement of Purpose & Curricular Letter',
    germanName: 'Motivationsschreiben & Akademisches Profil',
    category: 'administrative',
    isUploaded: true,
    status: 'verified',
    validationMessage: 'Tailored for TUM & RWTH • 2 Pages • Reviewed',
    timestamp: '2025-01-29 21:10:44 CET',
    fileSize: '450 KB',
    mandatory: true,
    details: 'Focuses on Distributed Systems, Formal Methods, and Capstone Project.'
  }
];
