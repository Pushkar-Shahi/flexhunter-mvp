import React from 'react';
import { 
  Building2, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Trash2, 
  Calendar, 
  BellRing,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function KanbanBoard({ 
  applications, 
  onUpdateStatus, 
  onRemoveApplication,
  onGoToFeed 
}) {
  const columns = [
    { id: 'saved', title: 'Saved for Later', color: 'border-slate-300 bg-slate-50' },
    { id: 'applied', title: 'Applied', color: 'border-blue-300 bg-blue-50/40' },
    { id: 'interviewing', title: 'Interviewing', color: 'border-purple-300 bg-purple-50/40' },
    { id: 'offer', title: 'Offers Received', color: 'border-emerald-300 bg-emerald-50/40' }
  ];

  const getNextStatus = (current) => {
    switch(current) {
      case 'saved': return 'applied';
      case 'applied': return 'interviewing';
      case 'interviewing': return 'offer';
      default: return null;
    }
  };

  const getNextStatusLabel = (current) => {
    switch(current) {
      case 'saved': return 'Mark Applied';
      case 'applied': return 'Move to Interview';
      case 'interviewing': return 'Mark as Offer';
      default: return null;
    }
  };

  const hasAnyItems = applications && applications.length > 0;

  return (
    <div className="py-2">
      {/* Overview Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Application Pipeline (CRM)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your internship applications and stay ahead of recruiter ghosting with automated follow-up reminders.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-slate-500">Total Tracked: </span>
            <strong className="text-slate-900 font-bold">{applications.length}</strong>
          </div>
          <button
            onClick={onGoToFeed}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          >
            <span>+ Find More Roles</span>
          </button>
        </div>
      </div>

      {!hasAnyItems ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Your pipeline is currently empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Browse verified part-time and remote roles in the Explore tab. Save or apply to a role to track it here.
          </p>
          <button
            onClick={onGoToFeed}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
          >
            Explore Matching Internships
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colApps = applications.filter((a) => a.status === col.id);
            return (
              <div 
                key={col.id} 
                className={`rounded-xl border ${col.color} p-4 flex flex-col min-h-[450px] shadow-2xs`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {col.title}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {colApps.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.length === 0 ? (
                    <div className="h-28 border border-dashed border-slate-300/80 rounded-lg flex items-center justify-center text-center p-3">
                      <span className="text-[11px] text-slate-400">No applications in this stage</span>
                    </div>
                  ) : (
                    colApps.map((app) => {
                      const next = getNextStatus(app.status);
                      const nextLabel = getNextStatusLabel(app.status);
                      return (
                        <div
                          key={app.id}
                          className="bg-white rounded-lg border border-slate-200 p-3.5 shadow-2xs hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-bold text-slate-400 block uppercase">
                                {app.job.company}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                {app.job.title}
                              </h4>
                            </div>

                            <button
                              onClick={() => onRemoveApplication(app.id)}
                              className="text-slate-300 hover:text-rose-500 p-1"
                              title="Delete card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5 my-2.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              {app.job.hoursPerWeek} hrs/wk
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {app.job.isRemote ? 'Remote' : 'Offline'}
                            </span>
                          </div>

                          {/* Follow-up reminder indicator (Directly answers Tanmay's ghosting pain point) */}
                          {app.status === 'applied' && (
                            <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 rounded px-2 py-1 my-2 text-[11px] text-amber-800 font-medium">
                              <BellRing className="w-3 h-3 text-amber-600 flex-shrink-0" />
                              <span>Follow-up in 5 days</span>
                            </div>
                          )}

                          {app.status === 'interviewing' && (
                            <div className="flex items-center space-x-1.5 bg-purple-50 border border-purple-200/80 rounded px-2 py-1 my-2 text-[11px] text-purple-800 font-medium">
                              <Calendar className="w-3 h-3 text-purple-600 flex-shrink-0" />
                              <span>Prep interview task</span>
                            </div>
                          )}

                          {/* Move to next stage button */}
                          {next && (
                            <button
                              onClick={() => onUpdateStatus(app.id, next)}
                              className="w-full mt-2 flex items-center justify-center space-x-1 py-1 px-2 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition-colors"
                            >
                              <span>{nextLabel}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
