import React from 'react';
import { Briefcase, Kanban, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, appliedCount, savedCount }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Value Prop */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">FlexHunter</span>
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                  Student MVP
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Verified Part-Time & Remote Internships for College Schedules
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Roles</span>
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'crm'
                  ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>My Pipeline</span>
              {appliedCount + savedCount > 0 && (
                <span className="ml-1.5 px-2 py-0.5 text-xs font-bold bg-blue-600 text-white rounded-full">
                  {appliedCount + savedCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
