/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { DaadSearchPlatform } from './components/DaadSearchPlatform';
import { CvEligibilityChecker } from './components/CvEligibilityChecker';
import { ApplicationTracker } from './components/ApplicationTracker';
import { EctsDiagnostic } from './components/EctsDiagnostic';
import { ModuleTable } from './components/ModuleTable';
import { AddModuleModal } from './components/AddModuleModal';
import { BavarianCalculator } from './components/BavarianCalculator';
import { ApsTracker } from './components/ApsTracker';
import { AiCopilot } from './components/AiCopilot';
import { CurricularExportModal } from './components/CurricularExportModal';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { 
  CATEGORY_REQUIREMENTS, 
  INITIAL_MODULES, 
  UNIVERSITY_PROGRAMS, 
  INITIAL_APS_STAGES, 
  INITIAL_DOCUMENTS 
} from './data/initialData';
import { 
  DAAD_MASTER_COURSES, 
  INITIAL_CANDIDATE_PROFILE, 
  INITIAL_APPLICATIONS 
} from './data/daadCourses';
import { CourseModule, DocumentItem, UniversityProgram } from './types/academic';
import { DaadCourse, UserCandidateProfile, ApplicationTrackerItem } from './types/daad';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('daad');
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityProgram>(UNIVERSITY_PROGRAMS[0]);
  const [modules, setModules] = useState<CourseModule[]>(INITIAL_MODULES);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [apsStages, setApsStages] = useState(INITIAL_APS_STAGES);

  // DAAD, Candidate Profile & Application Tracking State
  const [candidateProfile, setCandidateProfile] = useState<UserCandidateProfile>(INITIAL_CANDIDATE_PROFILE);
  const [applications, setApplications] = useState<ApplicationTrackerItem[]>(INITIAL_APPLICATIONS);
  const [selectedDaadCourse, setSelectedDaadCourse] = useState<DaadCourse>(DAAD_MASTER_COURSES[0]);

  // Bavarian GPA State
  const [germanGrade, setGermanGrade] = useState<string>('1.4');

  // Filter state for modules
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState<CourseModule | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [previewingDoc, setPreviewingDoc] = useState<DocumentItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger quick toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculate live global ECTS statistics against selected university
  const totalVerifiedEcts = modules
    .filter(m => m.status === 'matched')
    .reduce((sum, m) => sum + m.resultingEcts, 0);

  const totalRequiredEcts = selectedUniversity.requirements.reduce(
    (sum, r) => sum + r.minEcts, 
    0
  );

  const totalDeficit = selectedUniversity.requirements.reduce((acc, req) => {
    const verifiedInCat = modules
      .filter(m => m.category === req.category && m.status === 'matched')
      .reduce((s, m) => s + m.resultingEcts, 0);
    return acc + Math.max(0, req.minEcts - verifiedInCat);
  }, 0);

  // DAAD & Tracker actions
  const handleSelectCourseForEligibility = (course: DaadCourse) => {
    setSelectedDaadCourse(course);
    setCurrentTab('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToTracker = (course: DaadCourse) => {
    if (applications.some(a => a.courseId === course.id)) {
      showToast(`${course.shortName} is already in your application pipeline.`);
      return;
    }

    const newApp: ApplicationTrackerItem = {
      id: `app-${Date.now()}`,
      courseId: course.id,
      courseName: course.courseName,
      university: course.university,
      shortName: course.shortName,
      city: course.city,
      degree: course.degree,
      stage: 'Shortlisted',
      portal: course.portalType,
      deadline: course.applicationDeadlineNonEu,
      appliedDate: new Date().toISOString().split('T')[0],
      vpdStatus: course.portalType.includes('VPD') ? 'Pending Payment' : 'Not Needed',
      apsCertificateAttached: true,
      notes: `Target program added from DAAD Search. Check ECTS prerequisites: ${course.ectsPrerequisites.map(e => e.category).join(', ')}.`,
      nextTaskDeadline: course.applicationDeadlineNonEu,
      tasks: [
        { id: `t-${Date.now()}-1`, text: `Check syllabus parity for ${course.shortName}`, completed: false },
        { id: `t-${Date.now()}-2`, text: `Upload APS Certificate to ${course.portalType}`, completed: true },
        { id: `t-${Date.now()}-3`, text: `Submit application before ${course.applicationDeadlineNonEu}`, completed: false }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Added ${course.shortName} – ${course.courseName} to Application Tracker.`);
  };

  const handleUpdateApplication = (updatedApp: ApplicationTrackerItem) => {
    setApplications(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
  };

  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    showToast('Application entry removed from pipeline.');
  };

  // Module actions
  const handleSaveModule = (moduleData: Partial<CourseModule>) => {
    if (editingModule) {
      setModules(prev => prev.map(m => m.id === editingModule.id ? { ...m, ...moduleData } as CourseModule : m));
      setEditingModule(null);
    } else {
      setModules(prev => [moduleData as CourseModule, ...prev]);
    }
  };

  const handleDeleteModule = (id: string) => {
    setModules(prev => prev.filter(m => m.id !== id));
  };

  const handleEditModule = (module: CourseModule) => {
    setEditingModule(module);
    setIsAddModalOpen(true);
  };

  // Document checklist actions
  const handleToggleDocument = (id: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = !d.isUploaded;
        return {
          ...d,
          isUploaded: nextStatus,
          status: nextStatus ? 'verified' : 'pending',
          validationMessage: nextStatus ? 'Manually Marked as Verified' : 'Pending Upload'
        };
      }
      return d;
    }));
  };

  const handleUploadMockDoc = (id: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          isUploaded: true,
          status: 'verified',
          validationMessage: 'Uploaded & OCR Verified',
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' CET'
        };
      }
      return d;
    }));
  };

  const appliedCourseIds = applications.map(a => a.courseId);

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] flex flex-col font-sans selection:bg-blue-600/30 selection:text-white">
      
      {/* Primary Sticky Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedUniversity={selectedUniversity}
        onSelectUniversity={setSelectedUniversity}
        allUniversities={UNIVERSITY_PROGRAMS}
        germanGrade={germanGrade}
        totalEcts={totalVerifiedEcts}
        requiredEcts={totalRequiredEcts}
        totalDeficit={totalDeficit}
        onOpenExport={() => setIsExportModalOpen(true)}
        onOpenAiDrawer={() => setCurrentTab('copilot')}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1E293B] border border-blue-500/40 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab 1: DAAD Course Directory */}
        {currentTab === 'daad' && (
          <DaadSearchPlatform
            courses={DAAD_MASTER_COURSES}
            candidateProfile={candidateProfile}
            onSelectCourseForEligibility={handleSelectCourseForEligibility}
            onAddToTracker={handleAddToTracker}
            appliedCourseIds={appliedCourseIds}
          />
        )}

        {/* Tab 2: CV & Portfolio Eligibility Scanner */}
        {currentTab === 'eligibility' && (
          <CvEligibilityChecker
            candidateProfile={candidateProfile}
            onUpdateProfile={setCandidateProfile}
            courses={DAAD_MASTER_COURSES}
            selectedCourse={selectedDaadCourse}
            onSelectCourse={setSelectedDaadCourse}
            onAddToTracker={handleAddToTracker}
            isApplied={appliedCourseIds.includes(selectedDaadCourse.id)}
          />
        )}

        {/* Tab 3: Application Pipeline Tracker */}
        {currentTab === 'tracker' && (
          <ApplicationTracker
            applications={applications}
            onUpdateApplication={handleUpdateApplication}
            onDeleteApplication={handleDeleteApplication}
            onAddNewApplication={() => setCurrentTab('daad')}
            allCourses={DAAD_MASTER_COURSES}
          />
        )}

        {/* Tab 4: ECTS Diagnostic & Module Table */}
        {currentTab === 'ects' && (
          <div className="space-y-6">
            <EctsDiagnostic
              categories={CATEGORY_REQUIREMENTS}
              modules={modules}
              selectedUniversity={selectedUniversity}
              onOpenAddModal={() => {
                setEditingModule(null);
                setIsAddModalOpen(true);
              }}
              selectedCategoryFilter={selectedCategoryFilter}
              onSelectCategoryFilter={setSelectedCategoryFilter}
            />

            <ModuleTable
              modules={modules}
              onDeleteModule={handleDeleteModule}
              onEditModule={handleEditModule}
              selectedCategoryFilter={selectedCategoryFilter}
              onClearFilter={() => setSelectedCategoryFilter(null)}
            />
          </div>
        )}

        {/* Tab 5: Bavarian Formula & NC Cutoff Engine */}
        {currentTab === 'bavarian' && (
          <BavarianCalculator
            currentGrade={germanGrade}
            onGradeChange={setGermanGrade}
            universities={UNIVERSITY_PROGRAMS}
            onSelectUniversity={(uni) => {
              setSelectedUniversity(uni);
              setCurrentTab('ects');
            }}
          />
        )}

        {/* Tab 6: APS & uni-assist Dossier Tracker */}
        {currentTab === 'aps' && (
          <ApsTracker
            stages={apsStages}
            documents={documents}
            onToggleDocument={handleToggleDocument}
            onPreviewDocument={(doc) => setPreviewingDoc(doc)}
            onUploadMockDoc={handleUploadMockDoc}
          />
        )}

        {/* Tab 7: AI Curricular Co-Pilot */}
        {currentTab === 'copilot' && (
          <AiCopilot
            selectedUniversity={selectedUniversity}
            germanGrade={germanGrade}
            modules={modules}
            totalDeficit={totalDeficit}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0F172A] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-400 font-heading">ACADEMIC PRECISION</span>
            <span>•</span>
            <span>DAAD Master's Directory & Admissions Intelligence Germany</span>
          </div>
          <div className="flex items-center space-x-4 font-mono-numbers text-[11px]">
            <span>DAAD Programme Catalog</span>
            <span>•</span>
            <span>KMK / ANABIN Data Model</span>
            <span>•</span>
            <span>uni-assist VPD Compatible</span>
            <span>•</span>
            <span>Bavarian Formula Standard</span>
          </div>
        </div>
      </footer>

      {/* Add / Edit Course Module Modal */}
      <AddModuleModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingModule(null);
        }}
        onSave={handleSaveModule}
        initialData={editingModule}
      />

      {/* High-Contrast Light Surface Curricularanalyse Export View */}
      <CurricularExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        modules={modules}
        categories={CATEGORY_REQUIREMENTS}
        selectedUniversity={selectedUniversity}
        germanGrade={germanGrade}
      />

      {/* Document Inspector Modal */}
      <DocumentPreviewModal
        isOpen={!!previewingDoc}
        onClose={() => setPreviewingDoc(null)}
        document={previewingDoc}
      />

    </div>
  );
}
