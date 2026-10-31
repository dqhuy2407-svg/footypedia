import React from 'react';
import { History, Shield, Calendar, Award } from 'lucide-react';

export default function ClubTimeline({ clubCareer = [] }) {
  if (!clubCareer || clubCareer.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
        <p>Chưa có thông tin lịch sử chuyển nhượng và câu lạc bộ.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm my-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-lg">Hành Trình Sự Nghiệp Qua Các Câu Lạc Bộ</h3>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
          {clubCareer.length} Chặng đường
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/30 space-y-8">
        {clubCareer.map((team, index) => {
          const isCurrent = !team.departed || team.departed === 'Hiện tại';
          return (
            <div key={team.id || index} className="relative group">
              {/* Timeline marker node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-emerald-500 border-emerald-300 ring-4 ring-emerald-500/20'
                    : 'bg-slate-900 border-slate-700 group-hover:border-emerald-400'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isCurrent ? 'bg-slate-950 font-bold' : 'bg-slate-400 group-hover:bg-emerald-400'
                  }`}
                />
              </div>

              {/* Card */}
              <div className="bg-slate-950/60 hover:bg-slate-800/50 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 sm:p-5 transition shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-4">
                    {/* Club badge */}
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 p-1.5 flex items-center justify-center flex-shrink-0">
                      {team.badge ? (
                        <img
                          src={team.badge}
                          alt={team.club}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <Shield className="w-6 h-6 text-slate-600" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                          {team.club}
                        </h4>
                        {isCurrent && (
                          <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold">
                            Hiện tại
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>Thời gian: <strong className="text-slate-300">{team.period}</strong></span>
                        <span>•</span>
                        <span className="text-slate-500">{team.moveType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Appearances & Goals metrics */}
                  <div className="flex items-center gap-4 sm:gap-6 bg-slate-900/90 px-4 py-2 rounded-lg border border-slate-800 self-start sm:self-center">
                    <div className="text-center">
                      <div className="text-xs text-slate-400">Trận</div>
                      <div className="text-sm font-black text-cyan-400 font-mono">
                        {team.appearances ?? '-'}
                      </div>
                    </div>
                    <div className="w-px h-6 bg-slate-800" />
                    <div className="text-center">
                      <div className="text-xs text-slate-400">Bàn thắng</div>
                      <div className="text-sm font-black text-emerald-400 font-mono">
                        {team.goals ?? '-'}
                      </div>
                    </div>
                    {team.appearances > 0 && (
                      <>
                        <div className="w-px h-6 bg-slate-800" />
                        <div className="text-center hidden sm:block">
                          <div className="text-xs text-slate-400">Hiệu suất</div>
                          <div className="text-xs font-bold text-amber-400 font-mono">
                            {(team.goals / team.appearances).toFixed(2)}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
