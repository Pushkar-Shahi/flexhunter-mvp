import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Bookmark, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Send,
  Building2,
  Sparkles
} from 'lucide-react';

export default function JobDetailModal({ 
  job, 
  onClose, 
  onApply, 
  isApplied, 
  isSaved, 
  onToggleSave 
}) {
  if (!job) return null;

  const [customNote, setCustomNote] = useState(
    `Hi ${job.company} Team,\n\nI am a college student specializing in ${job.category}. My morning lectures finish by 1:00 PM, meaning my afternoons are completely dedicated to this ${job.hoursPerWeek} hrs/week role.\n\nLooking forward to speaking with you!`
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header Matching Screen 3 of Wireframe: [< Back] [Job Detail] [Bookmark] */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
          <button
            onClick={onClose}
            className="flex items-center space-x-1 text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors p-1 -ml-1 rounded-lg"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Search</span>
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Job Detail
          </span>

          <button
            onClick={() => onToggleSave(job)}
            className={`p-2 rounded-xl border transition-colors ${
              isSaved
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'text-slate-400 border-slate-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
            title={isSaved ? "Saved in Pipeline" : "Save to Pipeline"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          
          {/* Header Info (Matching Screen 3) */}
          <div className="flex items-start space-x-3.5">
            <div className={`w-14 h-14 rounded-2xl ${job.logoBg || 'bg-blue-600'} text-white font-extrabold text-xl flex items-center justify-center shadow-sm shrink-0`}>
              {job.logoText || job.company[0]}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
                {job.title}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                {job.company} · <span className="text-slate-900 font-bold">{job.isRemote ? 'Remote' : job.location}</span> • {job.employmentType}
              </p>
            </div>
          </div>

          {/* Schedule Compatibility Highlight (Exact Box from Wireframe Screen 3) */}
          <div className="bg-emerald-50 border-2 border-emerald-300/80 rounded-2xl p-4 shadow-2xs">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Schedule Compatibility: Fits Afternoon Classes [✓]</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              {job.scheduleFitReason}
            </p>
            <div className="flex items-center space-x-4 mt-3 pt-2.5 border-t border-emerald-200/60 text-xs text-emerald-900">
              <div>
                <span className="text-emerald-700 font-normal">Bandwidth: </span>
                <strong>{job.hoursPerWeek} hrs/week</strong>
              </div>
              <div>
                <span className="text-emerald-700 font-normal">Daily Commitment: </span>
                <strong>{job.dailyCommitment}</strong>
              </div>
            </div>
          </div>

          {/* About the Role */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              About the Role
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Responsibilities
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tailored Pitch Note */}
          {!isApplied && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Pre-filled Application Pitch Note</span>
              </div>
              <textarea
                rows="3"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          )}

          {isApplied && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center text-xs text-blue-900 font-semibold">
              ✓ Application logged in your Kanban Tracker under "Applied".
            </div>
          )}

        </div>

        {/* Bottom Action CTA */}
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs">
            <span className="text-slate-400 font-semibold block">Monthly Stipend</span>
            <span className="text-base font-extrabold text-slate-900">{job.stipend}</span>
          </div>

          <button
            onClick={() => {
              if (!isApplied) {
                onApply(job, customNote);
              }
            }}
            disabled={isApplied}
            className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all ${
              isApplied
                ? 'bg-slate-200 text-slate-500 cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25 active:scale-98'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isApplied ? 'Already Applied' : 'Apply Now'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
