import React from 'react';
import { 
  Compass, 
  Kanban, 
  Sliders, 
  Bookmark, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Globe,
  Sparkles
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
      } bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-all duration-200 ease-in-out select-none z-10`}
    >
      {/* Top Header */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-extrabold flex items-center justify-center shrink-0 text-sm shadow-sm shadow-blue-500/20">
              F
            </div>
            {!isCollapsed && (
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-sm flex items-center space-x-1">
                <span>FlexHunter</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center text-xs cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-1 ring-blue-500'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold transition-colors ${
                    isActive
                      ? 'bg-blue-700 text-white'
                      : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900'
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
          <div className="p-3.5 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 dark:from-slate-800/60 dark:to-slate-800/30 border border-blue-100 dark:border-slate-800 rounded-2xl text-left space-y-2">
            <div>
              <div className="flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Sparkles className="w-3 h-3" />
                <span>Chrome Extension</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug mt-0.5">
                Apply in 1-click on Internshala & LinkedIn
              </div>
            </div>
            <button
              onClick={onOpenExtension}
              className="w-full py-1.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs hover:shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Simulate Extension</span>
            </button>
          </div>
        )}

        {/* User Card */}
        <div className="flex items-center space-x-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 px-1">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 shadow-xs">
            TS
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Tanmay Shahi</div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">MSOT · Design & Tech</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
