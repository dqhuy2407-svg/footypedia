import React from 'react';
import {
  User,
  Shield,
  Flag,
  Calendar,
  Footprints,
  Ruler,
  Weight,
  Award,
  Flame,
  Activity,
  Globe,
  Share2,
  ExternalLink,
  FileText
} from 'lucide-react';
import CareerCharts from './CareerCharts';
import ClubTimeline from './ClubTimeline';
import HonoursShowcase from './HonoursShowcase';

export default function PlayerProfile({ player, onCompareWithThisPlayer }) {
  if (!player) return null;

  const {
    strPlayer,
    strPlayerAlternate,
    strNationality,
    strTeam,
    strTeamNational,
    strPosition,
    strNumber,
    strThumb,
    strCutout,
    strBanner,
    dateBorn,
    age,
    strBirthLocation,
    strHeight,
    strWeight,
    strSide,
    strSigning,
    stats = {},
    skillsRadar = [],
    clubCareer = [],
    honours = [],
    summaryEN,
    social = {}
  } = player;

  const avatar = strCutout || strThumb;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Profile Card */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Banner background */}
        <div className="h-44 sm:h-60 w-full relative bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 overflow-hidden">
          {strBanner && (
            <img
              src={strBanner}
              alt="Banner"
              className="w-full h-full object-cover opacity-25 filter blur-xs"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Compare Button */}
          {onCompareWithThisPlayer && (
            <button
              onClick={() => onCompareWithThisPlayer(player)}
              className="absolute top-4 right-4 z-10 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-emerald-500 hover:text-slate-950 text-white text-xs font-bold border border-slate-700/80 hover:border-emerald-400 transition shadow-lg flex items-center gap-2 backdrop-blur-md"
            >
              <Activity className="w-4 h-4 text-emerald-400 group-hover:text-slate-950" />
              <span>Đưa vào so sánh</span>
            </button>
          )}
        </div>

        {/* Player Header Content */}
        <div className="px-6 sm:px-10 pb-8 pt-0 -mt-20 sm:-mt-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            {/* Player Avatar */}
            <div className="relative group">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/50 shadow-2xl flex items-center justify-center p-1 relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={strPlayer}
                    className="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <User className="w-16 h-16 text-slate-600" />
                )}
              </div>
              {strNumber && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-black text-base flex items-center justify-center shadow-lg border-2 border-slate-900 font-mono">
                  #{strNumber}
                </div>
              )}
            </div>

            {/* Info details */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  {strPosition}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30">
                  {strTeam}
                </span>
                {strNationality && (
                  <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    🌍 {strNationality}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {strPlayer}
              </h1>
              {strPlayerAlternate && strPlayerAlternate !== strPlayer && (
                <p className="text-xs sm:text-sm text-slate-400 italic mt-0.5">
                  Tên đầy đủ: {strPlayerAlternate}
                </p>
              )}

              {/* Badges / Specs row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4 text-xs text-slate-300">
                {age && (
                  <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tuổi: <strong className="text-white">{age}</strong> ({dateBorn})</span>
                  </div>
                )}
                {strHeight && strHeight !== 'Chưa có thông tin' && (
                  <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Chiều cao: <strong className="text-white">{strHeight}</strong></span>
                  </div>
                )}
                {strWeight && strWeight !== 'Chưa có thông tin' && (
                  <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Weight className="w-3.5 h-3.5 text-purple-400" />
                    <span>Cân nặng: <strong className="text-white">{strWeight}</strong></span>
                  </div>
                )}
                {strSide && (
                  <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Footprints className="w-3.5 h-3.5 text-amber-400" />
                    <span>Thuận: <strong className="text-white">{strSide}</strong></span>
                  </div>
                )}
                {strBirthLocation && strBirthLocation !== 'Chưa rõ' && (
                  <div className="flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Flag className="w-3.5 h-3.5 text-rose-400" />
                    <span>Nơi sinh: <strong className="text-white">{strBirthLocation}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Social & External links */}
            <div className="flex md:flex-col items-center gap-2">
              {social.instagram && (
                <a
                  href={`https://${social.instagram.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950/60 hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 border border-slate-800 transition text-xs flex items-center gap-1.5"
                  title="Instagram"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-pink-400" />
                  <span className="hidden sm:inline">Instagram</span>
                </a>
              )}
              {social.facebook && (
                <a
                  href={`https://${social.facebook.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950/60 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 border border-slate-800 transition text-xs flex items-center gap-1.5"
                  title="Facebook"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              )}
              {social.twitter && (
                <a
                  href={`https://${social.twitter.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950/60 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 border border-slate-800 transition text-xs flex items-center gap-1.5"
                  title="Twitter / X"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">X / Twitter</span>
                </a>
              )}
              {social.website && (
                <a
                  href={`https://${social.website.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 rounded-xl bg-slate-950/60 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 border border-slate-800 transition text-xs flex items-center gap-1.5"
                  title="Website chính thức"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Website</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center">
              <div className="text-xs text-slate-400 font-medium mb-1">Tổng Bàn Thắng CLB</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {stats.totalGoals ?? 0}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Sự nghiệp thi đấu</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center">
              <div className="text-xs text-slate-400 font-medium mb-1">Tổng Số Trận</div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                {stats.totalAppearances ?? 0}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Trận chính thức</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center">
              <div className="text-xs text-slate-400 font-medium mb-1">Hiệu Suất / Trận</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {stats.goalsPerMatch ?? '0.00'}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Bàn thắng / Trận</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center">
              <div className="text-xs text-slate-400 font-medium mb-1">Số CLB Khoác Áo</div>
              <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
                {stats.totalClubs ?? clubCareer.length}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Câu lạc bộ</div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 text-center">
              <div className="text-xs text-slate-400 font-medium mb-1">Danh Hiệu & Cúp</div>
              <div className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono">
                {stats.totalHonours ?? honours.length}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Huy chương & Cup</div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Section: Bar Chart & Skill Radar */}
      <CareerCharts
        clubCareer={clubCareer}
        skillsRadar={skillsRadar}
        playerName={strPlayer}
      />

      {/* Career Clubs Journey Timeline */}
      <ClubTimeline clubCareer={clubCareer} />

      {/* Honours & Trophies */}
      <HonoursShowcase honours={honours} />

      {/* Bio / Career Summary */}
      {summaryEN && (
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm my-8">
          <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-slate-800">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-lg">Tiểu Sử & Dấu Ấn Đáng Nhớ</h3>
          </div>
          <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {summaryEN}
          </div>
        </div>
      )}
    </div>
  );
}
