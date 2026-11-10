import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Plus,
  X
} from 'lucide-react';

export default function ProfileAvailabilityView({ 
  maxHours, 
  setMaxHours, 
  remoteOnly, 
  setRemoteOnly,
  onSaveAndExplore 
}) {
  // Weekly timetable matrix state
  // Initial state: Mon-Fri mornings are blocked for college lectures
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = [
    { id: "morning", label: "Morning (9 AM - 1 PM)" },
    { id: "afternoon", label: "Afternoon (1 PM - 6 PM)" },
    { id: "evening", label: "Evening (6 PM - 9 PM)" }
  ];

  const [timetable, setTimetable] = useState({
    "Mon-morning": "blocked",
    "Mon-afternoon": "available",
    "Mon-evening": "available",
    "Tue-morning": "blocked",
    "Tue-afternoon": "available",
    "Tue-evening": "available",
    "Wed-morning": "blocked",
    "Wed-afternoon": "available",
    "Wed-evening": "available",
    "Thu-morning": "blocked",
    "Thu-afternoon": "available",
    "Thu-evening": "available",
    "Fri-morning": "blocked",
    "Fri-afternoon": "available",
    "Fri-evening": "available",
    "Sat-morning": "available",
    "Sat-afternoon": "available",
    "Sat-evening": "available",
    "Sun-morning": "available",
    "Sun-afternoon": "available",
    "Sun-evening": "available",
  });

  const toggleSlot = (key) => {
    setTimetable((prev) => ({
      ...prev,
      [key]: prev[key] === "blocked" ? "available" : "blocked"
    }));
  };

  // Skills state
  const [skills, setSkills] = useState(["Figma", "Canva", "Social Media Marketing", "Copywriting"]);
  const [newSkill, setNewSkill] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("https://behance.net/tanmay-portfolio");
  const [minStipend, setMinStipend] = useState("5000");

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Page Title & Subtitle (Matching Screen 1 of Wireframe) */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
          <Calendar className="w-4 h-4" />
          <span>Screen 1: Candidate Constraints & Setup</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          My Availability & Career Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Set your schedule boundaries so FlexHunter only matches roles that fit parallel with your college degree.
        </p>
      </div>

      {/* Card 1: Hard Constraints */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
          <span>1. Hard Constraints</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Max Hours Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-600">Weekly Bandwidth:</span>
              <span className="text-blue-600 font-extrabold">{maxHours} hrs/week</span>
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
            <span className="text-[11px] text-slate-400 block">
              Default is 15h to protect your college GPA.
            </span>
          </div>

          {/* Remote Mode Toggle */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">Work Mode:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setRemoteOnly(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  remoteOnly
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Remote Only ✓
              </button>
              <button
                onClick={() => setRemoteOnly(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  !remoteOnly
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Allow Hybrid
              </button>
            </div>
          </div>

          {/* Min Stipend */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">Minimum Stipend:</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">₹</span>
              <input
                type="number"
                value={minStipend}
                onChange={(e) => setMinStipend(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="5000"
              />
            </div>
            <span className="text-[11px] text-slate-400 block">Filters out unpaid work</span>
          </div>
        </div>
      </div>

      {/* Card 2: Visual Weekly College Timetable Grid (Screen 1 from Wireframe) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              2. College Schedule Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Click any time block to toggle between College Lectures and Open for Internships.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300"></span>
              <span className="text-slate-600">College Lectures (Blocked)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span>
              <span className="text-slate-600">Open for Work</span>
            </div>
          </div>
        </div>

        {/* The Matrix Grid */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-2.5 text-left font-bold text-slate-500 uppercase tracking-wider text-[11px]">Time Slot</th>
                {days.map((d) => (
                  <th key={d} className="p-2.5 font-bold text-slate-800 text-[11px]">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot.id} className="border-b border-slate-100 last:border-b-0">
                  <td className="p-2.5 text-left font-semibold text-slate-600 text-xs bg-slate-50/50">
                    {slot.label}
                  </td>
                  {days.map((day) => {
                    const key = `${day}-${slot.id}`;
                    const isBlocked = timetable[key] === "blocked";
                    return (
                      <td key={key} className="p-1.5">
                        <button
                          onClick={() => toggleSlot(key)}
                          className={`w-full py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${
                            isBlocked
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {isBlocked ? 'Lectures' : 'Available'}
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

      {/* Card 3: Skills & Portfolio */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          3. Skills & Portfolio Assets
        </h3>

        <div>
          <span className="text-xs font-semibold text-slate-600 block mb-2">Your Skills & Tools:</span>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((s) => (
              <span key={s} className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg text-xs font-bold">
                <span>{s}</span>
                <button onClick={() => removeSkill(s)} className="text-blue-400 hover:text-blue-800">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <form onSubmit={addSkill} className="flex gap-2 max-w-sm">
            <input
              type="text"
              placeholder="Add skill (e.g. Python, Video Editing)..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
            >
              Add
            </button>
          </form>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-600 block mb-1">Portfolio / Behance / GitHub Link:</span>
          <input
            type="text"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className="w-full max-w-lg px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Bottom Save & Proceed CTA */}
      <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl shadow-lg">
        <div>
          <span className="text-xs text-slate-300 font-semibold block">Preferences Saved</span>
          <span className="text-xs text-emerald-400 font-bold">✓ Morning lectures blocked · Free after 1 PM</span>
        </div>

        <button
          onClick={onSaveAndExplore}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-extrabold text-xs transition-all shadow-md active:scale-98"
        >
          <span>Explore Matching Feed</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
