import React from 'react';
import { Search, SlidersHorizontal, CheckSquare, Square, Sparkles } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  remoteOnly,
  setRemoteOnly,
  partTimeOnly,
  setPartTimeOnly,
  selectedCategory,
  setSelectedCategory,
  totalMatching
}) {
  const categories = ["All", "Tech", "ML/AI", "Product", "Design", "Marketing"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6">
      
      {/* Search Input Bar (Matching Screen 2 of Wireframe) */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>

        <button 
          onClick={() => {
            setRemoteOnly(true);
            setPartTimeOnly(true);
            setSelectedCategory("All");
          }}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          title="Reset to Student Defaults"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Checkbox Filters (Matching Screen 2 of Wireframe) */}
      <div className="flex items-center space-x-5 mt-3 pt-3 border-t border-slate-100 text-xs font-semibold">
        <button
          onClick={() => setRemoteOnly(!remoteOnly)}
          className={`flex items-center space-x-1.5 transition-colors cursor-pointer select-none ${
            remoteOnly ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {remoteOnly ? (
            <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
          ) : (
            <Square className="w-4 h-4 text-slate-300" />
          )}
          <span>Remote</span>
        </button>

        <button
          onClick={() => setPartTimeOnly(!partTimeOnly)}
          className={`flex items-center space-x-1.5 transition-colors cursor-pointer select-none ${
            partTimeOnly ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {partTimeOnly ? (
            <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
          ) : (
            <Square className="w-4 h-4 text-slate-300" />
          )}
          <span>Part-Time (&lt;15h)</span>
        </button>

        <span className="text-[11px] text-slate-400 ml-auto hidden sm:block">
          {totalMatching} student matches
        </span>
      </div>

      {/* Popular Filters Category Pills (Matching Wireframe Screen 2) */}
      <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-slate-100 overflow-x-auto pb-0.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
          Popular:
        </span>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

    </div>
  );
}
