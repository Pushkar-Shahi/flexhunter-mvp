import React from 'react';
import { 
  Building2, 
  Bookmark, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  ShieldCheck
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
  const matchesSlot = 
    job.scheduleSlot === userSchedule || 
    job.scheduleSlot === 'flexible';
  
  const exceedsHours = job.hoursPerWeek > maxHours;
  const isPerfectMatch = matchesSlot && !exceedsHours && job.isRemote;

  return (
    <div 
      onClick={() => onSelectJob(job)}
      className="bg-white rounded-2xl border border-slate-200 p-4.5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top: Thumbnail, Title, Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            {/* Logo box */}
            <div className={`w-11 h-11 rounded-xl ${job.logoBg || 'bg-blue-600'} text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0`}>
              {job.logoText || job.company[0]}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {job.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {job.company} · <span className="font-semibold text-slate-700">{job.isRemote ? 'Remote' : job.location}</span> • {job.employmentType}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job);
            }}
            className={`p-2 rounded-xl border transition-colors shrink-0 ${
              isSaved
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
            title={isSaved ? "Saved to Pipeline" : "Save to Pipeline"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
          </button>
        </div>

        {/* Schedule Compatibility Highlight (Matching Screen 2 of Wireframe) */}
        <div className="mt-3.5 mb-2.5">
          {isPerfectMatch ? (
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl px-3 py-2 flex items-center space-x-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Schedule Compatibility: Fits Afternoon Classes ✓</span>
            </div>
          ) : exceedsHours ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center space-x-2 text-xs font-semibold text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Bandwidth Alert: Exceeds your {maxHours}h limit ({job.hoursPerWeek}h/wk)</span>
            </div>
          ) : !job.isRemote ? (
            <div className="bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 flex items-center space-x-2 text-xs font-semibold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Offline Warning: Clashes with college attendance</span>
            </div>
          ) : (
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 flex items-center space-x-2 text-xs font-semibold text-slate-700">
              <Clock className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Schedule: {job.scheduleSlotLabel}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 my-2">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            {job.hoursPerWeek} hrs/week
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            {job.stipend}
          </span>
          {job.tags.slice(0, 2).map((t, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Bottom CTA */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
        <span className="text-[11px] text-slate-400 font-medium">
          {job.postedDate}
        </span>
        <span className="text-xs font-bold text-blue-600 flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
          <span>{isApplied ? 'Applied ✓' : 'View Details'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
