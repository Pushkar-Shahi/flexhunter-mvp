import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Bookmark,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function JobDetailModal({ 
  job, 
  onClose, 
  onApply, 
  isApplied, 
  isSaved, 
  onToggleSave,
  userSchedule,
  maxHours
}) {
  if (!job) return null;

  const [customNote, setCustomNote] = useState(
    `Hello ${job.company} Team,\n\nI am a college student targeting practical experience in ${job.tags[0] || 'marketing'}. My lectures conclude by 1:00 PM, leaving my afternoons and evenings fully dedicated to your ${job.hoursPerWeek} hrs/week requirement.\n\nLooking forward to contributing!`
  );
  const [submitting, setSubmitting] = useState(false);

  const handleApplyClick = () => {
    setSubmitting(true);
    setTimeout(() => {
      onApply(job, customNote);
      setSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{job.company}</span>
              <span className="text-slate-300">•</span>
              <span>{job.postedDate}</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">{job.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Key Metric Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 font-semibold block">Commitment</span>
              <span className="text-sm font-bold text-slate-900">{job.hoursPerWeek} hrs/week</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 font-semibold block">Work Mode</span>
              <span className="text-sm font-bold text-slate-900">{job.isRemote ? '100% Remote' : 'Offline'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-[11px] text-slate-500 font-semibold block">Stipend</span>
              <span className="text-sm font-bold text-emerald-700">{job.stipend}</span>
            </div>
          </div>

          {/* Schedule Verification Callout (Core Value Prop) */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>College Schedule Compatibility Verified</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {job.scheduleFitReason} Daily expectation is <strong>{job.dailyCommitment}</strong> during <strong>{job.scheduleSlotLabel}</strong>.
            </p>
          </div>

          {/* About the Role */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Role Overview</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Responsibilities</h4>
            <ul className="space-y-1.5 text-sm text-slate-700">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tailored Application Note Generator */}
          {!isApplied && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tailored Pitch Note (Pre-filled for your schedule)</span>
                </div>
                <span className="text-[10px] text-slate-400">Customizable</span>
              </div>
              <textarea
                rows="4"
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          )}

          {isApplied && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
              <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-blue-900">Application Submitted!</h4>
              <p className="text-xs text-blue-700 mt-1">
                This role is now tracked in your pipeline with a 5-day follow-up reminder.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onToggleSave(job)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
              isSaved
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
            <span>{isSaved ? 'Saved in Pipeline' : 'Save for Later'}</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            {!isApplied && (
              <button
                disabled={submitting}
                onClick={handleApplyClick}
                className="flex items-center space-x-2 px-5 py-2 rounded-lg text-xs font-extrabold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Apply & Track in Pipeline'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
