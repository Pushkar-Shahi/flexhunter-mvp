import React from 'react';
import { 
  Compass, 
  Kanban, 
  Sliders, 
  Bookmark, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Globe
} from 'lucide-react';

export default function Sidebar({ 
  activeView, 
  setActiveView, 
  isCollapsed, 
  setIsCollapsed,
  onOpenExtension,
  savedCount 
}) {
  const menuItems = [
    { id: 'feed', label: 'Match Feed', icon: Compass },
    { id: 'tracker', label: 'Application Tracker', icon: Kanban },
    { id: 'settings', label: 'Availability & Preferences', icon: Sliders },
    { id: 'saved', label: 'Saved Jobs', icon: Bookmark, badge: savedCount > 0 ? savedCount : null },
    { id: 'resume', label: 'Resume Studio', icon: FileText, badge: 'AI' }
  ];

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-18' : 'w-60'
      } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-all duration-150 select-none`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-black dark:bg-blue-600 text-white font-extrabold flex items-center justify-center shrink-0 text-sm">
              F
            </div>
            {!isCollapsed && (
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-sm">
                FlexHunter
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center text-xs cursor-pointer"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-slate-800 dark:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-blue-500 dark:bg-slate-900 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 space-y-3">
        {/* Browser Extension Card */}
        {!isCollapsed && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-left space-y-2">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Browser extension
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug mt-0.5">
                Apply to jobs in one click
              </div>
            </div>
            <button
              onClick={onOpenExtension}
              className="w-full py-1.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors shadow-2xs flex items-center justify-center space-x-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span>Preview Extension</span>
            </button>
          </div>
        )}

        {/* User Avatar Placeholder */}
        <div className="flex items-center space-x-3 pt-2 border-t border-slate-100 dark:border-slate-800 px-1">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 shrink-0"></div>
          {!isCollapsed && (
            <div className="space-y-1">
              <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="w-10 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
