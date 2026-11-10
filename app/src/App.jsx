import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ScheduleSelector from './components/ScheduleSelector';
import FilterBar from './components/FilterBar';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import KanbanBoard from './components/KanbanBoard';
import { initialJobs } from './data/jobs';
import { CheckCircle2 } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation & Modal
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'crm'
  const [selectedJob, setSelectedJob] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // CRM Applications State (Feature 4: Saved / Applied / Interview)
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('flexhunter_wireframe_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Seed matching the wireframe sketch:
    return [
      {
        id: 'app-seed-saved',
        job: initialJobs[1], // PixelCraft Design
        status: 'saved',
        savedAt: new Date().toISOString()
      },
      {
        id: 'app-seed-applied-1',
        job: initialJobs[0], // Google SWE Intern
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: 'Submitted resume and highlighted afternoon hours.'
      },
      {
        id: 'app-seed-applied-2',
        job: initialJobs[2], // GrowthPulse Marketing
        status: 'applied',
        appliedAt: new Date().toISOString(),
        note: 'Applied with writing portfolio.'
      },
      {
        id: 'app-seed-interview',
        job: initialJobs[3], // NeuralNext AI
        status: 'interview',
        appliedAt: new Date().toISOString(),
        note: 'Invited to take home async benchmark task.'
      }
    ];
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('flexhunter_schedule', userSchedule);
    localStorage.setItem('flexhunter_max_hours', maxHours.toString());
  }, [userSchedule, maxHours]);

  useEffect(() => {
    localStorage.setItem('flexhunter_wireframe_apps', JSON.stringify(applications));
  }, [applications]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Save
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
    showToast(`Applied! Added to 'Applied' column with a 5-day follow-up reminder.`);
  };

  // Move status in Kanban
  const handleUpdateStatus = (appId, newStatus) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
  };

  // Remove from Kanban
  const handleRemoveApplication = (appId) => {
    setApplications(applications.filter((a) => a.id !== appId));
    showToast('Role removed from pipeline.');
  };

  // Filter Logic (Features 1 & 2)
  const filteredJobs = initialJobs.filter((job) => {
    // 1. Strict Remote
    if (remoteOnly && !job.isRemote) return false;

    // 2. Strict Part-Time
    if (partTimeOnly && job.employmentType !== 'Part-Time') return false;

    // 3. Category Filter
    if (selectedCategory !== 'All' && job.category !== selectedCategory) return false;

    // 4. Search Filter
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
  const interviewCount = applications.filter((a) => a.status === 'interview').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCount}
        appliedCount={appliedCount}
        interviewCount={interviewCount}
      />

      {/* Floating Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'feed' ? (
          <div>
            {/* Student Schedule Bar */}
            <ScheduleSelector
              userSchedule={userSchedule}
              setUserSchedule={setUserSchedule}
              maxHours={maxHours}
              setMaxHours={setMaxHours}
            />

            {/* Search (Improved) & Popular Filters - Screen 2 */}
            <FilterBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              partTimeOnly={partTimeOnly}
              setPartTimeOnly={setPartTimeOnly}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              totalMatching={filteredJobs.length}
            />

            {/* Job Feed Grid */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
                <p className="text-sm font-bold text-slate-800 mb-1">No roles match your filters</p>
                <p className="text-xs text-slate-500 mb-4">
                  Turn off "Part-Time" or "Remote" to inspect offline roles, or choose "All" categories.
                </p>
                <button
                  onClick={() => {
                    setRemoteOnly(true);
                    setPartTimeOnly(true);
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800"
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
          /* My Applications (Kanban) - Screen 4 */
          <KanbanBoard
            applications={applications}
            onUpdateStatus={handleUpdateStatus}
            onRemoveApplication={handleRemoveApplication}
            onGoToFeed={() => setActiveTab('feed')}
          />
        )}
      </main>

      {/* Job Detail Screen - Screen 3 */}
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
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-400">
        <p>College Student Internship App (FlexHunter) — Designed & Built from Figma Wireframe</p>
        <p className="mt-1">Figma Prototype: <a href="https://www.figma.com/design/cUSqziKBG0hMgspxI9M1vs" target="_blank" rel="noreferrer" className="text-blue-600 underline">cUSqziKBG0hMgspxI9M1vs</a></p>
      </footer>
    </div>
  );
}
