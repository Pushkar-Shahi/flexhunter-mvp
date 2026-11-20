import React, { useState } from 'react';
import { X, Plus, Trash2, StickyNote, Calendar, Building2 } from 'lucide-react';

export default function AddNoteModal({ application, onClose, onSaveNotes }) {
  if (!application) return null;

  const [notesList, setNotesList] = useState(
    Array.isArray(application.notes) ? [...application.notes] : application.notes ? [application.notes] : []
  );
  const [newNote, setNewNote] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const updated = [...notesList, newNote.trim()];
    setNotesList(updated);
    setNewNote('');
    onSaveNotes(application.id, updated);
  };

  const handleRemoveNote = (index) => {
    const updated = notesList.filter((_, i) => i !== index);
    setNotesList(updated);
    onSaveNotes(application.id, updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <StickyNote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Application Notes
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {application.company} · {application.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {/* Notes list */}
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {notesList.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                <StickyNote className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto mb-1" />
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">No notes added yet.</p>
                <p className="text-[10px] text-slate-400">Track interview dates, interview feedback, or follow-ups.</p>
              </div>
            ) : (
              notesList.map((note, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 group"
                >
                  <span className="flex-1 whitespace-pre-wrap leading-relaxed">{note}</span>
                  <button
                    onClick={() => handleRemoveNote(idx)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 transition-opacity shrink-0 ml-2"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add new note form */}
          <form onSubmit={handleAddNote} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <textarea
              rows="3"
              placeholder="Write a new note (e.g. 'Intro call on Google Meet with design lead on Thursday 4 PM')..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium leading-relaxed"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Auto-saved to your local board</span>
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
