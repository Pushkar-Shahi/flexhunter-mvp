import React from 'react';
import { 
  Building2, 
  Trash2, 
  ChevronRight, 
  BellRing, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function KanbanBoard({ 
  applications, 
  onUpdateStatus, 
  onRemoveApplication,
  onGoToFeed 
}) {
  // Matching the exact 3 columns from Screen 4 of the Wireframe
  const columns = [
    { id: 'saved', title: 'Saved', color: 'border-slate-300 bg-slate-50/70' },
    { id: 'applied', title: 'Applied', color: 'border-blue-300 bg-blue-50/40' },
    { id: 'interview', title: 'Interview', color: 'border-purple-300 bg-purple-50/40' }
  ];

  const getNextStatus = (current) => {
    switch (current) {
      case 'saved': return 'applied';
      case 'applied': return 'interview';
      default: return null;
    }
  };

  const getNextStatusLabel = (current) => {
    switch (current) {
      case 'saved': return 'Mark Applied';
      case 'applied': return 'Move to Interview';
      default: return null;
    }
  };

  const hasAnyItems = applications && applications.length > 0;

  return (
    <div className="py-2">
      {/* Title Matching Screen 4: My Applications (Kanban) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-5 border-b border-slate-200 gap-3">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            My Applications (Kanban)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track your internship applications and follow-up deadlines in one place.
          </p>
        </div>

        <button
          onClick={onGoToFeed}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-all"
        >
          <span>+ Find Internships</span>
        </button>
      </div>

      {!hasAnyItems ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 mb-1">Your pipeline is currently empty</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Search flexible roles and save or apply to track them in your Kanban board.
          </p>
          <button
            onClick={onGoToFeed}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-sm"
          >
            Go to Search
          </button>
        </div>
      ) : (
        /* The 3 Columns from Screen 4 */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map((col) => {
            const colApps = applications.filter((a) => a.status === col.id);
            return (
              <div 
                key={col.id}
                className={`rounded-2xl border ${col.color} p-4 flex flex-col min-h-[480px] shadow-2xs`}
              >
                {/* Column Header: Saved (3) / Applied (5) / Interview (1) */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
                  <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    {col.title} ({colApps.length})
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    Stage {col.id === 'saved' ? '1' : col.id === 'applied' ? '2' : '3'}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.length === 0 ? (
                    <div className="h-32 border border-dashed border-slate-300/80 rounded-xl flex items-center justify-center text-center p-4">
                      <span className="text-xs text-slate-400 font-medium">No roles in this column</span>
                    </div>
                  ) : (
                    colApps.map((app) => {
                      const next = getNextStatus(app.status);
                      const nextLabel = getNextStatusLabel(app.status);
                      return (
                        <div
                          key={app.id}
                          className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start space-x-2.5">
                              {/* Logo square (matching wireframe thumbnail box) */}
                              <div className={`w-8 h-8 rounded-lg ${app.job.logoBg || 'bg-blue-600'} text-white font-extrabold text-xs flex items-center justify-center shrink-0`}>
                                {app.job.logoText || app.job.company[0]}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                                  {app.job.title}
                                </h4>
                                <span className="text-[11px] font-semibold text-slate-500 block">
                                  {app.job.company} · {app.job.isRemote ? 'Remote' : 'Offline'}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => onRemoveApplication(app.id)}
                              className="text-slate-300 hover:text-rose-500 p-1 transition-colors"
                              title="Delete card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center space-x-2 mt-2.5 mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                              {app.job.hoursPerWeek}h/wk
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-slate-500 bg-slate-100">
                              {app.job.stipend}
                            </span>
                          </div>

                          {/* Follow-up reminder indicator */}
                          {app.status === 'applied' && (
                            <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 my-2 text-[11px] text-amber-800 font-semibold">
                              <BellRing className="w-3 h-3 text-amber-600 shrink-0" />
                              <span>Follow-up in 5 days</span>
                            </div>
                          )}

                          {app.status === 'interview' && (
                            <div className="flex items-center space-x-1.5 bg-purple-50 border border-purple-200 rounded-lg px-2 py-1 my-2 text-[11px] text-purple-800 font-semibold">
                              <Calendar className="w-3 h-3 text-purple-600 shrink-0" />
                              <span>Interview task scheduled</span>
                            </div>
                          )}

                          {/* Next stage advancement */}
                          {next && (
                            <button
                              onClick={() => onUpdateStatus(app.id, next)}
                              className="w-full mt-2 flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[11px] font-bold text-slate-700 transition-colors"
                            >
                              <span>{nextLabel}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
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
