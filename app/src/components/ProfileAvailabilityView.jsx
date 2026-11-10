import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  Plus, 
  Check, 
  AlertCircle,
  Calendar,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { initialScheduleSlots } from '../data/mockData';

export default function ProfileAvailabilityView({
  maxHours,
  setMaxHours,
  remoteOnly,
  setRemoteOnly,
  onSave
}) {
  const [stipendRequired, setStipendRequired] = useState(false);
  const [weekendsOnly, setWeekendsOnly] = useState(false);

  const [skills, setSkills] = useState([
    "Figma",
    "Canva",
    "Social Media Marketing",
    "Copywriting",
    "Video Editing"
  ]);
  const [portfolioLink, setPortfolioLink] = useState("https://behance.net/tanmay-portfolio");
  const [newSkillInput, setNewSkillInput] = useState("");
  const [showAddSkill, setShowAddSkill] = useState(false);

  // Timetable
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [
    "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", 
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"
  ];

  const [schedule, setSchedule] = useState(initialScheduleSlots);

  const toggleSlot = (day, hour) => {
    const key = `${day}-${hour}`;
    setSchedule((prev) => {
      const current = prev[key];
      if (current?.blocked) {
        const next = { ...prev };
        delete next[key];
        return next;
      } else {
        return {
          ...prev,
          [key]: { blocked: true, label: "" }
        };
      }
    });
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput("");
      setShowAddSkill(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Title Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Screen 1: Candidate Constraints & Setup</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Availability & Career Preferences
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tell FlexHunter your limits so every match actually fits your life.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={() => onSave()}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave()}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-98"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Top 2-Column Section: Work Constraints & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Card: Work Constraints */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-5 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Work Constraints</h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Matches are filtered to fit these limits.</p>
          </div>

          {/* Weekly Hours Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Weekly hours</span>
              <span className="text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-md font-extrabold">
                {maxHours} hrs / week
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={maxHours}
              onChange={(e) => setMaxHours(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 font-semibold">
              <span>5 hrs</span>
              <span>30 hrs</span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Remote Only Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <span>Remote Only</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                    Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">Hide on-site and hybrid roles</div>
              </div>
              <button
                onClick={() => setRemoteOnly(!remoteOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  remoteOnly ? 'bg-blue-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>

            {/* Stipend Required */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Stipend Required</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">Skip unpaid opportunities</div>
              </div>
              <button
                onClick={() => setStipendRequired(!stipendRequired)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  stipendRequired ? 'bg-blue-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>

            {/* Weekends Only */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Weekends only</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">Only show weekend-friendly work</div>
              </div>
              <button
                onClick={() => setWeekendsOnly(!weekendsOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  weekendsOnly ? 'bg-blue-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Card: Skills & Portfolio */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Skills & Portfolio</h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Upload your resume and we'll pull out your skills automatically.</p>
          </div>

          {/* Upload Dropzone */}
          <div className="border border-dashed border-blue-200 dark:border-blue-900 rounded-xl p-4 text-center bg-blue-50/20 dark:bg-blue-900/10 space-y-1">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center mx-auto mb-1">
              <Upload className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Drop your resume here, or browse files</div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">PDF or DOCX · up to 5 MB</div>
          </div>

          {/* Uploaded File Pill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-900/20">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">resume_2026.pdf</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Parsed just now · 5 skills extracted</div>
              </div>
            </div>
            <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Replace
            </button>
          </div>

          {/* Parsed Skills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Parsed skills</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Click a pill to remove</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => removeSkill(s)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 flex items-center space-x-1"
                >
                  <span>{s}</span>
                  <X className="w-3 h-3 text-blue-400" />
                </button>
              ))}

              {showAddSkill ? (
                <form onSubmit={addSkill} className="inline-flex">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Skill..."
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    className="px-2 py-0.5 text-xs border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 rounded-full w-24 focus:outline-none"
                    onBlur={() => setShowAddSkill(false)}
                  />
                </form>
              ) : (
                <button
                  onClick={() => setShowAddSkill(true)}
                  className="px-2.5 py-1 rounded-full text-xs font-bold border border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add skill</span>
                </button>
              )}
            </div>
          </div>

          {/* Portfolio Link */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Portfolio / GitHub link</label>
            <input
              type="text"
              placeholder="https://github.com/yourname or your-portfolio.com"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

        </div>

      </div>

      {/* Bottom Section: College Schedule */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xs">
        
        {/* Header with Subtext and Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">College Schedule</h2>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Live Timetable
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Click or drag to block your lecture hours. FlexHunter only suggests work outside these slots.
            </p>
          </div>

          {/* Legend + Counter */}
          <div className="flex items-center space-x-4 text-xs font-semibold shrink-0">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800"></span>
              <span className="text-slate-700 dark:text-slate-300">Lecture (Blocked)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40"></span>
              <span className="text-emerald-800 dark:text-emerald-400 font-semibold">Available for Work</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-800 text-emerald-400 text-xs font-extrabold shadow-xs flex items-center space-x-1.5 border border-slate-800 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>68 free hrs / week</span>
            </span>
          </div>
        </div>

        {/* Timetable Matrix */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60">
                <th className="w-16 py-2 px-3 text-left font-bold text-slate-400 dark:text-slate-500 text-[11px]"></th>
                {days.map((day) => (
                  <th key={day} className="py-2.5 px-2 font-bold text-slate-700 dark:text-slate-300 text-xs">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour} className="border-b border-slate-100 dark:border-slate-800/80 last:border-b-0 h-9">
                  <td className="py-1 px-3 text-left font-semibold text-slate-400 dark:text-slate-500 text-[11px] whitespace-nowrap bg-slate-50/30 dark:bg-slate-800/30">
                    {hour}
                  </td>
                  {days.map((day) => {
                    const key = `${day}-${hour}`;
                    const slotInfo = schedule[key];
                    const isBlocked = slotInfo?.blocked;
                    return (
                      <td key={key} className="p-1">
                        <button
                          onClick={() => toggleSlot(day, hour)}
                          className={`w-full h-7 rounded text-[10px] font-bold transition-all flex items-center justify-center overflow-hidden truncate px-1 border ${
                            isBlocked
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60 shadow-2xs'
                              : 'bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700/60 dark:text-emerald-400/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40 hover:border-emerald-300'
                          }`}
                          title={`${day} ${hour}: ${isBlocked ? slotInfo?.label || 'College Lecture' : 'Available for Internship'}`}
                        >
                          {isBlocked ? slotInfo?.label || 'Class' : ''}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
