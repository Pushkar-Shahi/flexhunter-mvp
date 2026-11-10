import React, { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  GripVertical, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Mail,
  SlidersHorizontal,
  Clock,
  Sparkles
} from 'lucide-react';
import { initialApplications } from '../data/mockData';

export default function ApplicationTrackerView({
  applications,
  setApplications,
  onOpenExtensionForJob,
  onOpenDraftEmail
}) {
  const columns = [
    { 
      id: 'saved', 
      label: 'Saved', 
      headerBorder: 'border-slate-300 dark:border-slate-700', 
      colBg: 'bg-slate-50/50 dark:bg-slate-900/60',
      tagColor: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    },
    { 
      id: 'applied', 
      label: 'Applied', 
      headerBorder: 'border-blue-400 dark:border-blue-500', 
      colBg: 'bg-blue-50/20 dark:bg-blue-950/20',
      tagColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
    },
    { 
      id: 'interview', 
      label: 'Screening / Interview', 
      headerBorder: 'border-purple-400 dark:border-purple-500', 
      colBg: 'bg-purple-50/20 dark:bg-purple-950/20',
      tagColor: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'
    },
    { 
      id: 'offers', 
      label: 'Offers', 
      headerBorder: 'border-emerald-400 dark:border-emerald-500', 
      colBg: 'bg-emerald-50/20 dark:bg-emerald-950/20',
      tagColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
    },
    { 
      id: 'rejected', 
      label: 'Rejected / Ghosted', 
      headerBorder: 'border-slate-300 dark:border-slate-700', 
      colBg: 'bg-slate-50/40 dark:bg-slate-900/40',
      tagColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
    }
  ];

  const getPillStyle = (type, pillText) => {
    if (pillText.includes('due') || pillText.includes('reply') || pillText.includes('expires')) {
      return 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-extrabold shadow-2xs';
    }
    if (pillText.includes('Interview')) {
      return 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-extrabold';
    }
    if (pillText.includes('Weekend') || pillText.includes('done')) {
      return 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold';
    }
    return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold';
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Application Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {totalCount} applications · drag cards between stages to update status
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors">
            Filter
          </button>
          
          <div className="flex items-center space-x-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
            <span>Sort: Newest</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* 5-Column Kanban Board with Semantic Color Tinting */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colCards = applications.filter((a) => a.status === col.id);
          const count = colCards.length;

          return (
            <div 
              key={col.id} 
              className={`${col.colBg} rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-col min-h-[560px] shadow-2xs`}
            >
              {/* Column Header with Status Tinting */}
              <div className={`flex items-center justify-between pb-3 px-1 mb-2 border-b-2 ${col.headerBorder}`}>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {col.label}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${col.tagColor}`}>
                  {count}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80 p-3.5 shadow-2xs space-y-3 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all relative group"
                  >
                    {/* Top Row: Company Name & Handle */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                          {card.company}
                        </h4>
                        <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                          {card.title}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {card.dateMeta}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => removeCard(card.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 p-0.5 transition-opacity"
                          title="Remove card"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                        <div className="text-slate-300 dark:text-slate-600 cursor-grab">
                          <GripVertical className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    {/* Status Pill with High-Visibility Amber Alert */}
                    {card.pill && (
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] ${getPillStyle(card.pillType, card.pill)}`}>
                          {card.pill}
                        </span>
                      </div>
                    )}

                    {/* Action Button: Opens Email Draft Modal or Extension */}
                    <div className="pt-1 space-y-1.5">
                      <button
                        onClick={() => {
                          if (col.id === 'saved') {
                            onOpenExtensionForJob({
                              company: card.company,
                              title: card.title
                            });
                          } else {
                            onOpenDraftEmail(card);
                          }
                        }}
                        className="w-full py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-blue-400 text-[11px] font-bold text-slate-800 dark:text-slate-200 transition-all shadow-2xs text-center flex items-center justify-center space-x-1.5"
                      >
                        {col.id !== 'saved' && <Mail className="w-3 h-3 text-slate-400 dark:text-slate-500" />}
                        <span>{getActionButtonText(col.id)}</span>
                      </button>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-0.5">
                        <span className="hover:text-slate-700 dark:hover:text-slate-300 cursor-pointer">+ Add Note</span>
                        {col.id !== 'rejected' && col.id !== 'offers' && (
                          <button
                            onClick={() => moveNext(card.id, card.status)}
                            className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold flex items-center space-x-0.5"
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
                  <div className="border border-dashed border-purple-200 dark:border-purple-800/80 bg-purple-50/30 dark:bg-purple-950/20 rounded-xl p-4 text-center text-xs text-purple-600 dark:text-purple-400 font-medium">
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
