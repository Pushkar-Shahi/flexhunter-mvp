import React, { useState } from 'react';
import { 
  Search, 
  CheckSquare, 
  Square, 
  Building2, 
  Bookmark, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Send, 
  ShieldCheck, 
  Sparkles,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function DiscoveryFeedView({
  jobs,
  selectedJob,
  setSelectedJob,
  onApply,
  onToggleSave,
  isJobSaved,
  isJobApplied,
  searchQuery,
  setSearchQuery,
  remoteOnly,
  setRemoteOnly,
  partTimeOnly,
  setPartTimeOnly,
  selectedCategory,
  setSelectedCategory,
  maxHours,
  userSchedule
}) {
  const categories = ["All", "Tech", "ML/AI", "Product", "Design", "Marketing"];
  const [pitchNote, setPitchNote] = useState("");

  // Update pitch note when selectedJob changes
  React.useEffect(() => {
    if (selectedJob) {
      setPitchNote(
        `Hi ${selectedJob.company} Team,\n\nI am a college student specializing in ${selectedJob.category}. My morning lectures conclude by 1:00 PM, leaving my afternoons completely available for this ${selectedJob.hoursPerWeek} hrs/week role.\n\nLooking forward to speaking!`
      );
    }
  }, [selectedJob?.id]);

  return (
    <div className="space-y-4 pb-8 animate-in fade-in duration-150">
      
      {/* Top Filter & Search Bar (Matching Wireframe Screen 2) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search marketing, graphic design, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Quick Checkboxes */}
          <div className="flex items-center space-x-4 text-xs font-semibold px-2">
            <button
              onClick={() => setRemoteOnly(!remoteOnly)}
              className={`flex items-center space-x-1.5 transition-colors cursor-pointer select-none ${
                remoteOnly ? 'text-blue-700' : 'text-slate-500'
              }`}
            >
              {remoteOnly ? (
                <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
              ) : (
                <Square className="w-4 h-4 text-slate-300" />
              )}
              <span>Remote Only</span>
            </button>

            <button
              onClick={() => setPartTimeOnly(!partTimeOnly)}
              className={`flex items-center space-x-1.5 transition-colors cursor-pointer select-none ${
                partTimeOnly ? 'text-blue-700' : 'text-slate-500'
              }`}
            >
              {partTimeOnly ? (
                <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
              ) : (
                <Square className="w-4 h-4 text-slate-300" />
              )}
              <span>Part-Time (&lt;15h)</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 overflow-x-auto pb-0.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Category:
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
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
          <span className="text-xs text-slate-400 ml-auto hidden md:block shrink-0">
            {jobs.length} verified roles
          </span>
        </div>
      </div>

      {/* Split Layout: Left 40% Job Cards, Right 60% Sticky Detail Panel (Figma Wireframe Screen 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Scrollable Job List (450px / 5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[calc(100vh-210px)] overflow-y-auto pr-1">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <p className="text-xs font-bold text-slate-700">No roles match criteria</p>
              <p className="text-[11px] text-slate-400 mt-1">Try unchecking Part-Time or clearing filters.</p>
            </div>
          ) : (
            jobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              const isSaved = isJobSaved(job.id);
              const isApplied = isJobApplied(job.id);
              const isFit = job.scheduleSlot === userSchedule || job.scheduleSlot === 'flexible';
              const matchScore = isFit && job.isRemote ? (job.hoursPerWeek <= 12 ? 94 : 88) : 72;

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative bg-white ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-500/15 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start space-x-3">
                      {/* Logo square */}
                      <div className={`w-10 h-10 rounded-xl ${job.logoBg || 'bg-blue-600'} text-white font-extrabold text-xs flex items-center justify-center shrink-0`}>
                        {job.logoText || job.company[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {job.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          {job.company} · {job.isRemote ? 'Remote' : job.location}
                        </p>
                      </div>
                    </div>

                    {/* AI Match Score Badge */}
                    <div className="flex flex-col items-end">
                      <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${
                        matchScore >= 90
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {matchScore}% Fit
                      </span>
                    </div>
                  </div>

                  {/* Commitment Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {job.hoursPerWeek} hrs/wk ({job.dailyCommitment})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {job.stipend}
                    </span>
                  </div>

                  {/* Schedule Diagnostic Snippet */}
                  <div className="text-[11px] text-slate-600 font-medium flex items-center space-x-1.5 pt-2 border-t border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Schedule: {job.scheduleSlotLabel}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Job Detail Inspection Panel (7 cols / Sticky) */}
        <div className="lg:col-span-7 sticky top-20">
          {selectedJob ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 max-h-[calc(100vh-210px)] overflow-y-auto">
              
              {/* Header: Company, Title, CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-start space-x-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${selectedJob.logoBg || 'bg-blue-600'} text-white font-extrabold text-base flex items-center justify-center shrink-0`}>
                    {selectedJob.logoText || selectedJob.company[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                      {selectedJob.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      {selectedJob.company} · {selectedJob.isRemote ? '100% Remote' : selectedJob.location} • {selectedJob.employmentType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onToggleSave(selectedJob)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                      isJobSaved(selectedJob.id)
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}
                    title="Save to Pipeline"
                  >
                    <Bookmark className={`w-4 h-4 ${isJobSaved(selectedJob.id) ? 'fill-blue-600' : ''}`} />
                  </button>

                  <button
                    onClick={() => onApply(selectedJob, pitchNote)}
                    disabled={isJobApplied(selectedJob.id)}
                    className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all ${
                      isJobApplied(selectedJob.id)
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 active:scale-98'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isJobApplied(selectedJob.id) ? 'Applied ✓' : 'Apply Now'}</span>
                  </button>
                </div>
              </div>

              {/* AI Diagnostic Breakdown Card (Matching Figma Wireframe) */}
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-950 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>College Schedule & Compatibility Breakdown</span>
                </div>
                <div className="space-y-1.5 text-xs text-emerald-800">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Free Hours Match:</strong> Operates during your free afternoon slot ({selectedJob.scheduleSlotLabel}).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Bandwidth Safe:</strong> Requires {selectedJob.hoursPerWeek} hrs/week ({selectedJob.dailyCommitment}).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Remote Verified:</strong> 100% asynchronous work with zero mandatory offline office hours.</span>
                  </div>
                </div>
              </div>

              {/* About the Role */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  About the Role
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Key Deliverables
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {selectedJob.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pre-Filled Tailored Application Note */}
              {!isJobApplied(selectedJob.id) && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <div className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Pre-filled Application Pitch Note</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">Editable</span>
                  </div>
                  <textarea
                    rows="3"
                    value={pitchNote}
                    onChange={(e) => setPitchNote(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    onClick={() => onApply(selectedJob, pitchNote)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    Submit Application & Track in Pipeline
                  </button>
                </div>
              )}

              {isJobApplied(selectedJob.id) && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center text-xs font-semibold text-blue-900">
                  ✓ Application logged into your Kanban Pipeline with a 5-day follow-up reminder.
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-xs font-bold text-slate-500">Select any role from the left to inspect details</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
