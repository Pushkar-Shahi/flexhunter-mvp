import React from 'react';
import { 
  Briefcase, 
  Kanban, 
  CalendarClock, 
  ShieldCheck, 
  User, 
  GraduationCap,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ 
  activeView, 
  setActiveView, 
  appliedCount, 
  savedCount,
  maxHours,
  userSchedule
}) {
  const navItems = [
    {
      id: 'discovery',
      label: 'Discovery Feed',
      subtitle: 'Curated matches',
      icon: Briefcase,
      badge: null
    },
    {
      id: 'kanban',
      label: 'My Applications',
      subtitle: 'Kanban CRM pipeline',
      icon: Kanban,
      badge: appliedCount + savedCount > 0 ? appliedCount + savedCount : null
    },
    {
      id: 'profile',
      label: 'Profile & Schedule',
      subtitle: 'Availability matrix',
      icon: CalendarClock,
      badge: 'Active'
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
            FH
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-base text-white tracking-tight">FlexHunter</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Low-Fi
              </span>
            </div>
            <p className="text-[11px] text-slate-400">College Internship Pipeline</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1.5 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pt-2 pb-1">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all text-xs font-semibold ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div>
                  <div className="leading-tight">{item.label}</div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? 'bg-white text-blue-900'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-6">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 pb-2">
            Active Constraints
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Class Hours:</span>
              <span className="font-bold text-white text-[11px]">Mornings Blocked</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Free Window:</span>
              <span className="font-bold text-emerald-400 text-[11px]">1 PM - 6 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Max Bandwidth:</span>
              <span className="font-bold text-blue-400 text-[11px]">{maxHours} hrs/wk</span>
            </div>
            <button
              onClick={() => setActiveView('profile')}
              className="w-full mt-2 py-1 text-[11px] font-bold text-slate-300 bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Adjust Schedule
            </button>
          </div>
        </div>
      </nav>

      {/* User Persona Profile in Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center font-bold text-xs">
            T
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">Tanmay (MSOT)</div>
            <div className="text-[10px] text-slate-400 truncate">Marketing & Design</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
