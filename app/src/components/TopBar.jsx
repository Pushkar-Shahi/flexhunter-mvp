import React from 'react';
import { Search, Globe } from 'lucide-react';

export default function TopBar({ 
  breadcrumb, 
  searchQuery, 
  setSearchQuery,
  onOpenExtension 
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 gap-4">
      {/* Breadcrumb */}
      <div className="text-xs font-semibold text-slate-400 shrink-0">
        {breadcrumb}
      </div>

      {/* Global Search Input */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search internships, roles, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-400 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          onClick={onOpenExtension}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-slate-600" />
          <span>Extension</span>
        </button>

        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-slate-400"></div>
        </div>

        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
      </div>
    </header>
  );
}
