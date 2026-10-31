import React from 'react';
import { Trophy, Activity, GitCompare, Sparkles, Globe } from 'lucide-react';

export default function Navbar({ onOpenCompare, onSelectTrending, apiOnline = true }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Trophy className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                FOOTY<span className="text-emerald-400">PEDIA</span>
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold px-2 py-0.5 rounded-full">
                VN v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Tra cứu Cầu thủ & Thống kê Sự nghiệp Quốc tế
            </p>
          </div>
        </div>

        {/* Action buttons & Backend Status */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${apiOnline ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${apiOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            </span>
            <span className="text-slate-400">API Node.js:</span>
            <span className="text-emerald-400 font-medium">Internet Online</span>
          </div>

          <button
            onClick={onOpenCompare}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition text-sm font-medium shadow-sm hover:border-cyan-500/50"
          >
            <GitCompare className="w-4 h-4 text-cyan-400" />
            <span>So sánh cầu thủ</span>
          </button>
        </div>
      </div>
    </header>
  );
}
