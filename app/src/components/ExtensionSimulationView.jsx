import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  FileText, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

export default function ExtensionSimulationView({ 
  onClose, 
  onAutoFillAndTrack,
  targetJob 
}) {
  const [pitchText, setPitchText] = useState(
    "I'm a second-year student who runs the Instagram and Canva content for a campus club, growing it 40% in one semester. I can commit 12 focused hours a week and bring hands-on Figma and copywriting skills to your content calendar."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const jobTitle = targetJob?.title || "Social Media Marketing Intern";
  const jobCompany = targetJob?.company || "Orbit Growth";

  const handleAutofill = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onAutoFillAndTrack({
        title: jobTitle,
        company: jobCompany
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      
      {/* Simulated Browser Frame (Exact Match to Image 4) */}
      <div className="bg-slate-200 dark:bg-slate-900 rounded-2xl w-full max-w-6xl shadow-2xl border border-slate-300 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[95vh]">
        
        {/* Browser Chrome Header */}
        <div className="px-4 py-2.5 bg-slate-200 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 flex items-center space-x-3 shrink-0">
          {/* Traffic lights */}
          <div className="flex items-center space-x-1.5">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-rose-400 hover:bg-rose-500 cursor-pointer"></button>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>

          {/* Active Tab */}
          <div className="bg-white dark:bg-slate-800 rounded-t-lg px-3 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 flex items-center space-x-2 border-t border-x border-slate-300 dark:border-slate-700 -mb-2.5 z-10">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            <span className="truncate max-w-[200px]">{jobTitle} – {jobCompany}</span>
            <X onClick={onClose} className="w-3 h-3 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer" />
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">+ New Tab</span>
        </div>

        {/* Browser URL Bar */}
        <div className="px-4 py-2 bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3 text-slate-400 dark:text-slate-500 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700 dark:hover:text-white" />
          <ArrowRight className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700 dark:hover:text-white" />
          <RotateCw className="w-3.5 h-3.5 cursor-pointer hover:text-slate-700 dark:hover:text-white" />
          
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1 text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-1.5 font-mono">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="truncate">internshala.com/internship/detail/social-media-marketing-intern-orbit-growth</span>
          </div>

          {/* Extension icon in browser toolbar */}
          <div className="w-6 h-6 rounded bg-black dark:bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center">
            F
          </div>
          <div className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700"></div>
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        </div>

        {/* Content Area: Left External Webpage, Right 380px Extension Sidebar */}
        <div className="flex-1 flex overflow-hidden bg-slate-100 dark:bg-slate-950">
          
          {/* Left: Simulated External Job Board (Internshala.com) */}
          <div className="flex-1 p-8 overflow-y-auto bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 space-y-6">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300">
                Actively hiring
              </span>

              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {jobTitle}
                </h1>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                  {jobCompany}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Work from home · 3 months · ₹8,000 / month · Apply by 15 Nov
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">About the internship</h3>
                <div className="space-y-2">
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded"></div>
                  <div className="w-5/6 h-2.5 bg-slate-100 dark:bg-slate-900 rounded"></div>
                  <div className="w-4/6 h-2.5 bg-slate-100 dark:bg-slate-900 rounded"></div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">Skill(s) required</h3>
                <div className="flex flex-wrap gap-2">
                  {["Social Media Marketing", "Canva", "Copywriting", "Instagram"].map((s) => (
                    <span key={s} className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-900 rounded"></div>
                <div className="w-3/4 h-2.5 bg-slate-100 dark:bg-slate-900 rounded"></div>
              </div>
            </div>
          </div>

          {/* Right: The 380px Chrome Extension Panel (Exact Match to Image 4) */}
          <div className="w-96 bg-white dark:bg-slate-900 shrink-0 p-5 overflow-y-auto space-y-4 flex flex-col justify-between shadow-lg">
            
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                    F
                  </div>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">FlexHunter</span>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Card 1: Job Detected */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800/50 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">Job Detected</span>
                  <span className="text-slate-400 dark:text-slate-500 font-mono">internshala.com</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug pt-1">
                  {jobTitle}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {jobCompany} · Remote · ₹8,000 / month
                </p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/60 dark:border-slate-700 mt-1">
                  <span>Auto-extracted from this page</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">Edit</span>
                </div>
              </div>

              {/* Card 2: Match Circle Card */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 flex items-center space-x-3.5 bg-slate-50/30 dark:bg-slate-800/30">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 flex flex-col items-center justify-center shrink-0">
                  <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 leading-none">88%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase leading-none mt-0.5">Match</span>
                </div>
                <div className="text-[11px] space-y-0.5 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">Strong fit</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">+</span>
                    <span>Skills: 4 of 5 matched</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">+</span>
                    <span>Pay meets your stipend filter</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-amber-500">!</span>
                    <span>15 hrs/wk cap vs 20 requested</span>
                  </div>
                </div>
              </div>

              {/* Card 3: One-Click Autofill Form Fields */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">One-Click Autofill</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px]">Review before submit</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="w-16 text-[10px] font-semibold text-slate-400 dark:text-slate-500">Name</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px]">Tanmay Shahi</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="w-16 text-[10px] font-semibold text-slate-400 dark:text-slate-500">Email</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">tanmay.shahi@msot.edu</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="w-16 text-[10px] font-semibold text-slate-400 dark:text-slate-500">College</span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 text-[11px]">MSOT</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    <span className="w-16 text-[10px] font-semibold text-slate-400 dark:text-slate-500">Resume</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-[11px] flex items-center space-x-1">
                      <FileText className="w-3 h-3 text-slate-500 dark:text-slate-400" />
                      <span>resume_2026.pdf</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 4: Why should we hire you? (AI-Tailored Note) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">Why should we hire you?</span>
                  <span className="px-2 py-0.2 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 text-[9px] font-bold">
                    AI-tailored
                  </span>
                </div>
                <textarea
                  rows="4"
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
                  <span>{pitchText.length} / 600 characters</span>
                  <div className="space-x-2">
                    <button className="hover:text-slate-800 dark:hover:text-slate-200 font-semibold">Regenerate</button>
                    <button className="hover:text-slate-800 dark:hover:text-slate-200 font-semibold">Edit</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                disabled={isSubmitting || submitted}
                onClick={handleAutofill}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-60 flex items-center justify-center space-x-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Application Logged in CRM!</span>
                  </>
                ) : (
                  <span>{isSubmitting ? 'Autofilling...' : 'Auto-Fill Application & Track in CRM'}</span>
                )}
              </button>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center mt-1.5">
                Saved to "Applied" on your board · you press Submit
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
