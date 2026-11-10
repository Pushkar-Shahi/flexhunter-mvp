import React from 'react';
import { Briefcase, Kanban, Clock, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, appliedCount, savedCount, interviewCount }) {
  const totalTracked = appliedCount + savedCount + interviewCount;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Header Title matching Wireframe: College Student Internship App */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  College Student Internship App
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-200 hidden sm:inline-block">
                  FlexHunter
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                College-Compatible · Part-Time & Remote Only
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Matching the 2 Main Wireframe Views) */}
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'feed'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Search</span>
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'crm'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>My Applications</span>
              {totalTracked > 0 && (
                <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'crm' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {totalTracked}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
