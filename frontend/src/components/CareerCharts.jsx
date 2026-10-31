import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { BarChart3, Compass } from 'lucide-react';

export default function CareerCharts({ clubCareer = [], skillsRadar = [], playerName = '' }) {
  // Filter clubs that have either appearances or goals > 0
  const chartData = clubCareer
    .filter(c => (c.appearances > 0 || c.goals > 0))
    .map(c => ({
      name: c.club.length > 14 ? c.club.substring(0, 12) + '...' : c.club,
      fullName: c.club,
      appearances: c.appearances,
      goals: c.goals,
      period: c.period
    }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-8">
      {/* Club Goals & Appearances Bar Chart */}
      <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Thống Kê Bàn Thắng & Trận Đấu Qua Các CLB</h3>
          </div>
          <span className="text-xs text-slate-400">Sự nghiệp cấp CLB</span>
        </div>

        {chartData.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={11}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold text-white">{d.fullName} ({d.period})</p>
                          <p className="text-cyan-400 flex items-center justify-between gap-4">
                            <span>Số trận ra sân:</span>
                            <span className="font-mono font-bold">{d.appearances}</span>
                          </p>
                          <p className="text-emerald-400 flex items-center justify-between gap-4">
                            <span>Số bàn thắng:</span>
                            <span className="font-mono font-bold">{d.goals}</span>
                          </p>
                          {d.appearances > 0 && (
                            <p className="text-amber-400 flex items-center justify-between gap-4 border-t border-slate-800 pt-1">
                              <span>Tỷ lệ bàn/trận:</span>
                              <span className="font-mono font-bold">{(d.goals / d.appearances).toFixed(2)}</span>
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                  formatter={(value) => (value === 'appearances' ? 'Số trận ra sân' : 'Số bàn thắng')}
                />
                <Bar dataKey="appearances" fill="#06b6d4" radius={[4, 4, 0, 0]} name="appearances" />
                <Bar dataKey="goals" fill="#10b981" radius={[4, 4, 0, 0]} name="goals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex flex-col items-center justify-center text-slate-500 text-sm">
            <p>Chưa có đủ số liệu thống kê chi tiết theo CLB của cầu thủ này.</p>
          </div>
        )}
      </div>

      {/* Radar Skill Chart */}
      <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">Bộ Chỉ Số Kỹ Năng (FC Radar)</h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono">Max 100</span>
        </div>

        {skillsRadar && skillsRadar.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsRadar} outerRadius="75%">
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis
                  dataKey="subject"
                  stroke="#94a3b8"
                  tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#475569"
                  tick={{ fill: '#64748b', fontSize: 9 }}
                />
                <Radar
                  name={playerName || 'Chỉ số'}
                  dataKey="value"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.45}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg shadow-lg text-xs">
                          <span className="text-slate-300">{d.subject}: </span>
                          <span className="font-bold text-emerald-400">{d.value}/100</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center text-slate-500 text-sm">
            Không có dữ liệu radar.
          </div>
        )}
      </div>
    </div>
  );
}
