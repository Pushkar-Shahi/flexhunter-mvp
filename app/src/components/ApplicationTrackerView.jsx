import React, { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  GripVertical, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { initialApplications } from '../data/mockData';

export default function ApplicationTrackerView({
  applications,
  setApplications,
  onOpenExtensionForJob
}) {
  const [filterQuery, setFilterQuery] = useState("");

  const columns = [
    { id: 'saved', label: 'Saved' },
    { id: 'applied', label: 'Applied' },
    { id: 'interview', label: 'Screening / Interview' },
    { id: 'offers', label: 'Offers' },
    { id: 'rejected', label: 'Rejected / Ghosted' }
  ];

  const getPillStyle = (type) => {
    switch (type) {
      case 'dark':
        return 'bg-black text-white font-bold';
      case 'warning':
        return 'bg-slate-100 text-slate-800 border border-slate-300 font-bold';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  const getActionButtonText = (colId) => {
    switch (colId) {
      case 'saved':
        return 'Apply via Extension';
      case 'applied':
      case 'interview':
        return 'Draft Follow-Up Email';
      case 'offers':
        return 'Draft Reply Email';
      case 'rejected':
        return 'Draft Follow-Up Email';
      default:
        return 'Action';
    }
  };

  const moveNext = (appId, currentStatus) => {
    const sequence = ['saved', 'applied', 'interview', 'offers'];
    const currentIndex = sequence.indexOf(currentStatus);
    if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];
      setApplications(
        applications.map((a) => (a.id === appId ? { ...a, status: nextStatus } : a))
      );
    }
  };

  const removeCard = (appId) => {
    setApplications(applications.filter((a) => a.id !== appId));
  };

  const totalCount = applications.length;

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-150">
      
      {/* Header (Exact Match to Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Application Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {totalCount} applications · drag cards between stages to update status
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors">
            Filter
          </button>
          
          <div className="flex items-center space-x-1 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer">
            <span>Sort: Newest</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-black hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* 5-Column Kanban Board (Exact Match to Image 3) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colCards = applications.filter((a) => a.status === col.id);
          const count = colCards.length;

          return (
            <div 
              key={col.id} 
              className="bg-slate-50/60 rounded-2xl border border-slate-200 p-3 flex flex-col min-h-[560px]"
            >
              {/* Column Header: Saved 3 */}
              <div className="flex items-center justify-between pb-3 px-1 mb-2 border-b border-slate-200/60">
                <span className="text-xs font-bold text-slate-800">
                  {col.label}
                </span>
                <span className="w-5 h-5 rounded-full border border-slate-200 bg-white text-slate-600 text-[10px] font-extrabold flex items-center justify-center">
                  {count}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs space-y-3 hover:border-slate-300 transition-all relative group"
                  >
                    {/* Top Row: Company Name & Handle */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {card.company}
                        </h4>
                        <div className="text-[11px] font-semibold text-slate-600 mt-0.5">
                          {card.title}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {card.dateMeta}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => removeCard(card.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-rose-500 p-0.5 transition-opacity"
                          title="Remove card"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="text-slate-300 cursor-grab">
                          <GripVertical className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    {card.pill && (
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] ${getPillStyle(card.pillType)}`}>
                          {card.pill}
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-1 space-y-1.5">
                      <button
                        onClick={() => {
                          if (col.id === 'saved') {
                            onOpenExtensionForJob({
                              company: card.company,
                              title: card.title
                            });
                          } else {
                            moveNext(card.id, card.status);
                          }
                        }}
                        className="w-full py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-800 transition-colors shadow-2xs text-center block"
                      >
                        {getActionButtonText(col.id)}
                      </button>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
                        <span className="hover:text-slate-700 cursor-pointer">+ Add Note</span>
                        {col.id !== 'rejected' && col.id !== 'offers' && (
                          <button
                            onClick={() => moveNext(card.id, card.status)}
                            className="text-slate-500 hover:text-black font-semibold flex items-center space-x-0.5"
                            title="Advance to next stage"
                          >
                            <span>Move</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}

                {/* Empty Drop Zone for Interview column (matches Image 3) */}
                {col.id === 'interview' && (
                  <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                    Drop card here
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
