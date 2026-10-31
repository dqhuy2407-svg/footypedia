import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, Sparkles, X, User } from 'lucide-react';

export default function SearchHero({ onSelectPlayer, trendingList = [], activePlayerId }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/players/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.data || []);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Lỗi tìm kiếm:', err);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (player) => {
    onSelectPlayer(player.idPlayer);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative overflow-hidden pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-radial from-slate-900 via-slate-950 to-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hệ thống cơ sở dữ liệu cầu thủ bóng đá thế giới</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
          Tra Cứu Cầu Thủ &{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Thống Kê Sự Nghiệp
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8">
          Tìm kiếm thông tin cá nhân, chỉ số bàn thắng, số trận ra sân qua từng câu lạc bộ, bộ sưu tập danh hiệu và biểu đồ kỹ năng bóng đá chuyên sâu.
        </p>

        {/* Search Bar Container */}
        <div ref={searchRef} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-4 pointer-events-none text-slate-400">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim() && setResults.length > 0 && setIsOpen(true)}
              placeholder="Nhập tên cầu thủ (VD: Messi, Ronaldo, Haaland, Mbappe, Son, Quang Hải...)"
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-base shadow-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition backdrop-blur-sm"
            />

            {query && (
              <button
                onClick={() => { setQuery(''); setResults([]); }}
                className="absolute right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl z-50 max-h-96 overflow-y-auto divide-y divide-slate-800/60 text-left">
              {results.length > 0 ? (
                results.map((player) => (
                  <div
                    key={player.idPlayer}
                    onClick={() => handleSelect(player)}
                    className="p-3.5 hover:bg-slate-800/80 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0 flex items-center justify-center">
                        {player.strCutout || player.strThumb ? (
                          <img
                            src={player.strCutout || player.strThumb}
                            alt={player.strPlayer}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition"
                          />
                        ) : (
                          <User className="w-6 h-6 text-slate-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white group-hover:text-emerald-400 transition">
                            {player.strPlayer}
                          </span>
                          {player.strNumber && (
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              #{player.strNumber}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="text-emerald-400/90 font-medium">{player.strTeam}</span>
                          <span>•</span>
                          <span>{player.strNationality}</span>
                          <span>•</span>
                          <span>{player.strPosition}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 group-hover:text-emerald-400 font-medium flex items-center gap-1 transition">
                      <span>Xem hồ sơ</span>
                      <span>→</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-sm">
                  Không tìm thấy cầu thủ nào khớp với từ khóa "{query}". Thử tìm theo họ hoặc tên tiếng Anh.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Trending Chips */}
        {trendingList.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Cầu thủ nổi bật:
            </span>
            {trendingList.map((item) => {
              const isActive = activePlayerId === item.idPlayer;
              return (
                <button
                  key={item.idPlayer}
                  onClick={() => onSelectPlayer(item.idPlayer)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition border flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {item.strThumb && (
                    <img
                      src={item.strThumb}
                      alt={item.strPlayer}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                  )}
                  <span>{item.strPlayer}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
