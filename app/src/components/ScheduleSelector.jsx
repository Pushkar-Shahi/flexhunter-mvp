import React from 'react';
import { Calendar, Clock, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ScheduleSelector({ 
  userSchedule, 
  setUserSchedule, 
  maxHours, 
  setMaxHours 
}) {
  const scheduleOptions = [
    {
      id: "afternoon",
      label: "Free Afternoons (After 1 PM)",
      desc: "Morning classes (9 AM - 1 PM). Available 1 PM to 7 PM weekdays."
    },
    {
      id: "evening",
      label: "Evenings & Weekends",
      desc: "Classes till 4 PM. Available evenings (after 5 PM) and weekends."
    },
    {
      id: "flexible",
      label: "Flexible / Asynchronous",
      desc: "No fixed lecture blocks; can work anytime during the week."
    },
    {
      id: "morning",
      label: "Free Mornings",
      desc: "Afternoon classes (1 PM - 5 PM). Available 8 AM to 12 PM."
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </span>
            <h2 className="text-base font-bold text-slate-900">Your College Schedule & Bandwidth</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Set your lecture constraints so FlexHunter only matches roles that don't clash with classes.
          </p>
        </div>

        {/* Max Hours Slider */}
        <div className="flex items-center space-x-3 bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
          <Clock className="w-4 h-4 text-slate-500" />
          <div className="text-xs">
            <span className="text-slate-500">Max Bandwidth: </span>
            <span className="font-bold text-slate-900">{maxHours} hrs/week</span>
          </div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={maxHours}
            onChange={(e) => setMaxHours(Number(e.target.value))}
            className="w-24 accent-blue-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Schedule Option Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {scheduleOptions.map((opt) => {
          const isSelected = userSchedule === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setUserSchedule(opt.id)}
              className={`p-3 rounded-lg text-left transition-all border ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                  {opt.label}
                </span>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
