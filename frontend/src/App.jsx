import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchHero from './components/SearchHero';
import PlayerProfile from './components/PlayerProfile';
import CompareModal from './components/CompareModal';
import { Loader2, AlertCircle, ShieldCheck, Globe, Cpu, Database, RefreshCw } from 'lucide-react';

export default function App() {
  const [selectedPlayerId, setSelectedPlayerId] = useState('34146370'); // Default to Lionel Messi
  const [playerData, setPlayerData] = useState(null);
  const [trendingList, setTrendingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [compareInitialPlayer, setCompareInitialPlayer] = useState(null);
  const [apiOnline, setApiOnline] = useState(true);

  // 1. Fetch trending players once
  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch('/api/players/trending');
        const data = await res.json();
        if (data.success) {
          setTrendingList(data.data || []);
        }
      } catch (err) {
        console.error('Không thể tải trending players:', err);
        setApiOnline(false);
      }
    }
    fetchTrending();
  }, []);

  // 2. Fetch player details whenever selectedPlayerId changes
  useEffect(() => {
    if (!selectedPlayerId) return;

    let ignore = false;
    async function fetchPlayer() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/players/${selectedPlayerId}`);
        if (!res.ok) {
          throw new Error(`Mã lỗi server: ${res.status}`);
        }
        const data = await res.json();
        if (!ignore) {
          if (data.success) {
            setPlayerData(data.data);
            setApiOnline(true);
          } else {
            setError(data.message || 'Không tìm thấy dữ liệu cầu thủ');
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error('Lỗi khi tải thông tin cầu thủ:', err);
          setError('Không thể kết nối đến máy chủ Backend hoặc nguồn API quốc tế.');
          setApiOnline(false);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchPlayer();
    return () => { ignore = true; };
  }, [selectedPlayerId]);

  const handleSelectPlayer = (id) => {
    setSelectedPlayerId(id);
    const profileElem = document.getElementById('player-profile-view');
    if (profileElem) {
      profileElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCompare = (player) => {
    setCompareInitialPlayer(player || playerData);
    setIsCompareOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        onOpenCompare={() => handleOpenCompare(playerData)}
        apiOnline={apiOnline}
      />

      {/* Hero & Search Section */}
      <SearchHero
        onSelectPlayer={handleSelectPlayer}
        trendingList={trendingList}
        activePlayerId={selectedPlayerId}
      />

      {/* Main Content Area */}
      <main id="player-profile-view" className="flex-1">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center px-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-emerald-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
                ⚽
              </div>
            </div>
            <h3 className="mt-6 text-lg font-bold text-white">Đang tải hồ sơ & thống kê sự nghiệp...</h3>
            <p className="text-sm text-slate-400 max-w-md mt-1">
              Đang đồng bộ dữ liệu quốc tế từ TheSportsDB API, phân tích bàn thắng, số trận ra sân và danh hiệu.
            </p>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto my-16 px-4">
            <div className="bg-red-950/40 border border-red-800/80 rounded-2xl p-6 text-center shadow-xl">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Không thể tải dữ liệu</h3>
              <p className="text-sm text-red-200/80 mb-4">{error}</p>
              <button
                onClick={() => setSelectedPlayerId('34146370')}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Xem cầu thủ mẫu (Lionel Messi)</span>
              </button>
            </div>
          </div>
        ) : (
          playerData && (
            <PlayerProfile
              player={playerData}
              onCompareWithThisPlayer={handleOpenCompare}
            />
          )
        )}
      </main>

      {/* Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        initialPlayer1={compareInitialPlayer || playerData}
        trendingList={trendingList}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-slate-400">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="font-bold text-white">FootyPedia Pro</span>
            <span>—</span>
            <span>Ứng dụng tra cứu cầu thủ & thống kê sự nghiệp bóng đá</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> React 19 + Vite
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> Node.js & Express
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-400" /> Live REST API (TheSportsDB)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
