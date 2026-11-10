import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScheduleSelector from './components/ScheduleSelector';
import FilterBar from './components/FilterBar';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import KanbanBoard from './components/KanbanBoard';
import { initialJobs } from './data/jobs';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // User Constraints (Feature 2)
  const [userSchedule, setUserSchedule] = useState(() => {
    return localStorage.getItem('flexhunter_schedule') || 'afternoon';
  });
  const [maxHours, setMaxHours] = useState(() => {
    return Number(localStorage.getItem('flexhunter_max_hours')) || 15;
  });

  // Strict Filters (Feature 1)
  const [remoteOnly, setRemoteOnly] = useState(true);
  const [partTimeOnly, setPartTimeOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation & Modal
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'crm'
  const [selectedJob, setSelectedJob] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // CRM Applications State (Feature 4)
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('flexhunter_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Initial demo seed so student sees pipeline immediately in action
    return [
      {
        id: 'app-seed-1',
        job: initialJobs[0],
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: 'Submitted Figma portfolio emphasizing afternoon bandwidth.'
      }
    ];
  });

  // Persist state to LocalStorage
  useEffect(() => {
    localStorage.setItem('flexhunter_schedule', userSchedule);
    localStorage.setItem('flexhunter_max_hours', maxHours.toString());
  }, [userSchedule, maxHours]);

  useEffect(() => {
    localStorage.setItem('flexhunter_apps', JSON.stringify(applications));
  }, [applications]);

  // Toast auto-dismiss
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Save / Bookmark
  const handleToggleSave = (job) => {
    const existing = applications.find((a) => a.job.id === job.id);
    if (existing) {
      setApplications(applications.filter((a) => a.job.id !== job.id));
      showToast(`Removed "${job.title}" from your pipeline.`);
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        job,
        status: 'saved',
        savedAt: new Date().toISOString()
      };
      setApplications([...applications, newApp]);
      showToast(`Saved "${job.title}" to your Pipeline.`);
    }
  };

  // Apply Action
  const handleApply = (job, customNote) => {
    const existing = applications.find((a) => a.job.id === job.id);
    if (existing) {
      setApplications(
        applications.map((a) =>
          a.job.id === job.id ? { ...a, status: 'applied', note: customNote, appliedAt: new Date().toISOString() } : a
        )
      );
    } else {
      const newApp = {
        id: `app-${Date.now()}`,
        job,
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: customNote
      };
      setApplications([...applications, newApp]);
    }
    setSelectedJob(null);
    showToast(`Application sent! Added to 'Applied' column with 5-day follow-up reminder.`);
  };

  // Update Status in CRM
  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
  };

  // Remove from CRM
  const handleRemoveApplication = (appId) => {
    setApplications(applications.filter((a) => a.id !== appId));
    showToast('Application removed from tracker.');
  };

  // Filtering Logic (Feature 1 & Feature 2)
  const filteredJobs = initialJobs.filter((job) => {
    // 1. Strict Remote Filter
    if (remoteOnly && !job.isRemote) {
      return false;
    }
    // 2. Strict Part-Time Filter
    if (partTimeOnly && job.employmentType !== 'Part-Time') {
      return false;
    }
    // 3. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchTags = job.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchTags) return false;
    }
    return true;
  });

  const appliedCount = applications.filter((a) => a.status === 'applied').length;
  const savedCount = applications.filter((a) => a.status === 'saved').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appliedCount={appliedCount}
        savedCount={savedCount}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'feed' ? (
          <div>
            {/* Feature 2: College Schedule Matcher */}
            <ScheduleSelector
              userSchedule={userSchedule}
              setUserSchedule={setUserSchedule}
              maxHours={maxHours}
              setMaxHours={setMaxHours}
            />

            {/* Feature 1: Strict Remote & Part-Time Filter */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              partTimeOnly={partTimeOnly}
              setPartTimeOnly={setPartTimeOnly}
              totalMatching={filteredJobs.length}
              totalJobs={initialJobs.length}
            />

            {/* Feature 3: Upfront Time-Commitment Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
                <p className="text-sm font-bold text-slate-800 mb-1">No roles match your strict filter</p>
                <p className="text-xs text-slate-500 mb-4">
                  Try turning off "Part-Time" or "Remote Only" to inspect offline full-time roles, or clear your search term.
                </p>
                <button
                  onClick={() => {
                    setRemoteOnly(false);
                    setPartTimeOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => {
                  const isSaved = applications.some(
                    (a) => a.job.id === job.id && a.status === 'saved'
                  );
                  const isApplied = applications.some(
                    (a) => a.job.id === job.id && a.status !== 'saved'
                  );
                  return (
                    <JobCard
                      key={job.id}
                      job={job}
                      userSchedule={userSchedule}
                      maxHours={maxHours}
                      onSelectJob={setSelectedJob}
                      isSaved={isSaved}
                      isApplied={isApplied}
                      onToggleSave={handleToggleSave}
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Feature 4: Basic Application Tracker (CRM) */
          <KanbanBoard
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
            onRemoveApplication={handleRemoveApplication}
            onGoToFeed={() => setActiveTab('feed')}
          />
        )}
      </main>

      {/* Feature 3: Detail Modal & Inspection View */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
          isApplied={applications.some(
            (a) => a.job.id === selectedJob.id && a.status !== 'saved'
          )}
          isSaved={applications.some(
            (a) => a.job.id === selectedJob.id && a.status === 'saved'
          )}
          onToggleSave={handleToggleSave}
          userSchedule={userSchedule}
          maxHours={maxHours}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400">
        <p>FlexHunter MVP — Built for College Students Seeking Flexible, Verified Internships.</p>
        <p className="mt-1">Grounded in User Research with MSOT Students · 100% Free & Open Source</p>
      </footer>
    </div>
  );
}
