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
  Sparkles,
  StickyNote,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import AddApplicationModal from './AddApplicationModal';
import AddNoteModal from './AddNoteModal';

export default function ApplicationTrackerView({
  applications,
  setApplications,
  onOpenExtensionForJob,
  onOpenDraftEmail
}) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [noteAppTarget, setNoteAppTarget] = useState(null);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'due' | 'active'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'company' | 'urgency'
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

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

  const getPillStyle = (type, pillText = '') => {
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
      moveCardToStatus(appId, nextStatus);
    }
  };

  const moveCardToStatus = (appId, newStatus) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );
  };

  const removeCard = (appId) => {
    setApplications(applications.filter((a) => a.id !== appId));
  };

  const handleAddApplication = (newApp) => {
    setApplications([newApp, ...applications]);
  };

  const handleSaveNotes = (appId, notesList) => {
    setApplications(
      applications.map((a) => (a.id === appId ? { ...a, notes: notesList } : a))
    );
  };

  // Drag and Drop handlers
  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCardId(cardId);
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDrop = (e, targetColId) => {
    e.preventDefault();
    setDragOverCol(null);
    const cardId = e.dataTransfer.getData('text/plain') || draggedCardId;
    if (cardId) {
      moveCardToStatus(cardId, targetColId);
    }
    setDraggedCardId(null);
  };

  // Filter & Sort Pipeline
  let processedApps = [...applications];

  if (filterMode === 'due') {
    processedApps = processedApps.filter(
      (a) => a.pill && (a.pill.includes('due') || a.pill.includes('reply') || a.pill.includes('expires'))
    );
  } else if (filterMode === 'active') {
    processedApps = processedApps.filter(
      (a) => a.status === 'applied' || a.status === 'interview'
    );
  }

  if (sortBy === 'company') {
    processedApps.sort((a, b) => a.company.localeCompare(b.company));
  } else if (sortBy === 'urgency') {
    processedApps.sort((a, b) => {
      const aUrgent = a.pill && a.pill.includes('due') ? 1 : 0;
      const bUrgent = b.pill && b.pill.includes('due') ? 1 : 0;
      return bUrgent - aUrgent;
    });
  }

  const totalCount = applications.length;

  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-150">
      
      {/* Header */}
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
        <div className="flex items-center space-x-2 shrink-0 relative">
          
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowFilterMenu(!showFilterMenu);
                setShowSortMenu(false);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                filterMode !== 'all'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter{filterMode !== 'all' ? `: ${filterMode}` : ''}</span>
            </button>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1.5 z-30 space-y-0.5">
                <button
                  onClick={() => { setFilterMode('all'); setShowFilterMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${filterMode === 'all' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  All Applications
                </button>
                <button
                  onClick={() => { setFilterMode('due'); setShowFilterMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${filterMode === 'due' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Urgent / Follow-Ups Due
                </button>
                <button
                  onClick={() => { setFilterMode('active'); setShowFilterMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${filterMode === 'active' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Active Pipelines (Applied/Interview)
                </button>
              </div>
            )}
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowFilterMenu(false);
              }}
              className="flex items-center space-x-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'company' ? 'Company' : 'Urgency'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1.5 z-30 space-y-0.5">
                <button
                  onClick={() => { setSortBy('newest'); setShowSortMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-semibold ${sortBy === 'newest' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Newest First
                </button>
                <button
                  onClick={() => { setSortBy('company'); setShowSortMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-semibold ${sortBy === 'company' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Company (A - Z)
                </button>
                <button
                  onClick={() => { setSortBy('urgency'); setShowSortMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg font-semibold ${sortBy === 'urgency' ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                >
                  Urgency / Follow-Up
                </button>
              </div>
            )}
          </div>

          {/* Add Application Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* 5-Column Kanban Board with Semantic Color Tinting & HTML5 Drag/Drop */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colCards = processedApps.filter((a) => a.status === col.id);
          const count = colCards.length;
          const isOverThisCol = dragOverCol === col.id;

          return (
            <div 
              key={col.id} 
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`${col.colBg} rounded-2xl border ${isOverThisCol ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/30 dark:bg-blue-950/40' : 'border-slate-200 dark:border-slate-800'} p-3 flex flex-col min-h-[560px] shadow-2xs transition-all`}
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
              <div className="space-y-3 flex-1 overflow-y-auto min-h-[120px]">
                {colCards.map((card) => (
                  <div
                    key={card.id}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, card.id)}
                    onDragEnd={() => { setDraggedCardId(null); setDragOverCol(null); }}
                    className={`bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80 p-3.5 shadow-2xs space-y-3 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative group cursor-grab active:cursor-grabbing ${draggedCardId === card.id ? 'opacity-40 scale-98' : ''}`}
                  >
                    {/* Top Row: Company Name & Controls */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                          {card.company}
                        </h4>
                        <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                          {card.title}
                        </div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center space-x-2">
                          <span>{card.dateMeta}</span>
                          {card.stipend && <span>· {card.stipend}</span>}
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
                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] ${getPillStyle(card.pillType, card.pill)}`}>
                          {card.pill}
                        </span>
                        
                        {/* Quick Stage Selector */}
                        <select
                          value={card.status}
                          onChange={(e) => moveCardToStatus(card.id, e.target.value)}
                          className="text-[10px] font-bold bg-slate-50 dark:bg-slate-700 text-slate-500 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-md px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:outline-none"
                          title="Move to any stage"
                        >
                          <option value="saved">Saved</option>
                          <option value="applied">Applied</option>
                          <option value="interview">Interview</option>
                          <option value="offers">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    )}

                    {/* Notes Badge if present */}
                    {card.notes && card.notes.length > 0 && (
                      <div 
                        onClick={() => setNoteAppTarget(card)}
                        className="p-1.5 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-[10px] text-amber-800 dark:text-amber-300 cursor-pointer flex items-center space-x-1.5 hover:border-amber-300 transition-colors"
                      >
                        <StickyNote className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="truncate">{card.notes[card.notes.length - 1]}</span>
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
                        <button
                          type="button"
                          onClick={() => setNoteAppTarget(card)}
                          className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold cursor-pointer flex items-center space-x-1"
                        >
                          <StickyNote className="w-2.5 h-2.5" />
                          <span>{card.notes?.length ? `Notes (${card.notes.length})` : '+ Add Note'}</span>
                        </button>

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

                {/* Empty Drop Zone for Interview column or any column during drag */}
                {(col.id === 'interview' || isOverThisCol) && colCards.length === 0 && (
                  <div className="border border-dashed border-purple-200 dark:border-purple-800/80 bg-purple-50/30 dark:bg-purple-950/20 rounded-xl p-4 text-center text-xs text-purple-600 dark:text-purple-400 font-medium">
                    Drop card here
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Application Modal */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddApplication={handleAddApplication}
      />

      {/* Add Note Modal */}
      {noteAppTarget && (
        <AddNoteModal
          application={noteAppTarget}
          onClose={() => setNoteAppTarget(null)}
          onSaveNotes={handleSaveNotes}
        />
      )}

    </div>
  );
}
