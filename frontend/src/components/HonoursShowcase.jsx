import React from 'react';
import { Trophy, Calendar, Shield } from 'lucide-react';

export default function HonoursShowcase({ honours = [] }) {
  if (!honours || honours.length === 0) {
    return (
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
        <Trophy className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p>Chưa có danh sách danh hiệu cá nhân/tập thể cụ thể từ nguồn dữ liệu.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm my-8">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-lg">Phòng Truyền Thống & Danh Hiệu Đạt Được</h3>
        </div>
        <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full font-bold">
          {honours.length} Danh hiệu ghi nhận
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {honours.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 hover:border-amber-500/40 rounded-xl p-4 transition group flex items-start space-x-3.5 shadow-sm"
          >
            {/* Trophy Icon / Image */}
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 p-2 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
              {item.trophyImage ? (
                <img
                  src={item.trophyImage}
                  alt={item.honourName}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <Trophy className="w-6 h-6 text-amber-400" />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition truncate">
                {item.honourName}
              </h4>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                {item.teamBadge && (
                  <img
                    src={item.teamBadge}
                    alt={item.team}
                    className="w-4 h-4 object-contain inline-block"
                  />
                )}
                <span className="truncate">{item.team || 'Tuyển quốc gia / CLB'}</span>
              </div>

              <div className="inline-flex items-center gap-1 mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">
                <Calendar className="w-3 h-3" />
                <span>Mùa giải: {item.season}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
