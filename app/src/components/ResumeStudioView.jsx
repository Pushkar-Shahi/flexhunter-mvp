import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  ShieldCheck, 
  Plus, 
  X,
  Target
} from 'lucide-react';

export default function ResumeStudioView({ maxHours, userSchedule }) {
  const [activeTab, setActiveTab] = useState('tailor'); // 'tailor' | 'ats'
  const [copied, setCopied] = useState(false);

  const [skills, setSkills] = useState([
    "Figma", 
    "Canva", 
    "Social Media Marketing", 
    "Copywriting", 
    "Video Editing",
    "UI Wireframing"
  ]);

  const [newSkill, setNewSkill] = useState("");

  const [targetRole, setTargetRole] = useState("Marketing & Graphic Design");

  const tailoredPitches = {
    design: "I'm a student designer specializing in Figma and Canva with experience producing high-engagement social assets. My lectures finish by 1:00 PM, giving me 15 dedicated afternoon hours weekly to produce clean, testable design deliverables.",
    marketing: "Second-year student with hands-on copywriting and social media strategy experience. Having grown a campus club's following by 40%, I bring proven content creation skills and reliable 12-15 hr/week afternoon sprint execution.",
    tech: "Student developer with practical React and UI prototyping experience. I operate efficiently in asynchronous GitHub and Figma workflows, fully compatible with my afternoon and weekend availability."
  };

  const [currentPitch, setCurrentPitch] = useState(tailoredPitches.design);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const removeSkill = (s) => {
    setSkills(skills.filter((item) => item !== s));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Career Studio</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Resume Studio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Optimize your student resume and generate tailored pitch notes matched to your college hours.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleCopyPitch}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Pitch Copied!' : 'Copy Tailored Pitch'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Resume Card & Parsed Skills */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Active File Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Active Resume
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Parsed
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/30 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">resume_2026.pdf</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">2.4 MB · Uploaded Nov 4</p>
                </div>
              </div>

              <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 underline">
                Replace
              </button>
            </div>

            {/* ATS Score Meter */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Student ATS Score</span>
                <span className="font-black text-emerald-700 dark:text-emerald-400">94 / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                Strong keywords detected for Marketing, Graphic Design, and Figma workflows.
              </p>
            </div>
          </div>

          {/* Extracted Skills Cloud */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Extracted Skills ({skills.length})
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Click × to remove</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center space-x-1"
                >
                  <span>{s}</span>
                  <button onClick={() => removeSkill(s)} className="text-blue-400 hover:text-blue-800 dark:hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={addSkill} className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                placeholder="Add skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold"
              >
                Add
              </button>
            </form>
          </div>

        </div>

        {/* Right Column (7 cols): AI Tailored Pitch & Key Application Assets */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Pitch Generator Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  AI Application Pitch Generator
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Pre-tailored answer for "Why should we hire you?" highlighting your class schedule.
                </p>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80">
                Target Role
              </span>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setCurrentPitch(tailoredPitches.design)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                  currentPitch === tailoredPitches.design
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Graphic Design
              </button>

              <button
                onClick={() => setCurrentPitch(tailoredPitches.marketing)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                  currentPitch === tailoredPitches.marketing
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Content Marketing
              </button>

              <button
                onClick={() => setCurrentPitch(tailoredPitches.tech)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all border ${
                  currentPitch === tailoredPitches.tech
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                Frontend & UI
              </button>
            </div>

            {/* Textarea */}
            <div className="space-y-1.5">
              <textarea
                rows="5"
                value={currentPitch}
                onChange={(e) => setCurrentPitch(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl leading-relaxed text-slate-800 dark:text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>{currentPitch.length} characters</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">✓ Automatically references your afternoon class hours</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={handleCopyPitch}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
              </button>

              <button
                onClick={() => alert("Resume export simulated with tailored skills.")}
                className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Tailored Summary</span>
              </button>
            </div>
          </div>

          {/* ATS Checklist Box */}
          <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Course Project Alignment Verification</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified Part-Time (10-15h/wk)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>100% Remote Asynchronous Compatible</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Morning Lecture Attendance Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Portfolio Assets Linked (Behance)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
