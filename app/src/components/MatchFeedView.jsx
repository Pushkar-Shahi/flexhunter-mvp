import React, { useState } from 'react';
import { 
  Bookmark, 
  Check, 
  AlertCircle, 
  PlusCircle, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Send
} from 'lucide-react';
import { initialJobsData } from '../data/mockData';

export default function MatchFeedView({
  onApplyViaExtension,
  onSaveToBoard,
  isSaved,
  isApplied,
  searchQuery
}) {
  const [selectedJob, setSelectedJob] = useState(initialJobsData[0]);

  // Quick filters
  const [filterRemote, setFilterRemote] = useState(true);
  const [filterPartTime, setFilterPartTime] = useState(false);
  const [filterWeekend, setFilterWeekend] = useState(false);
  const [filterHighMatch, setFilterHighMatch] = useState(true);

  // Filter jobs
  const filteredJobs = initialJobsData.filter((job) => {
    if (filterRemote && !job.isRemote) return false;
    if (filterHighMatch && job.matchScore < 85) return false;
    if (filterWeekend && !job.hoursRange.toLowerCase().includes('weekend')) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getMatchScoreBadge = (score) => {
    if (score >= 90) {
      return {
        border: 'border-emerald-500',
        text: 'text-emerald-700',
        bg: 'bg-emerald-50/60'
      };
    }
    if (score >= 80) {
      return {
        border: 'border-blue-500',
        text: 'text-blue-700',
        bg: 'bg-blue-50/60'
      };
    }
    return {
      border: 'border-slate-300',
      text: 'text-slate-600',
      bg: 'bg-slate-50'
    };
  };

  const selectedMatchStyle = getMatchScoreBadge(selectedJob?.matchScore || 90);

  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      
      {/* Quick Filters Bar (Exact Match to Image 2 with Color Accents) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <span className="font-semibold text-slate-400 mr-1">Quick filters</span>
          
          <button
            onClick={() => setFilterRemote(!filterRemote)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all border ${
              filterRemote
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Remote Only
          </button>

          <button
            onClick={() => setFilterPartTime(!filterPartTime)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all border ${
              filterPartTime
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Part-Time (&lt;15h/wk)
          </button>

          <button
            onClick={() => setFilterWeekend(!filterWeekend)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all border ${
              filterWeekend
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Weekend Only
          </button>

          <button
            onClick={() => setFilterHighMatch(!filterHighMatch)}
            className={`px-3 py-1.5 rounded-full font-bold transition-all border ${
              filterHighMatch
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            High Match (&gt;85%)
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold text-slate-500">
          <span className="text-slate-700 font-bold">{filteredJobs.length} matches</span>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-slate-900 border border-slate-200 bg-white px-2.5 py-1 rounded-lg">
            <span>Sort: Best match</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Split Layout: Left List vs Right Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Job Cards List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
            <span>Showing {filteredJobs.length} of {initialJobsData.length} · updated just now</span>
            <span>Scroll ↓</span>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {filteredJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              const matchStyle = getMatchScoreBadge(job.matchScore);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white relative ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/15 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      {/* Logo Placeholder */}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                        {job.company[0]}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 leading-snug">
                          {job.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Circular Match Badge with Semantic Color */}
                    <div className={`w-11 h-11 rounded-full border-2 ${matchStyle.border} ${matchStyle.bg} flex flex-col items-center justify-center shrink-0`}>
                      <span className={`text-xs font-extrabold ${matchStyle.text} leading-none`}>
                        {job.matchScore}%
                      </span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase leading-none mt-0.5">
                        Match
                      </span>
                    </div>
                  </div>

                  {/* Badges Row with Semantic Color Coding */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {/* Stipend in Purple */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-purple-200 bg-purple-50 text-purple-800">
                      {job.stipendShort}
                    </span>
                    {/* Remote in Emerald */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200 bg-emerald-50 text-emerald-800">
                      {job.isRemote ? 'Remote' : 'Hybrid'}
                    </span>
                    {/* Hours in Blue */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-200 bg-blue-50 text-blue-800">
                      {job.hoursRange}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Job Detail Panel (7 Cols) */}
        <div className="lg:col-span-7 sticky top-20">
          {selectedJob ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-2xs max-h-[calc(100vh-210px)] overflow-y-auto">
              
              {/* Top Header: Logo, Title, Subtitle, Match Circle */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-extrabold text-slate-700 shrink-0">
                    {selectedJob.company[0]}
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {selectedJob.title}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {selectedJob.company} · {selectedJob.location} · {selectedJob.postedDate}
                    </p>
                  </div>
                </div>

                {/* Match Circle */}
                <div className={`w-14 h-14 rounded-full border-2 ${selectedMatchStyle.border} ${selectedMatchStyle.bg} flex flex-col items-center justify-center shrink-0`}>
                  <span className={`text-sm font-black ${selectedMatchStyle.text} leading-none`}>
                    {selectedJob.matchScore}%
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-none mt-0.5">
                    Match
                  </span>
                </div>
              </div>

              {/* Badges Pill Row */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-full border border-purple-200 bg-purple-50 text-purple-800 font-bold">
                  {selectedJob.stipend}
                </span>
                <span className="px-2.5 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold">
                  {selectedJob.isRemote ? 'Remote' : 'Hybrid'}
                </span>
                <span className="px-2.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800">
                  {selectedJob.hoursRange}
                </span>
                <span className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700">
                  {selectedJob.duration}
                </span>
                <span className="px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700">
                  {selectedJob.deadline}
                </span>
              </div>

              {/* Buttons Row */}
              <div className="flex items-center space-x-3 pt-1">
                <button
                  onClick={() => onApplyViaExtension(selectedJob)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply via Extension</span>
                </button>
                <button
                  onClick={() => onSaveToBoard(selectedJob)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-colors"
                >
                  {isSaved(selectedJob.id) ? 'Saved to Board ✓' : 'Save to Board'}
                </button>
              </div>

              {/* AI Compatibility Breakdown Box (Semantic Colors) */}
              <div className="rounded-2xl border border-slate-200 p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-xs font-bold text-slate-900">
                      AI Compatibility Breakdown
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Based on your resume + schedule
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Pros Column (Emerald) */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-emerald-900 block">Pros</span>
                    <ul className="space-y-1.5">
                      {selectedJob.pros.map((p, i) => (
                        <li key={i} className="flex items-start space-x-2 text-slate-700 leading-snug">
                          <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            +
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Schedule Warnings Column (Amber) */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-amber-900 block">Schedule Warnings</span>
                    <ul className="space-y-1.5">
                      {selectedJob.warnings.map((w, i) => (
                        <li key={i} className="flex items-start space-x-2 text-slate-700 leading-snug">
                          <span className="w-3.5 h-3.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                            !
                          </span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* About the role */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">About the role</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedJob.about}
                </p>
              </div>

              {/* What you'll do */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900">What you'll do</h3>
                <ul className="space-y-1 text-xs text-slate-600">
                  {selectedJob.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Wireframe Skeleton Bars at Bottom */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="w-full h-2 bg-slate-100 rounded-full"></div>
                <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
                <div className="w-1/2 h-2 bg-slate-100 rounded-full"></div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-xs text-slate-400 font-semibold">Select a job from the list to view compatibility details</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
