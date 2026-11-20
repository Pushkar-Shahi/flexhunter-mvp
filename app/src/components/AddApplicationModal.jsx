import React, { useState } from 'react';
import { X, Plus, Building2, Briefcase, Clock, IndianRupee, AlertCircle, Link as LinkIcon, Calendar } from 'lucide-react';

export default function AddApplicationModal({ isOpen, onClose, onAddApplication }) {
  if (!isOpen) return null;

  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('applied');
  const [hours, setHours] = useState('15');
  const [stipend, setStipend] = useState('₹10,000 / month');
  const [pill, setPill] = useState('Follow-up due in 5 days');
  const [pillType, setPillType] = useState('dark');
  const [jobLink, setJobLink] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !title.trim()) return;

    const newApp = {
      id: `app-custom-${Date.now()}`,
      company: company.trim(),
      title: title.trim(),
      dateMeta: 'Added today',
      status,
      hoursRange: `${hours} hrs/wk`,
      stipend: stipend.trim(),
      pill: pill.trim(),
      pillType,
      jobLink: jobLink.trim(),
      notes: notes.trim() ? [notes.trim()] : []
    };

    onAddApplication(newApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Add New Application
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Log a student internship or freelance contract to your CRM
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>Company Name *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Swiggy, Zerodha, Vercel"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <Briefcase className="w-3 h-3 text-slate-400" />
                <span>Role / Title *</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. UI/UX Intern, Growth Associate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Stage</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-semibold cursor-pointer"
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Screening / Interview</option>
                <option value="offers">Offers</option>
                <option value="rejected">Rejected / Ghosted</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Hours / Week</span>
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                <IndianRupee className="w-3 h-3 text-slate-400" />
                <span>Stipend</span>
              </label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Next Action / Follow-Up Tag</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Follow-up due in 3 days, Interview Tuesday 2 PM"
                value={pill}
                onChange={(e) => setPill(e.target.value)}
                className="flex-1 text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-medium"
              />
              <select
                value={pillType}
                onChange={(e) => setPillType(e.target.value)}
                className="text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-semibold cursor-pointer"
              >
                <option value="dark">Due / Urgent</option>
                <option value="neutral">Neutral / Info</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
              <LinkIcon className="w-3 h-3 text-slate-400" />
              <span>Job Posting URL (Optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://internshala.com/internship/..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-medium placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Initial Notes (Optional)</label>
            <textarea
              rows="3"
              placeholder="e.g. Referral from senior; submitted custom Canva portfolio sample."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none font-medium leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              Create Application
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
