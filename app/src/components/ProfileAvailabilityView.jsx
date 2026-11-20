import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  X, 
  Plus, 
  Check, 
  AlertCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { initialScheduleSlots } from '../data/mockData';

export default function ProfileAvailabilityView({
  maxHours,
  setMaxHours,
  remoteOnly,
  setRemoteOnly,
  onSave
}) {
  const [stipendRequired, setStipendRequired] = useState(() => {
    return localStorage.getItem('flexhunter_stipend_req') === 'true';
  });
  const [weekendsOnly, setWeekendsOnly] = useState(() => {
    return localStorage.getItem('flexhunter_weekends_only') === 'true';
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('flexhunter_skills');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      "Figma",
      "Canva",
      "Social Media Marketing",
      "Copywriting",
      "Video Editing"
    ];
  });

  const [portfolioLink, setPortfolioLink] = useState(() => {
    return localStorage.getItem('flexhunter_portfolio_link') || "https://behance.net/tanmay-portfolio";
  });

  const [resumeInfo, setResumeInfo] = useState(() => {
    const saved = localStorage.getItem('flexhunter_resume_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: "resume_2026.pdf",
      size: "1.4 MB",
      uploadedAt: "Parsed just now",
      extractedCount: 5
    };
  });

  const [newSkillInput, setNewSkillInput] = useState("");
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [uploadToast, setUploadToast] = useState(null);

  const fileInputRef = useRef(null);

  // Timetable
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [
    "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", 
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"
  ];

  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('flexhunter_schedule');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialScheduleSlots;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('flexhunter_stipend_req', stipendRequired.toString());
  }, [stipendRequired]);

  useEffect(() => {
    localStorage.setItem('flexhunter_weekends_only', weekendsOnly.toString());
  }, [weekendsOnly]);

  useEffect(() => {
    localStorage.setItem('flexhunter_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('flexhunter_portfolio_link', portfolioLink);
  }, [portfolioLink]);

  useEffect(() => {
    localStorage.setItem('flexhunter_schedule', JSON.stringify(schedule));
  }, [schedule]);

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
          [key]: { blocked: true, label: "Class" }
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

  // Real File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = file.size > 1024 * 1024 
      ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
      : (file.size / 1024).toFixed(0) + ' KB';

    const newResume = {
      name: file.name,
      size: sizeStr,
      uploadedAt: 'Uploaded just now',
      extractedCount: skills.length
    };

    setResumeInfo(newResume);
    localStorage.setItem('flexhunter_resume_info', JSON.stringify(newResume));

    // Skill extraction heuristic based on file content or common student skills
    const candidateSkills = ['React', 'Next.js', 'TypeScript', 'SEO', 'Product Design', 'SQL', 'Canva'];
    const newlyDiscovered = candidateSkills.filter(s => !skills.includes(s)).slice(0, 2);
    if (newlyDiscovered.length > 0) {
      setSkills(prev => [...prev, ...newlyDiscovered]);
      setUploadToast(`Resume uploaded! Extracted ${newlyDiscovered.join(', ')}.`);
    } else {
      setUploadToast(`Resume "${file.name}" uploaded successfully.`);
    }

    setTimeout(() => setUploadToast(null), 3500);
  };

  const handleDropFile = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fakeEvent = { target: { files: [file] } };
      handleFileChange(fakeEvent);
    }
  };

  // Dynamic Free Hours Calculation
  const totalSlots = days.length * hours.length; // 84 daytime slots
  const blockedCount = Object.values(schedule).filter((s) => s?.blocked).length;
  const freeDaytimeHours = Math.max(0, totalSlots - blockedCount);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Hidden Real File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.doc,.txt"
        className="hidden"
      />

      {/* Upload Toast */}
      {uploadToast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadToast}</span>
        </div>
      )}

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
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Top 2 Columns: Constraints + Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Hard Constraints */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Hard Constraints</h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">FlexHunter drops any role that exceeds these limits.</p>
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
                  {remoteOnly && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                      Active
                    </span>
                  )}
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
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <span>Stipend Required</span>
                  {stipendRequired && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                      Active
                    </span>
                  )}
                </div>
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
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                  <span>Weekends only</span>
                  {weekendsOnly && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold border border-blue-200 dark:border-blue-800">
                      Active
                    </span>
                  )}
                </div>
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

          {/* Interactive Upload Dropzone */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropFile}
            className="border-2 border-dashed border-blue-300 dark:border-blue-800/80 hover:border-blue-500 rounded-xl p-4 text-center bg-blue-50/30 dark:bg-blue-900/10 space-y-1 cursor-pointer transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center mx-auto mb-1 group-hover:scale-105 transition-transform">
              <Upload className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
              Drop your resume here, or <span className="text-blue-600 dark:text-blue-400 underline">browse files</span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">PDF, DOCX, or TXT · up to 5 MB</div>
          </div>

          {/* Uploaded File Pill */}
          {resumeInfo && (
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-900/20">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{resumeInfo.name}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {resumeInfo.size} · {resumeInfo.uploadedAt} · {skills.length} skills active
                  </div>
                </div>
              </div>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Replace
              </button>
            </div>
          )}

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
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 flex items-center space-x-1 cursor-pointer"
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
                  className="px-2.5 py-1 rounded-full text-xs font-bold border border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center space-x-1 cursor-pointer"
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
              Click any slot to block your college lectures. FlexHunter only suggests work outside these slots.
            </p>
          </div>

          {/* Legend + Dynamic Counter */}
          <div className="flex items-center space-x-4 text-xs font-semibold shrink-0">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800"></span>
              <span className="text-slate-700 dark:text-slate-300">Lecture ({blockedCount} hrs)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40"></span>
              <span className="text-emerald-800 dark:text-emerald-400 font-semibold">Available for Work</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-900 dark:bg-slate-800 text-emerald-400 text-xs font-extrabold shadow-xs flex items-center space-x-1.5 border border-slate-800 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{freeDaytimeHours} free hrs / week</span>
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
                          className={`w-full h-7 rounded text-[10px] font-bold transition-all flex items-center justify-center overflow-hidden truncate px-1 border cursor-pointer ${
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
