import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProfileAvailabilityView from './components/ProfileAvailabilityView';
import MatchFeedView from './components/MatchFeedView';
import ApplicationTrackerView from './components/ApplicationTrackerView';
import SavedJobsView from './components/SavedJobsView';
import ResumeStudioView from './components/ResumeStudioView';
import ExtensionSimulationView from './components/ExtensionSimulationView';
import EmailDraftModal from './components/EmailDraftModal';
import { initialApplications, initialJobsData } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation: 'settings' | 'feed' | 'tracker' | 'saved' | 'resume'
  const [activeView, setActiveView] = useState('settings');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Theme State: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('flexhunter_theme') || 'light';
  });

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Constraints State (Screen 1)
  const [maxHours, setMaxHours] = useState(() => {
    return Number(localStorage.getItem('flexhunter_exact_hours')) || 15;
  });
  const [remoteOnly, setRemoteOnly] = useState(true);

  // Modals State
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [extensionTargetJob, setExtensionTargetJob] = useState(null);
  const [draftEmailApp, setDraftEmailApp] = useState(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Applications CRM State (Screen 3 & Saved Jobs)
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('flexhunter_exact_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialApplications;
  });

  // Sync theme with <html> class and localStorage
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('flexhunter_theme', theme);
  }, [theme]);

  // LocalStorage Persistence
  useEffect(() => {
    localStorage.setItem('flexhunter_exact_hours', maxHours.toString());
  }, [maxHours]);

  useEffect(() => {
    localStorage.setItem('flexhunter_exact_apps', JSON.stringify(applications));
  }, [applications]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Save to Board
  const handleSaveToBoard = (job) => {
    const exists = applications.find((a) => a.title === job.title);
    if (exists) {
      setApplications(applications.filter((a) => a.title !== job.title));
      showToast(`Removed "${job.title}" from saved list.`);
    } else {
      const newCard = {
        id: `app-saved-${Date.now()}`,
        company: job.company,
        title: job.title,
        dateMeta: "Saved just now",
        status: "saved",
        pill: "Saved from feed",
        pillType: "neutral"
      };
      setApplications([newCard, ...applications]);
      showToast(`Saved "${job.title}" to your saved collection!`);
    }
  };

  // Remove from Saved
  const handleRemoveFromSaved = (appId) => {
    setApplications(applications.filter((a) => a.id !== appId));
    showToast("Role removed from saved list.");
  };

  // Open Extension from Job
  const handleApplyViaExtension = (job) => {
    setExtensionTargetJob(job);
    setIsExtensionOpen(true);
  };

  // Callback when user submits from the extension
  const handleAutoFillAndTrack = (jobMeta) => {
    const exists = applications.find((a) => a.title === jobMeta.title);
    if (!exists) {
      const newCard = {
        id: `app-applied-${Date.now()}`,
        company: jobMeta.company,
        title: jobMeta.title,
        dateMeta: "Applied just now",
        status: "applied",
        pill: "Follow-up due in 5 days",
        pillType: "dark"
      };
      setApplications([newCard, ...applications]);
    }
    showToast(`Application submitted! Logged into "Applied" on your Kanban.`);
  };

  // Export Data Backup as JSON
  const handleExportData = () => {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      maxHours,
      remoteOnly,
      theme,
      applications,
      skills: JSON.parse(localStorage.getItem('flexhunter_skills') || '[]'),
      schedule: JSON.parse(localStorage.getItem('flexhunter_schedule') || '{}'),
      resumeInfo: JSON.parse(localStorage.getItem('flexhunter_resume_info') || '{}')
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flexhunter_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Data exported successfully!');
  };

  // Import Data Backup from JSON
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.applications && Array.isArray(data.applications)) {
          setApplications(data.applications);
        }
        if (data.maxHours) {
          setMaxHours(data.maxHours);
        }
        if (data.theme) {
          setTheme(data.theme);
        }
        if (data.skills) {
          localStorage.setItem('flexhunter_skills', JSON.stringify(data.skills));
        }
        if (data.schedule) {
          localStorage.setItem('flexhunter_schedule', JSON.stringify(data.schedule));
        }
        if (data.resumeInfo) {
          localStorage.setItem('flexhunter_resume_info', JSON.stringify(data.resumeInfo));
        }
        showToast('Backup restored successfully!');
      } catch (err) {
        showToast('Error parsing JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  // Reset to Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset FlexHunter to default demo state?')) {
      localStorage.clear();
      setApplications(initialApplications);
      setMaxHours(15);
      setTheme('light');
      showToast('Reset to default demo data.');
    }
  };

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'settings':
        return 'Settings / Availability & Preferences';
      case 'feed':
        return 'Discover / Match Feed';
      case 'tracker':
        return 'Tracker / Applications';
      case 'saved':
        return 'Collections / Saved Jobs';
      case 'resume':
        return 'Studio / Resume & Portfolio';
      default:
        return 'FlexHunter';
    }
  };

  const savedApplications = applications.filter((a) => a.status === 'saved');

  return (
    <div className="flex h-screen bg-[#fcfcfc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden antialiased transition-colors">
      
      {/* Sidebar with all 5 active views */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        savedCount={savedApplications.length}
        onOpenExtension={() => {
          setExtensionTargetJob(initialJobsData[1]);
          setIsExtensionOpen(true);
        }}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar with Breadcrumb, Search, Theme Toggle, Extension button, Avatar */}
        <TopBar
          breadcrumb={getBreadcrumb()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          onOpenExtension={() => {
            setExtensionTargetJob(initialJobsData[1]);
            setIsExtensionOpen(true);
          }}
          onExportData={handleExportData}
          onImportData={handleImportData}
          onResetData={handleResetData}
        />

        {/* Content View Container */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* Screen 1: Availability & Preferences */}
          {activeView === 'settings' && (
            <ProfileAvailabilityView
              maxHours={maxHours}
              setMaxHours={setMaxHours}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              onSave={() => {
                showToast("Preferences saved! Showing your curated match feed.");
                setActiveView('feed');
              }}
            />
          )}

          {/* Screen 2: Curated Match Feed (Split-Layout) */}
          {activeView === 'feed' && (
            <MatchFeedView
              searchQuery={searchQuery}
              onApplyViaExtension={handleApplyViaExtension}
              onSaveToBoard={handleSaveToBoard}
              isSaved={(id) => applications.some((a) => a.title.includes("UI/UX") && a.status === 'saved')}
              isApplied={(id) => applications.some((a) => a.title.includes("UI/UX") && a.status === 'applied')}
            />
          )}

          {/* Screen 3: Application Tracker (5-Column Kanban) */}
          {activeView === 'tracker' && (
            <ApplicationTrackerView
              applications={applications}
              setApplications={setApplications}
              onOpenExtensionForJob={handleApplyViaExtension}
              onOpenDraftEmail={(app) => setDraftEmailApp(app)}
            />
          )}

          {/* View: Saved Jobs */}
          {activeView === 'saved' && (
            <SavedJobsView
              savedApplications={savedApplications}
              onApplyViaExtension={handleApplyViaExtension}
              onRemoveFromSaved={handleRemoveFromSaved}
              onGoToFeed={() => setActiveView('feed')}
            />
          )}

          {/* View: Resume Studio */}
          {activeView === 'resume' && (
            <ResumeStudioView
              maxHours={maxHours}
              userSchedule="afternoon"
            />
          )}

        </main>
      </div>

      {/* Screen 4: Chrome Extension Side-Panel Simulation (Modal Overlay) */}
      {isExtensionOpen && (
        <ExtensionSimulationView
          targetJob={extensionTargetJob}
          onClose={() => setIsExtensionOpen(false)}
          onAutoFillAndTrack={handleAutoFillAndTrack}
        />
      )}

      {/* Actionable Follow-Up Email Generator Modal */}
      {draftEmailApp && (
        <EmailDraftModal
          application={draftEmailApp}
          onClose={() => setDraftEmailApp(null)}
        />
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
