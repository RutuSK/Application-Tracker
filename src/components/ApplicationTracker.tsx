import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  MapPin, 
  Calendar, 
  FileCheck2, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  ArrowRight,
  Filter,
  Layers,
  List,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';
import { ApplicationTrackerItem, ApplicationStage, DaadCourse } from '../types/daad';

interface ApplicationTrackerProps {
  applications: ApplicationTrackerItem[];
  onUpdateApplication: (app: ApplicationTrackerItem) => void;
  onDeleteApplication: (id: string) => void;
  onAddNewApplication: () => void;
  allCourses: DaadCourse[];
}

const STAGES: ApplicationStage[] = [
  'Shortlisted',
  'Preparing Documents / VPD',
  'Application Submitted',
  'Under Examination Board Review',
  'Interview / Aptitude Test',
  'Admission Offer (Zulassung)',
  'Conditional Admit (Auflagen)',
  'Enrolled / Visa Phase'
];

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onUpdateApplication,
  onDeleteApplication,
  onAddNewApplication,
  allCourses
}) => {
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [activeTaskAppId, setActiveTaskAppId] = useState<string | null>(null);
  const [newTaskText, setNewTaskText] = useState('');

  const filteredApps = applications.filter(app => {
    if (stageFilter === 'all') return true;
    return app.stage === stageFilter;
  });

  const handleStageChange = (app: ApplicationTrackerItem, newStage: ApplicationStage) => {
    onUpdateApplication({
      ...app,
      stage: newStage
    });
  };

  const handleToggleTask = (app: ApplicationTrackerItem, taskId: string) => {
    const updatedTasks = app.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    onUpdateApplication({
      ...app,
      tasks: updatedTasks
    });
  };

  const handleAddTask = (app: ApplicationTrackerItem) => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: `task-${Date.now()}`,
      text: newTaskText.trim(),
      completed: false
    };
    onUpdateApplication({
      ...app,
      tasks: [...app.tasks, newTask]
    });
    setNewTaskText('');
  };

  const getStageColor = (stage: ApplicationStage) => {
    switch (stage) {
      case 'Shortlisted': return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Preparing Documents / VPD': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Application Submitted': return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Under Examination Board Review': return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      case 'Interview / Aptitude Test': return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      case 'Admission Offer (Zulassung)': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold';
      case 'Conditional Admit (Auflagen)': return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
      case 'Enrolled / Visa Phase': return 'bg-emerald-600/30 text-emerald-200 border-emerald-500';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] p-5 lg:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/25">
                German University Admission Pipeline
              </span>
              <span className="text-xs text-slate-400 font-mono-numbers">
                Wintersemester 2025/26 Tracker
              </span>
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-white font-heading mt-1">
              Multi-University Application Management & Task Command
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Track statutory deadlines, uni-assist Preliminary Review Documentations (VPD), APS verification attach status, and Aptitude Assessment invitations across all your target German institutions.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Mode Toggle */}
            <div className="bg-[#0F172A] p-1 rounded-lg border border-slate-800 flex text-xs">
              <button
                onClick={() => setViewMode('board')}
                className={`p-1.5 px-3 rounded-md font-semibold flex items-center space-x-1.5 cursor-pointer transition-all ${
                  viewMode === 'board' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Pipeline Board</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 px-3 rounded-md font-semibold flex items-center space-x-1.5 cursor-pointer transition-all ${
                  viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Detailed List</span>
              </button>
            </div>

            <button
              onClick={onAddNewApplication}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Target Course</span>
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Total Target Programs</span>
            <div className="text-xl font-bold text-white font-mono-numbers mt-0.5">{applications.length}</div>
          </div>
          <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">Active Submissions</span>
            <div className="text-xl font-bold text-blue-400 font-mono-numbers mt-0.5">
              {applications.filter(a => a.stage === 'Application Submitted' || a.stage === 'Under Examination Board Review').length}
            </div>
          </div>
          <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">VPD Applications</span>
            <div className="text-xl font-bold text-amber-400 font-mono-numbers mt-0.5">
              {applications.filter(a => a.vpdStatus && a.vpdStatus !== 'Not Needed').length}
            </div>
          </div>
          <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase block font-semibold">APS Attached Rate</span>
            <div className="text-xl font-bold text-emerald-400 font-mono-numbers mt-0.5">
              {Math.round((applications.filter(a => a.apsCertificateAttached).length / Math.max(1, applications.length)) * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* View 1: Pipeline Kanban Board */}
      {viewMode === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {[
            { id: 'Shortlisted', label: '1. Shortlisted & Prep', desc: 'Evaluating ECTS match' },
            { id: 'Preparing Documents / VPD', label: '2. uni-assist / VPD', desc: 'Dossier legalization' },
            { id: 'Application Submitted', label: '3. Submitted', desc: 'Portal closed & dispatched' },
            { id: 'Under Examination Board Review', label: '4. In Faculty Review', desc: 'Prüfungsausschuss assessment' }
          ].map((col) => {
            const colApps = applications.filter(a => a.stage === col.id);

            return (
              <div
                key={col.id}
                className="bg-[#1E293B] border border-white/[0.08] rounded-xl p-4 space-y-3 min-h-[450px] flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                      {col.label}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {col.desc}
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#0F172A] text-slate-300 font-mono-numbers border border-slate-800">
                    {colApps.length}
                  </span>
                </div>

                {/* Column Application Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-[#0F172A] border border-white/[0.06] hover:border-blue-500/40 rounded-xl p-3.5 space-y-2.5 transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div>
                          <span className="text-[10px] font-bold text-blue-400 uppercase font-mono-numbers">
                            {app.shortName}
                          </span>
                          <h4 className="font-bold text-white leading-tight mt-0.5">
                            {app.courseName}
                          </h4>
                        </div>
                        <button
                          onClick={() => onDeleteApplication(app.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                          title="Remove from tracker"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{app.city}</span>
                        <span>•</span>
                        <span className="font-mono-numbers">{app.portal}</span>
                      </div>

                      {/* Status / Stage select */}
                      <div>
                        <select
                          value={app.stage}
                          onChange={(e) => handleStageChange(app, e.target.value as ApplicationStage)}
                          className="w-full bg-slate-900 border border-slate-700 text-slate-300 text-[11px] rounded p-1.5 font-medium focus:outline-none"
                        >
                          {STAGES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Tasks snippet */}
                      <div className="pt-2 border-t border-white/[0.04] space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Checklist:</span>
                          <span className="font-mono-numbers">
                            {app.tasks.filter(t => t.completed).length} / {app.tasks.length} done
                          </span>
                        </div>
                        
                        {app.tasks.slice(0, 2).map(task => (
                          <div 
                            key={task.id}
                            onClick={() => handleToggleTask(app, task.id)}
                            className="flex items-start space-x-1.5 text-[11px] cursor-pointer text-slate-300 hover:text-white"
                          >
                            {task.completed ? (
                              <CheckSquare className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                            ) : (
                              <Square className="w-3 h-3 text-slate-600 mt-0.5 shrink-0" />
                            )}
                            <span className={`truncate ${task.completed ? 'line-through text-slate-500' : ''}`}>
                              {task.text}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Deadline */}
                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono-numbers">
                        <span>Deadline: <strong className="text-amber-400">{app.deadline}</strong></span>
                        {app.apsCertificateAttached && (
                          <span className="text-emerald-400 flex items-center space-x-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>APS OK</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="py-8 text-center text-[11px] text-slate-500 border border-dashed border-slate-800 rounded-lg">
                      No applications in this phase
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View 2: Detailed Table View */
        <div className="bg-[#1E293B] rounded-xl border border-white/[0.08] shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-slate-400 uppercase tracking-wider font-semibold border-b border-white/[0.08] text-[11px]">
                  <th className="py-3 px-4">University & Course</th>
                  <th className="py-3 px-4">Application Portal</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4">VPD Status</th>
                  <th className="py-3 px-4">APS Verified</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Checklist Progress</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredApps.map((app, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <tr 
                      key={app.id}
                      className={isEven ? 'bg-[#1E293B]' : 'bg-[#182234]'}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-white text-xs">
                          {app.courseName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {app.university} ({app.city})
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono-numbers text-slate-300 text-[11px]">
                        <div>{app.portal}</div>
                        {app.portalApplicationId && (
                          <div className="text-[10px] text-slate-500">ID: {app.portalApplicationId}</div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={app.stage}
                          onChange={(e) => handleStageChange(app, e.target.value as ApplicationStage)}
                          className={`text-xs rounded-lg px-2 py-1 font-semibold border focus:outline-none cursor-pointer ${getStageColor(app.stage)}`}
                        >
                          {STAGES.map(s => (
                            <option key={s} value={s} className="bg-slate-900 text-white font-normal">
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-4 font-mono-numbers text-[11px] text-slate-300">
                        {app.vpdStatus || 'Not Needed'}
                      </td>

                      <td className="py-3 px-4">
                        {app.apsCertificateAttached ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center space-x-1 w-max">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Attached</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/25 w-max">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-mono-numbers text-amber-400 font-semibold text-xs">
                        {app.deadline}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-mono-numbers text-slate-300">
                            {app.tasks.filter(t => t.completed).length} / {app.tasks.length}
                          </span>
                          <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(app.tasks.filter(t => t.completed).length / Math.max(1, app.tasks.length)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onDeleteApplication(app.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded transition-colors cursor-pointer"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
