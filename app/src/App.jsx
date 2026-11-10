import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DiscoveryFeedView from './components/DiscoveryFeedView';
import KanbanBoard from './components/KanbanBoard';
import ProfileAvailabilityView from './components/ProfileAvailabilityView';
import { initialJobs } from './data/jobs';
import { CheckCircle2, BellRing, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation View: 'discovery' | 'kanban' | 'profile'
  const [activeView, setActiveView] = useState('discovery');

  // Candidate Constraints (Feature 2 & Screen 1)
  const [maxHours, setMaxHours] = useState(() => {
    return Number(localStorage.getItem('flexhunter_proto_max_hours')) || 15;
  });
  const [userSchedule, setUserSchedule] = useState('afternoon');

  // Filter State (Feature 1 & Screen 2)
  const [remoteOnly, setRemoteOnly] = useState(true);
  const [partTimeOnly, setPartTimeOnly] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Job for Split View
  const [selectedJob, setSelectedJob] = useState(initialJobs[0]);
  const [toastMessage, setToastMessage] = useState(null);

  // Kanban Applications State (Feature 4 & Screen 3)
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('flexhunter_proto_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Seed matching wireframe prototype:
    return [
      {
        id: 'app-seed-1',
        job: initialJobs[1], // PixelCraft Design
        status: 'saved',
        savedAt: new Date().toISOString()
      },
      {
        id: 'app-seed-2',
        job: initialJobs[0], // Google SWE Intern
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: 'Submitted Figma portfolio and noted afternoon bandwidth.'
      },
      {
        id: 'app-seed-3',
        job: initialJobs[2], // GrowthPulse Media
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: 'Applied for content marketing.'
      },
      {
        id: 'app-seed-4',
        job: initialJobs[3], // NeuralNext AI
        status: 'interview',
        appliedAt: new Date().toISOString(),
        note: 'Benchmark take-home task assigned.'
      }
    ];
  });

  // LocalStorage persistence
  useEffect(() => {
    localStorage.setItem('flexhunter_proto_max_hours', maxHours.toString());
  }, [maxHours]);

  useEffect(() => {
    localStorage.setItem('flexhunter_proto_apps', JSON.stringify(applications));
  }, [applications]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Save in pipeline
  const handleToggleSave = (job) => {
    const existing = applications.find((a) => a.job.id === job.id);
    if (existing) {
      setApplications(applications.filter((a) => a.job.id !== job.id));
      showToast(`Removed "${job.title}" from pipeline.`);
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        job,
        status: 'saved',
        savedAt: new Date().toISOString()
      };
      setApplications([...applications, newApp]);
      showToast(`Saved "${job.title}" to your Kanban!`);
    }
  };

  // Apply to job
  const handleApply = (job, pitchNote) => {
    const existing = applications.find((a) => a.job.id === job.id);
    if (existing) {
      setApplications(
        applications.map((a) =>
          a.job.id === job.id ? { ...a, status: 'applied', note: pitchNote, appliedAt: new Date().toISOString() } : a
        )
      );
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        job,
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: pitchNote
      };
      setApplications([...applications, newApp]);
    }
    showToast(`Application submitted! Logged in Kanban with a 5-day follow-up reminder.`);
  };

  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
  };

  const handleRemoveApplication = (appId) => {
    setApplications(applications.filter((a) => a.id !== appId));
    showToast('Role removed from pipeline.');
  };

  // Filter Jobs
  const filteredJobs = initialJobs.filter((job) => {
    if (remoteOnly && !job.isRemote) return false;
    if (partTimeOnly && job.employmentType !== 'Part-Time') return false;
    if (selectedCategory !== 'All' && job.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchTags = job.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchTags) return false;
    }
    return true;
  });

  const savedCount = applications.filter((a) => a.status === 'saved').length;
  const appliedCount = applications.filter((a) => a.status === 'applied').length;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      
      {/* 240px Left Sidebar (Exact layout from Figma Prototype) */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        appliedCount={appliedCount}
        savedCount={savedCount}
        maxHours={maxHours}
        userSchedule={userSchedule}
      />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Breadcrumb & Status Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
            <span className="text-slate-400">FlexHunter</span>
            <span>/</span>
            <span className="text-slate-900 font-bold capitalize">
              {activeView === 'discovery' ? 'Curated Match Feed' : activeView === 'kanban' ? 'My Applications (Kanban)' : 'Profile & Availability'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Class Schedule: Morning Blocked · Free 1 PM - 6 PM</span>
            </span>

            <button
              onClick={() => setActiveView('profile')}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              Edit Matrix
            </button>
          </div>
        </header>

        {/* View Container */}
        <main className="flex-1 p-5 lg:p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeView === 'discovery' && (
            <DiscoveryFeedView
              jobs={filteredJobs}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
              onApply={handleApply}
              onToggleSave={handleToggleSave}
              isJobSaved={(id) => applications.some((a) => a.job.id === id && a.status === 'saved')}
              isJobApplied={(id) => applications.some((a) => a.job.id === id && a.status !== 'saved')}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              partTimeOnly={partTimeOnly}
              setPartTimeOnly={setPartTimeOnly}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxHours={maxHours}
              userSchedule={userSchedule}
            />
          )}

          {activeView === 'kanban' && (
            <KanbanBoard
              applications={applications}
              onUpdateStatus={handleUpdateStatus}
              onRemoveApplication={handleRemoveApplication}
              onGoToFeed={() => setActiveView('discovery')}
            />
          )}

          {activeView === 'profile' && (
            <ProfileAvailabilityView
              maxHours={maxHours}
              setMaxHours={setMaxHours}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              onSaveAndExplore={() => setActiveView('discovery')}
            />
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
