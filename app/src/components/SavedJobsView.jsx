import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Send, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Compass,
  ArrowRight
} from 'lucide-react';

export default function SavedJobsView({
  savedApplications,
  onApplyViaExtension,
  onRemoveFromSaved,
  onGoToFeed
}) {
  const hasSaved = savedApplications && savedApplications.length > 0;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4 fill-blue-600 dark:fill-blue-400" />
            <span>Saved Collections</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {savedApplications.length} opportunities bookmarked for later review or application.
          </p>
        </div>

        <button
          onClick={onGoToFeed}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore More Roles</span>
        </button>
      </div>

      {!hasSaved ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center my-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">No saved jobs yet</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
            When you browse the Match Feed, click "Save to Board" on any role to collect them here.
          </p>
          <button
            onClick={onGoToFeed}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            Go to Match Feed
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs hover:shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top: Company and Delete Button */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                      {app.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {app.company}
                    </p>
                  </div>

                  <button
                    onClick={() => onRemoveFromSaved(app.id)}
                    className="p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Pill */}
                {app.pill && (
                  <div className="mt-2.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {app.pill}
                    </span>
                  </div>
                )}

                {/* Compatibility Snippet */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>College Compatible: 100% Remote & Part-Time</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                  {app.dateMeta}
                </span>

                <button
                  onClick={() => onApplyViaExtension({ title: app.title, company: app.company })}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs"
                >
                  <span>Apply via Extension</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
