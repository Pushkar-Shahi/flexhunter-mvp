import React, { useState, useRef } from 'react';
import { Search, Globe, Sun, Moon, Download, Upload, RotateCcw, User, Check, Sparkles } from 'lucide-react';

export default function TopBar({ 
  breadcrumb, 
  searchQuery, 
  setSearchQuery,
  onOpenExtension,
  theme,
  onToggleTheme,
  onExportData,
  onImportData,
  onResetData
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    if (onImportData) {
      onImportData(e);
    }
    setShowUserMenu(false);
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0 gap-4 transition-colors z-20">
      
      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".json"
        className="hidden"
      />

      {/* Breadcrumb */}
      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 shrink-0">
        {breadcrumb}
      </div>

      {/* Global Search Input */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search internships, roles, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5 shrink-0 relative">
        
        {/* Dark / Light Mode Toggle Button */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Extension Launcher */}
        <button
          onClick={onOpenExtension}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
          <span>Extension</span>
        </button>

        {/* Live Status indicator */}
        <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500" title="System Status: Ready">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>

        {/* User Avatar with Profile & Data Management Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-500/30 transition-all"
            title="Profile & Data Management"
          >
            TS
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                <div className="text-xs font-bold text-slate-900 dark:text-white">Tanmay Shahi</div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500">Student Developer · MSOT</div>
              </div>

              <div className="space-y-0.5">
                <button
                  onClick={() => {
                    if (onExportData) onExportData();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-500" />
                  <span>Export Backup (JSON)</span>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Import Backup (JSON)</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                <button
                  onClick={() => {
                    if (onResetData) onResetData();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
