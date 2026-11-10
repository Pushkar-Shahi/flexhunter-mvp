import React from 'react';
import { Search, Globe, Clock, Filter, Sparkles } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  remoteOnly,
  setRemoteOnly,
  partTimeOnly,
  setPartTimeOnly,
  totalMatching,
  totalJobs
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles by title, skill (e.g. Figma, Marketing, Canva)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Hard Filters (Must-Have Feature 1) */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Remote Only Toggle */}
          <button
            onClick={() => setRemoteOnly(!remoteOnly)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              remoteOnly
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-1 ring-emerald-400/30'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Remote Only</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              remoteOnly ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {remoteOnly ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Part-Time Only Toggle */}
          <button
            onClick={() => setPartTimeOnly(!partTimeOnly)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              partTimeOnly
                ? 'bg-blue-50 text-blue-700 border-blue-300 ring-1 ring-blue-400/30'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Part-Time (&lt;15h)</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              partTimeOnly ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {partTimeOnly ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Filter Status Bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>
            Showing <strong className="text-slate-800 font-bold">{totalMatching}</strong> of {totalJobs} opportunities matching your college criteria
          </span>
        </div>
        <div className="hidden sm:block text-[11px] text-slate-400">
          Strict filtering excludes 40h full-time offline conflicts
        </div>
      </div>
    </div>
  );
}
