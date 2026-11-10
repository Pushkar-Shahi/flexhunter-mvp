import React, { useState } from 'react';
import { X, Copy, Check, Mail, Sparkles, Building2, Calendar } from 'lucide-react';

export default function EmailDraftModal({ application, onClose }) {
  if (!application) return null;

  const [copied, setCopied] = useState(false);

  const isFollowUp = application.status === 'applied' || application.status === 'saved' || application.status === 'rejected';
  const isInterview = application.status === 'interview';
  const isOffer = application.status === 'offers';

  const getSubject = () => {
    if (isOffer) {
      return `Offer Acceptance & Next Steps — ${application.title} — Tanmay Shahi`;
    }
    if (isInterview) {
      return `Thank You & Follow-Up: ${application.title} Interview — Tanmay Shahi`;
    }
    return `Following Up: Application for ${application.title} — Tanmay Shahi`;
  };

  const getBody = () => {
    if (isOffer) {
      return `Dear ${application.company} Hiring Team,\n\nThank you so much for extending the offer for the ${application.title} role! I am thrilled about the opportunity to contribute to your team while managing my college coursework.\n\nI have reviewed the terms and would like to confirm my acceptance. My schedule allows for dedicated afternoon sprints (after 1:00 PM), and I am ready to begin onboarding.\n\nPlease let me know the next steps regarding documentation and kickoff.\n\nWarm regards,\nTanmay Shahi\nMSOT · Graphic Design & Marketing\nPortfolio: behance.net/tanmay-portfolio`;
    }
    if (isInterview) {
      return `Dear ${application.company} Team,\n\nThank you for taking the time to speak with me regarding the ${application.title} position. I really enjoyed learning more about the team's upcoming design initiatives and asynchronous workflow.\n\nOur conversation further confirmed that this role is an ideal match for my afternoon bandwidth (after 1 PM). As discussed, I have attached links to my relevant portfolio work.\n\nPlease let me know if you need any additional samples or information as you evaluate candidates.\n\nBest regards,\nTanmay Shahi\nMSOT · Student Developer & Designer`;
    }
    return `Dear ${application.company} Hiring Team,\n\nI hope this email finds you well.\n\nI am writing to follow up on my recent application for the ${application.title} position. As a student at MSOT balancing coursework, I was particularly drawn to your team's asynchronous, flexible structure which aligns perfectly with my weekday afternoon availability (1:00 PM - 6:00 PM).\n\nI remain very enthusiastic about the opportunity to support your team with my Figma and marketing skills. You can review my work at: behance.net/tanmay-portfolio.\n\nThank you again for your time and consideration, and I look forward to hearing from you!\n\nWarm regards,\nTanmay Shahi\nMSOT · Graphic Design & Marketing`;
  };

  const subject = getSubject();
  const body = getBody();

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isOffer ? 'Draft Reply / Acceptance Email' : isInterview ? 'Draft Interview Follow-Up' : 'Draft Follow-Up Email'}
                </h3>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  AI-Tailored
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tailored for {application.company} · {application.title}
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

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Subject Field */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Subject Line</span>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-100">
              {subject}
            </div>
          </div>

          {/* Body Field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Email Message</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Ready to send</span>
            </div>
            <textarea
              readOnly
              rows="11"
              value={body}
              className="w-full text-xs p-3 bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-mono leading-relaxed focus:outline-none"
            />
          </div>

          {/* Quick Context Box */}
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-xl flex items-center space-x-2 text-xs text-blue-900 dark:text-blue-300">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Politely references your afternoon class schedule and links directly to your student portfolio.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-98'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email & Subject</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
