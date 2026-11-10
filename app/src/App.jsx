import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProfileAvailabilityView from './components/ProfileAvailabilityView';
import MatchFeedView from './components/MatchFeedView';
import ApplicationTrackerView from './components/ApplicationTrackerView';
import ExtensionSimulationView from './components/ExtensionSimulationView';
import { initialApplications, initialJobsData } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation: 'settings' (Screen 1) | 'feed' (Screen 2) | 'tracker' (Screen 3)
  const [activeView, setActiveView] = useState('settings');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Constraints State (Screen 1)
  const [maxHours, setMaxHours] = useState(() => {
    return Number(localStorage.getItem('flexhunter_exact_hours')) || 15;
  });
  const [remoteOnly, setRemoteOnly] = useState(true);

  // Extension Modal State (Screen 4)
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);
  const [extensionTargetJob, setExtensionTargetJob] = useState(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState(null);

  // Applications CRM State (Screen 3)
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
      showToast(`Removed "${job.title}" from board.`);
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
      showToast(`Saved "${job.title}" to your Kanban board!`);
    }
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

  const getBreadcrumb = () => {
    switch (activeView) {
      case 'settings':
        return 'Settings / Availability & Preferences';
      case 'feed':
        return 'Discover / Match Feed';
      case 'tracker':
        return 'Tracker / Applications';
      default:
        return 'FlexHunter';
    }
  };

  return (
    <div className="flex h-screen bg-[#fcfcfc] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden antialiased">
      
      {/* Exact Light Wireframe Sidebar from Images 1, 2, 3 */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onOpenExtension={() => {
          setExtensionTargetJob(initialJobsData[1]);
          setIsExtensionOpen(true);
        }}
      />

      {/* Main View Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar with Breadcrumb, Search, Extension button, Avatar */}
        <TopBar
          breadcrumb={getBreadcrumb()}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenExtension={() => {
            setExtensionTargetJob(initialJobsData[1]);
            setIsExtensionOpen(true);
          }}
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
