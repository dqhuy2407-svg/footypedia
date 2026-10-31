import React, { useState, useEffect } from 'react';
import { X, Search, GitCompare, Trophy, Flame, Ruler, Footprints, Calendar, ArrowRightLeft } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export default function CompareModal({ isOpen, onClose, initialPlayer1, trendingList = [] }) {
  const [player1Id, setPlayer1Id] = useState(initialPlayer1 ? initialPlayer1.idPlayer : '34146370'); // Default Messi
  const [player2Id, setPlayer2Id] = useState('34146304'); // Default Ronaldo
  const [p1Data, setP1Data] = useState(null);
  const [p2Data, setP2Data] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialPlayer1) {
      setPlayer1Id(initialPlayer1.idPlayer);
    }
  }, [initialPlayer1]);

  useEffect(() => {
    if (!isOpen) return;

    let ignore = false;
    async function fetchComparison() {
      setLoading(true);
      try {
        const [res1, res2] = await Promise.all([
          fetch(`/api/players/${player1Id}`).then(r => r.json()),
          fetch(`/api/players/${player2Id}`).then(r => r.json())
        ]);
        if (!ignore) {
          if (res1.success) setP1Data(res1.data);
          if (res2.success) setP2Data(res2.data);
        }
      } catch (err) {
        console.error('Lỗi tải dữ liệu so sánh:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchComparison();
    return () => { ignore = true; };
  }, [isOpen, player1Id, player2Id]);

  if (!isOpen) return null;

  // Build dual radar data
  const radarData = (p1Data?.skillsRadar || []).map((skill, index) => {
    const p2Skill = p2Data?.skillsRadar ? p2Data.skillsRadar[index] : null;
    return {
      subject: skill.subject,
      player1: skill.value,
      player2: p2Skill ? p2Skill.value : 0,
      fullMark: 100
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white">So Sánh Cầu Thủ (Head-to-Head)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Selectors Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Player 1 selector */}
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <label className="text-xs text-emerald-400 font-semibold mb-2 block">
                Cầu thủ 1 (Màu Xanh Ngọc):
              </label>
              <select
                value={player1Id}
                onChange={(e) => setPlayer1Id(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {trendingList.map((t) => (
                  <option key={t.idPlayer} value={t.idPlayer}>
                    {t.strPlayer} ({t.strTeam})
                  </option>
                ))}
              </select>
            </div>

            {/* Player 2 selector */}
            <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
              <label className="text-xs text-cyan-400 font-semibold mb-2 block">
                Cầu thủ 2 (Màu Xanh Cyan):
              </label>
              <select
                value={player2Id}
                onChange={(e) => setPlayer2Id(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                {trendingList.map((t) => (
                  <option key={t.idPlayer} value={t.idPlayer}>
                    {t.strPlayer} ({t.strTeam})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-400">
              <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm">Đang tải và đồng bộ dữ liệu 2 cầu thủ...</p>
            </div>
          ) : p1Data && p2Data ? (
            <>
              {/* Head-to-Head Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Player 1 Card */}
                <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500 mb-3">
                    <img
                      src={p1Data.strCutout || p1Data.strThumb}
                      alt={p1Data.strPlayer}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="font-black text-base sm:text-xl text-white">{p1Data.strPlayer}</h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">{p1Data.strPosition}</p>
                  <p className="text-xs text-slate-400">{p1Data.strTeam} • {p1Data.strNationality}</p>
                </div>

                {/* Player 2 Card */}
                <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 text-center relative overflow-hidden">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-2xl overflow-hidden bg-slate-900 border-2 border-cyan-500 mb-3">
                    <img
                      src={p2Data.strCutout || p2Data.strThumb}
                      alt={p2Data.strPlayer}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="font-black text-base sm:text-xl text-white">{p2Data.strPlayer}</h3>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">{p2Data.strPosition}</p>
                  <p className="text-xs text-slate-400">{p2Data.strTeam} • {p2Data.strNationality}</p>
                </div>
              </div>

              {/* Side-by-Side Comparison Metrics Table */}
              <div className="bg-slate-950/60 rounded-2xl border border-slate-800 divide-y divide-slate-800 overflow-hidden text-sm">
                {/* Row: Age */}
                <div className="grid grid-cols-3 p-3 items-center text-center">
                  <div className="font-bold text-white">{p1Data.age ?? '-'}</div>
                  <div className="text-xs text-slate-400 font-medium">Tuổi</div>
                  <div className="font-bold text-white">{p2Data.age ?? '-'}</div>
                </div>

                {/* Row: Height */}
                <div className="grid grid-cols-3 p-3 items-center text-center">
                  <div className="font-medium text-slate-200">{p1Data.strHeight || '-'}</div>
                  <div className="text-xs text-slate-400 font-medium">Chiều cao</div>
                  <div className="font-medium text-slate-200">{p2Data.strHeight || '-'}</div>
                </div>

                {/* Row: Preferred Foot */}
                <div className="grid grid-cols-3 p-3 items-center text-center">
                  <div className="font-medium text-slate-200">{p1Data.strSide || '-'}</div>
                  <div className="text-xs text-slate-400 font-medium">Chân thuận</div>
                  <div className="font-medium text-slate-200">{p2Data.strSide || '-'}</div>
                </div>

                {/* Row: Total Goals */}
                <div className="grid grid-cols-3 p-3 items-center text-center bg-slate-900/40">
                  <div className={`font-mono font-black text-base ${p1Data.stats?.totalGoals >= p2Data.stats?.totalGoals ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                    {p1Data.stats?.totalGoals ?? 0}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Tổng bàn thắng CLB</div>
                  <div className={`font-mono font-black text-base ${p2Data.stats?.totalGoals >= p1Data.stats?.totalGoals ? 'text-cyan-400 font-extrabold' : 'text-slate-300'}`}>
                    {p2Data.stats?.totalGoals ?? 0}
                  </div>
                </div>

                {/* Row: Total Appearances */}
                <div className="grid grid-cols-3 p-3 items-center text-center">
                  <div className="font-mono font-bold text-slate-200">
                    {p1Data.stats?.totalAppearances ?? 0}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Tổng số trận</div>
                  <div className="font-mono font-bold text-slate-200">
                    {p2Data.stats?.totalAppearances ?? 0}
                  </div>
                </div>

                {/* Row: Goals per match */}
                <div className="grid grid-cols-3 p-3 items-center text-center bg-slate-900/40">
                  <div className={`font-mono font-black ${p1Data.stats?.goalsPerMatch >= p2Data.stats?.goalsPerMatch ? 'text-emerald-400 font-extrabold' : 'text-slate-300'}`}>
                    {p1Data.stats?.goalsPerMatch ?? '0.00'}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Tỷ lệ bàn/trận</div>
                  <div className={`font-mono font-black ${p2Data.stats?.goalsPerMatch >= p1Data.stats?.goalsPerMatch ? 'text-cyan-400 font-extrabold' : 'text-slate-300'}`}>
                    {p2Data.stats?.goalsPerMatch ?? '0.00'}
                  </div>
                </div>

                {/* Row: Honours */}
                <div className="grid grid-cols-3 p-3 items-center text-center">
                  <div className="font-mono font-bold text-amber-400">
                    {p1Data.honours?.length ?? 0}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">Danh hiệu ghi nhận</div>
                  <div className="font-mono font-bold text-amber-400">
                    {p2Data.honours?.length ?? 0}
                  </div>
                </div>
              </div>

              {/* Dual Radar Chart */}
              {radarData.length > 0 && (
                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                  <h4 className="text-center text-sm font-bold text-white mb-2">
                    Đối Đầu Chỉ Số Kỹ Năng (Dual Radar)
                  </h4>
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData} outerRadius="75%">
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis
                          dataKey="subject"
                          stroke="#94a3b8"
                          tick={{ fill: '#cbd5e1', fontSize: 11 }}
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          stroke="#475569"
                          tick={{ fill: '#64748b', fontSize: 9 }}
                        />
                        <Radar
                          name={p1Data.strPlayer}
                          dataKey="player1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.35}
                        />
                        <Radar
                          name={p2Data.strPlayer}
                          dataKey="player2"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.35}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length >= 2) {
                              const d = payload[0].payload;
                              return (
                                <div className="bg-slate-950 border border-slate-700 p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                                  <p className="font-bold text-white">{d.subject}</p>
                                  <p className="text-emerald-400">{p1Data.strPlayer}: <span className="font-mono font-bold">{d.player1}/100</span></p>
                                  <p className="text-cyan-400">{p2Data.strPlayer}: <span className="font-mono font-bold">{d.player2}/100</span></p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-slate-400">
              Không thể so sánh 2 cầu thủ này. Vui lòng chọn lại.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
