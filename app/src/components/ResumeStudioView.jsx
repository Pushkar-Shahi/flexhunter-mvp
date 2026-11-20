import React, { useState, useEffect } from 'react';
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
  Target,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function ResumeStudioView({ maxHours = 15, userSchedule = "afternoon" }) {
  const [activeTab, setActiveTab] = useState('tailor'); // 'tailor' | 'ats'
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Synchronized skills
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
      "Video Editing",
      "UI Wireframing"
    ];
  });

  const [resumeInfo, setResumeInfo] = useState(() => {
    const saved = localStorage.getItem('flexhunter_resume_info');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      name: "resume_2026.pdf",
      size: "1.4 MB",
      uploadedAt: "Uploaded Nov 4"
    };
  });

  const [newSkill, setNewSkill] = useState("");
  const [targetRole, setTargetRole] = useState("design"); // 'design' | 'marketing' | 'tech' | 'product'

  // Dynamic ATS Calculation
  const roleKeywords = {
    design: ["Figma", "Canva", "UI Wireframing", "User Research", "Prototyping", "Design Systems"],
    marketing: ["Social Media Marketing", "Copywriting", "Video Editing", "Content Strategy", "SEO", "Analytics"],
    tech: ["React", "JavaScript", "Tailwind CSS", "Git", "Next.js", "TypeScript"],
    product: ["Product Design", "Figma", "User Stories", "Agile", "Market Research", "Copywriting"]
  };

  const currentRoleKeywords = roleKeywords[targetRole] || roleKeywords.design;
  const matchedKeywords = currentRoleKeywords.filter((k) => skills.includes(k));
  const missingKeywords = currentRoleKeywords.filter((k) => !skills.includes(k));
  const atsScore = Math.min(100, Math.max(45, Math.round((matchedKeywords.length / currentRoleKeywords.length) * 100)));

  // Dynamic Pitches
  const getTailoredPitch = () => {
    switch (targetRole) {
      case 'design':
        return `I'm a student designer specializing in ${skills.slice(0, 3).join(', ')} with experience producing high-engagement user interfaces and social assets. My college lectures conclude by 1:00 PM, giving me ${maxHours} dedicated weekly afternoon hours to deliver clean, testable Figma prototypes.`;
      case 'marketing':
        return `Second-year undergraduate with hands-on ${skills.filter(s => s.includes('Marketing') || s.includes('Copy') || s.includes('Video')).join(' and ') || 'marketing'} experience. Having grown student club engagement by 40%, I bring creative storytelling and dependable ${maxHours} hrs/week afternoon sprint execution.`;
      case 'tech':
        return `Student developer skilled in modern web tools and responsive UI design. I operate efficiently in asynchronous GitHub and Figma workflows, with ${maxHours} hours/week of clear afternoon and weekend availability outside college lectures.`;
      case 'product':
        return `Proactive student aspiring in product management and design workflows. Experienced in translating student feedback into actionable wireframes using ${skills[0] || 'Figma'}, dedicating ${maxHours} focused hours/week.`;
      default:
        return `Student professional managing ${maxHours} flexible internship hours per week alongside college coursework.`;
    }
  };

  const [currentPitch, setCurrentPitch] = useState(getTailoredPitch);

  useEffect(() => {
    setCurrentPitch(getTailoredPitch());
  }, [targetRole, maxHours, skills]);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(currentPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPitch = () => {
    const element = document.createElement("a");
    const file = new Blob([`# FlexHunter Tailored Pitch\n\nTarget Role: ${targetRole}\nAvailability: ${maxHours} hrs/week (${userSchedule})\n\n${currentPitch}\n`], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `FlexHunter_Tailored_Pitch_${targetRole}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const removeSkill = (s) => {
    const updated = skills.filter((item) => item !== s);
    setSkills(updated);
    localStorage.setItem('flexhunter_skills', JSON.stringify(updated));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updated = [...skills, newSkill.trim()];
      setSkills(updated);
      localStorage.setItem('flexhunter_skills', JSON.stringify(updated));
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
            onClick={handleDownloadPitch}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-2xs"
          >
            {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloaded ? 'Downloaded' : 'Export Pitch'}</span>
          </button>
          
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
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{resumeInfo.name}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{resumeInfo.size} · {resumeInfo.uploadedAt}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Synced ✓
              </span>
            </div>

            {/* Dynamic ATS Score Meter */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Target Role ATS Match</span>
                <span className={`font-black ${atsScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                  {atsScore} / 100
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${atsScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                  style={{ width: `${atsScore}%` }}
                ></div>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between pt-0.5">
                <span>{matchedKeywords.length} of {currentRoleKeywords.length} target skills found</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">{targetRole} Track</span>
              </div>
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
                  <button 
                    onClick={() => removeSkill(s)}
                    className="hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Quick Add Skill */}
            <form onSubmit={addSkill} className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="Add skill (e.g. Next.js, SEO)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!newSkill.trim()}
                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-40"
              >
                Add
              </button>
            </form>

            {/* Missing Keywords Suggestion */}
            {missingKeywords.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                  Recommended to add for {targetRole}:
                </span>
                <div className="flex flex-wrap gap-1">
                  {missingKeywords.map((mk) => (
                    <button
                      key={mk}
                      onClick={() => {
                        const updated = [...skills, mk];
                        setSkills(updated);
                        localStorage.setItem('flexhunter_skills', JSON.stringify(updated));
                      }}
                      className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 cursor-pointer flex items-center space-x-1"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>{mk}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column (7 cols): Pitch Generator & Editor */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xs space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Context-Aware Tailored Pitch
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                Automatically merges your skills, hours limit ({maxHours}h/wk), and timetable.
              </p>
            </div>

            {/* Target Role Selector */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setTargetRole('design')}
                className={`px-3 py-1 rounded-lg transition-all ${targetRole === 'design' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Design
              </button>
              <button
                onClick={() => setTargetRole('marketing')}
                className={`px-3 py-1 rounded-lg transition-all ${targetRole === 'marketing' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Marketing
              </button>
              <button
                onClick={() => setTargetRole('tech')}
                className={`px-3 py-1 rounded-lg transition-all ${targetRole === 'tech' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Tech
              </button>
              <button
                onClick={() => setTargetRole('product')}
                className={`px-3 py-1 rounded-lg transition-all ${targetRole === 'product' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Product
              </button>
            </div>
          </div>

          {/* Editable Pitch Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">Generated Pitch Note</span>
              <button
                onClick={() => setCurrentPitch(getTailoredPitch())}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Template</span>
              </button>
            </div>
            <textarea
              rows="6"
              value={currentPitch}
              onChange={(e) => setCurrentPitch(e.target.value)}
              className="w-full text-xs p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              <span>{currentPitch.length} characters · Ready to paste into applications</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Student-Coursework Protected</span>
            </div>
          </div>

          {/* AI Student Selling Points Breakdown */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Why this pitch converts for student internships</h4>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pl-1">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>Directly states afternoon availability ({userSchedule}) to eliminate scheduling friction before interviews.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>Highlights proactive project metrics (club growth, deliverables produced).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>Caps weekly bandwidth explicitly at {maxHours} hrs/week to safeguard college GPA.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
