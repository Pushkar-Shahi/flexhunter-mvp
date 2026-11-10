import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Bookmark, 
  ArrowRight,
  DollarSign
} from 'lucide-react';

export default function JobCard({ 
  job, 
  userSchedule, 
  maxHours, 
  onSelectJob, 
  isSaved, 
  isApplied, 
  onToggleSave 
}) {
  // Determine schedule match status
  const matchesSlot = 
    job.scheduleSlot === userSchedule || 
    job.scheduleSlot === 'flexible';
  
  const exceedsHours = job.hoursPerWeek > maxHours;
  
  const isPerfectMatch = matchesSlot && !exceedsHours && job.isRemote;

  return (
    <div className={`bg-white rounded-xl border p-5 transition-all shadow-sm hover:shadow-md ${
      isPerfectMatch 
        ? 'border-emerald-200 hover:border-emerald-400' 
        : exceedsHours 
          ? 'border-amber-200 hover:border-amber-400' 
          : 'border-slate-200 hover:border-blue-300'
    }`}>
      {/* Top Header: Company, Title, Save Button */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>{job.company}</span>
            <span className="text-slate-300">•</span>
            <span>{job.postedDate}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {job.title}
          </h3>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(job);
          }}
          className={`p-2 rounded-lg border transition-all ${
            isSaved
              ? 'bg-blue-50 text-blue-600 border-blue-200'
              : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100'
          }`}
          title={isSaved ? "Saved to Pipeline" : "Save to Pipeline"}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
        </button>
      </div>

      {/* Upfront Decision Badges (Feature 3: Must-Have) */}
      <div className="flex flex-wrap items-center gap-2 my-3">
        {/* Remote pill */}
        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
          job.isRemote 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-rose-50 text-rose-700 border border-rose-200'
        }`}>
          <MapPin className="w-3 h-3" />
          <span>{job.isRemote ? '100% Remote' : job.location}</span>
        </span>

        {/* Hours / Week pill */}
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Clock className="w-3 h-3" />
          <span>{job.hoursPerWeek} hrs/week ({job.dailyCommitment})</span>
        </span>

        {/* Stipend pill */}
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          <span>{job.stipend}</span>
        </span>
      </div>

      {/* College Schedule Match Badge (Feature 2) */}
      <div className="my-3">
        {isPerfectMatch ? (
          <div className="flex items-center space-x-2 bg-emerald-50/70 border border-emerald-200/80 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>✓ Fits your class schedule ({job.scheduleSlotLabel})</span>
          </div>
        ) : exceedsHours ? (
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>⚠ Exceeds your max bandwidth ({job.hoursPerWeek}h vs your {maxHours}h limit)</span>
          </div>
        ) : !job.isRemote ? (
          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>⚠ Offline attendance conflicts with college</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700">
            <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <span>Requires {job.scheduleSlotLabel} commitment</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 my-3">
        {job.tags.map((tag, i) => (
          <span key={i} className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3">
        <span className="text-xs text-slate-500 font-medium">
          {job.scheduleFitReason.slice(0, 48)}...
        </span>

        <button
          onClick={() => onSelectJob(job)}
          className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            isApplied
              ? 'bg-slate-100 text-slate-600 cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
          }`}
        >
          <span>{isApplied ? 'Applied ✓' : 'Inspect & Apply'}</span>
          {!isApplied && <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
