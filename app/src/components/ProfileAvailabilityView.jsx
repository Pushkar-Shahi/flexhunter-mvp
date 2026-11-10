import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  Plus, 
  Check, 
  AlertCircle 
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
  const [portfolioLink, setPortfolioLink] = useState("");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            My Availability & Career Preferences
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tell FlexHunter your limits so every match actually fits your life.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button 
            onClick={() => onSave()}
            className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave()}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs active:scale-98"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Top 2-Column Section: Work Constraints & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Card: Work Constraints */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Work Constraints</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Matches are filtered to fit these limits.</p>
          </div>

          {/* Weekly Hours Slider */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700">Weekly hours</span>
              <span className="text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md font-extrabold">
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
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
              <span>5 hrs</span>
              <span>30 hrs</span>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {/* Remote Only Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Remote Only</div>
                <div className="text-[11px] text-slate-400">Hide on-site and hybrid roles</div>
              </div>
              <button
                onClick={() => setRemoteOnly(!remoteOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  remoteOnly ? 'bg-slate-900 justify-end' : 'bg-slate-200 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>

            {/* Stipend Required */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Stipend Required</div>
                <div className="text-[11px] text-slate-400">Skip unpaid opportunities</div>
              </div>
              <button
                onClick={() => setStipendRequired(!stipendRequired)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  stipendRequired ? 'bg-slate-900 justify-end' : 'bg-slate-200 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>

            {/* Weekends Only */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Weekends only</div>
                <div className="text-[11px] text-slate-400">Only show weekend-friendly work</div>
              </div>
              <button
                onClick={() => setWeekendsOnly(!weekendsOnly)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  weekendsOnly ? 'bg-slate-900 justify-end' : 'bg-slate-200 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs"></div>
              </button>
            </div>
          </div>

        </div>

        {/* Right Card: Skills & Portfolio */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Skills & Portfolio</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Upload your resume and we'll pull out your skills automatically.</p>
          </div>

          {/* Upload Dropzone */}
          <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50/50 space-y-1">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-1">
              <Upload className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-bold text-slate-800">Drop your resume here, or browse files</div>
            <div className="text-[10px] text-slate-400">PDF or DOCX · up to 5 MB</div>
          </div>

          {/* Uploaded File Pill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">resume_2026.pdf</div>
                <div className="text-[10px] text-slate-400">Parsed just now · 5 skills found</div>
              </div>
            </div>
            <button className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline">
              Replace
            </button>
          </div>

          {/* Parsed Skills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Parsed skills</span>
              <span className="text-[10px] text-slate-400">Click a pill to remove</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <button
                  key={s}
                  onClick={() => removeSkill(s)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 flex items-center space-x-1"
                >
                  <span>{s}</span>
                  <X className="w-3 h-3 text-slate-400" />
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
                    className="px-2 py-0.5 text-xs border border-slate-300 rounded-full w-24 focus:outline-none"
                    onBlur={() => setShowAddSkill(false)}
                  />
                </form>
              ) : (
                <button
                  onClick={() => setShowAddSkill(true)}
                  className="px-2.5 py-1 rounded-full text-xs font-bold border border-dashed border-slate-300 text-slate-600 hover:bg-slate-100 flex items-center space-x-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add skill</span>
                </button>
              )}
            </div>
          </div>

          {/* Portfolio Link */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-bold text-slate-800 block">Portfolio / GitHub link</label>
            <input
              type="text"
              placeholder="https://github.com/yourname or your-portfolio.com"
              value={portfolioLink}
              onChange={(e) => setPortfolioLink(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder:text-slate-400"
            />
          </div>

        </div>

      </div>

      {/* Bottom Section: College Schedule (Exact Matrix from Image 1) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        
        {/* Header with Subtext and Legend */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">College Schedule</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click or drag to block your lecture hours. FlexHunter only suggests work outside these slots.
            </p>
          </div>

          {/* Legend + Counter */}
          <div className="flex items-center space-x-4 text-xs font-semibold shrink-0">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-slate-300"></span>
              <span className="text-slate-600">Lecture</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded border border-slate-300 bg-white"></span>
              <span className="text-slate-600">Free</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-black text-white text-xs font-bold">
              68 free hrs / week
            </span>
          </div>
        </div>

        {/* Timetable Matrix */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="w-16 py-2 px-3 text-left font-bold text-slate-400 text-[11px]"></th>
                {days.map((day) => (
                  <th key={day} className="py-2.5 px-2 font-bold text-slate-700 text-xs">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour} className="border-b border-slate-100 last:border-b-0 h-9">
                  <td className="py-1 px-3 text-left font-semibold text-slate-400 text-[11px] whitespace-nowrap bg-slate-50/20">
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
                              ? 'bg-slate-300 text-slate-800 border-slate-400'
                              : 'bg-white hover:bg-slate-50 text-transparent border-slate-200'
                          }`}
                          title={`${day} ${hour}: ${isBlocked ? slotInfo?.label || 'Lecture' : 'Free'}`}
                        >
                          {isBlocked ? slotInfo?.label || '' : ''}
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
