import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../frontend/dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files when built
app.use(express.static(distPath));

// In-memory cache to speed up requests & prevent API throttling
const cache = new Map();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function getCached(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data, ttlMs = CACHE_TTL_MS) {
  cache.set(key, { data, expiry: Date.now() + ttlMs });
}

const THE_SPORTS_DB_KEY = '123';
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${THE_SPORTS_DB_KEY}`;

// Curated list of popular players for home/quick access
const TRENDING_PLAYERS = [
  {
    idPlayer: '34146370',
    strPlayer: 'Lionel Messi',
    strNationality: 'Argentina',
    strTeam: 'Inter Miami',
    strPosition: 'Tiền đạo cánh phải / Hộ công',
    strNumber: '10',
    dateBorn: '1987-06-24',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/kpfsvp1725295651.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/e0i2051750317027.png',
    highlights: '8 Quả Bóng Vàng, Vô địch World Cup 2022, 4 Champions League'
  },
  {
    idPlayer: '34146304',
    strPlayer: 'Cristiano Ronaldo',
    strNationality: 'Portugal',
    strTeam: 'Al-Nassr',
    strPosition: 'Tiền đạo cắm',
    strNumber: '7',
    dateBorn: '1985-02-05',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/bkre241600892282.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/a19jje1761592498.png',
    highlights: '5 Quả Bóng Vàng, Cầu thủ ghi nhiều bàn thắng nhất lịch sử bóng đá'
  },
  {
    idPlayer: '34169116',
    strPlayer: 'Erling Haaland',
    strNationality: 'Norway',
    strTeam: 'Manchester City',
    strPosition: 'Tiền đạo cắm',
    strNumber: '9',
    dateBorn: '2000-07-21',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/bb1agj1727415216.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/e8cart1789115621.png',
    highlights: 'Vua phá lưới Premier League, Cú ăn ba lịch sử với Man City'
  },
  {
    idPlayer: '34162098',
    strPlayer: 'Kylian Mbappé',
    strNationality: 'France',
    strTeam: 'Real Madrid',
    strPosition: 'Tiền đạo trái / Trung phong',
    strNumber: '9',
    dateBorn: '1998-12-20',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/v08cj31778816426.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/cxrmkm1788114306.png',
    highlights: 'Vô địch World Cup 2018, Hat-trick chung kết World Cup 2022'
  },
  {
    idPlayer: '34171882',
    strPlayer: 'Jude Bellingham',
    strNationality: 'England',
    strTeam: 'Real Madrid',
    strPosition: 'Tiền vệ tấn công',
    strNumber: '5',
    dateBorn: '2003-06-29',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/rfg8xd1771263826.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/7idg7x1788113677.png',
    highlights: 'Golden Boy 2023, Cầu thủ xuất sắc nhất La Liga 2023-24'
  },
  {
    idPlayer: '34155057',
    strPlayer: 'Kevin De Bruyne',
    strNationality: 'Belgium',
    strTeam: 'Manchester City',
    strPosition: 'Tiền vệ kiến thiết',
    strNumber: '17',
    dateBorn: '1991-06-28',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/627wh81779038446.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/o4flia1764089447.png',
    highlights: 'Chuyên gia kiến tạo hàng đầu thế giới, 2x Cầu thủ xuất sắc nhất PFA'
  },
  {
    idPlayer: '34155394',
    strPlayer: 'Heung-min Son',
    strNationality: 'South Korea',
    strTeam: 'Tottenham Hotspur',
    strPosition: 'Tiền đạo cánh',
    strNumber: '7',
    dateBorn: '1992-07-08',
    strThumb: 'https://r2.thesportsdb.com/images/media/player/thumb/r5abfl1778974278.jpg',
    strCutout: 'https://r2.thesportsdb.com/images/media/player/cutout/a5cqf81766425262.png',
    highlights: 'Chiếc giày vàng Ngoại Hạng Anh 2021-22, Ngôi sao số 1 Châu Á'
  },
  {
    idPlayer: '34284047',
    strPlayer: 'Nguyễn Quang Hải',
    strNationality: 'Vietnam',
    strTeam: 'Công An Hà Nội',
    strPosition: 'Tiền vệ tấn công',
    strNumber: '19',
    dateBorn: '1997-04-12',
    strThumb: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format&fit=crop&q=60',
    strCutout: null,
    highlights: 'Quả Bóng Vàng Việt Nam 2018, Cầu vồng trong tuyết Thường Châu'
  }
];

// Helper: Translate position to Vietnamese
function translatePosition(pos) {
  if (!pos) return 'Cầu thủ';
  const p = pos.toLowerCase();
  if (p.includes('goalkeeper') || p.includes('keeper')) return 'Thủ môn (GK)';
  if (p.includes('centre-back') || p.includes('center-back') || p.includes('central defender')) return 'Trung vệ (CB)';
  if (p.includes('left-back') || p.includes('left back')) return 'Hậu vệ cánh trái (LB)';
  if (p.includes('right-back') || p.includes('right back')) return 'Hậu vệ cánh phải (RB)';
  if (p.includes('defender')) return 'Hậu vệ (DF)';
  if (p.includes('defensive midfield')) return 'Tiền vệ phòng ngự (CDM)';
  if (p.includes('attacking midfield')) return 'Tiền vệ tấn công (CAM)';
  if (p.includes('central midfield')) return 'Tiền vệ trung tâm (CM)';
  if (p.includes('midfield')) return 'Tiền vệ (MF)';
  if (p.includes('left winger') || p.includes('left wing')) return 'Tiền đạo cánh trái (LW)';
  if (p.includes('right winger') || p.includes('right wing')) return 'Tiền đạo cánh phải (RW)';
  if (p.includes('centre-forward') || p.includes('forward') || p.includes('striker')) return 'Tiền đạo cắm (ST/CF)';
  return pos;
}

// Helper: Calculate age from birthdate
function calculateAge(dateBorn) {
  if (!dateBorn) return null;
  const birth = new Date(dateBorn);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Helper: Estimate radar skills based on player position and stats
function estimatePlayerSkills(player, totalGoals = 0, totalApps = 0) {
  const pos = (player.strPosition || '').toLowerCase();
  const ratio = totalApps > 0 ? totalGoals / totalApps : 0.3;

  let pace = 80;
  let shooting = 75;
  let passing = 75;
  let dribbling = 78;
  let defending = 50;
  let physical = 74;

  if (pos.includes('forward') || pos.includes('striker') || pos.includes('centre-forward')) {
    pace = 86;
    shooting = Math.min(99, Math.round(82 + ratio * 20));
    passing = 74;
    dribbling = 82;
    defending = 42;
    physical = 83;
  } else if (pos.includes('winger') || pos.includes('wing')) {
    pace = 92;
    shooting = Math.min(96, Math.round(80 + ratio * 15));
    passing = 84;
    dribbling = 91;
    defending = 45;
    physical = 72;
  } else if (pos.includes('attacking midfield') || pos.includes('cam')) {
    pace = 82;
    shooting = 84;
    passing = 93;
    dribbling = 89;
    defending = 58;
    physical = 76;
  } else if (pos.includes('defensive midfield') || pos.includes('cdm')) {
    pace = 74;
    shooting = 68;
    passing = 86;
    dribbling = 78;
    defending = 88;
    physical = 87;
  } else if (pos.includes('defender') || pos.includes('back')) {
    pace = 77;
    shooting = 50;
    passing = 70;
    dribbling = 65;
    defending = 89;
    physical = 86;
  } else if (pos.includes('keeper')) {
    pace = 60;
    shooting = 30;
    passing = 70;
    dribbling = 45;
    defending = 92;
    physical = 85;
  }

  // Adjust for known legends
  if (player.strPlayer?.toLowerCase().includes('messi')) {
    pace = 86; shooting = 96; passing = 97; dribbling = 98; defending = 38; physical = 75;
  } else if (player.strPlayer?.toLowerCase().includes('ronaldo')) {
    pace = 88; shooting = 96; passing = 82; dribbling = 87; defending = 40; physical = 91;
  } else if (player.strPlayer?.toLowerCase().includes('haaland')) {
    pace = 91; shooting = 95; passing = 72; dribbling = 81; defending = 46; physical = 92;
  } else if (player.strPlayer?.toLowerCase().includes('mbappé') || player.strPlayer?.toLowerCase().includes('mbappe')) {
    pace = 97; shooting = 92; passing = 83; dribbling = 93; defending = 38; physical = 79;
  } else if (player.strPlayer?.toLowerCase().includes('bruyne')) {
    pace = 76; shooting = 88; passing = 97; dribbling = 87; defending = 65; physical = 78;
  }

  return [
    { subject: 'Tốc độ (PAC)', value: pace, fullMark: 100 },
    { subject: 'Dứt điểm (SHO)', value: shooting, fullMark: 100 },
    { subject: 'Chuyền bóng (PAS)', value: passing, fullMark: 100 },
    { subject: 'Rê bóng (DRI)', value: dribbling, fullMark: 100 },
    { subject: 'Phòng ngự (DEF)', value: defending, fullMark: 100 },
    { subject: 'Thể lực (PHY)', value: physical, fullMark: 100 }
  ];
}

// Endpoint: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Football Player Career API', timestamp: new Date().toISOString() });
});

// Endpoint: Trending / Featured players
app.get('/api/players/trending', (req, res) => {
  res.json({ success: true, count: TRENDING_PLAYERS.length, data: TRENDING_PLAYERS });
});

// Endpoint: Search players
app.get('/api/players/search', async (req, res) => {
  const query = (req.query.q || '').trim();
  if (!query) {
    return res.status(400).json({ success: false, message: 'Tham số tìm kiếm `q` là bắt buộc' });
  }

  const cacheKey = `search_${query.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json({ success: true, source: 'cache', count: cached.length, data: cached });
  }

  try {
    const fetchUrl = `${BASE_URL}/searchplayers.php?p=${encodeURIComponent(query)}`;
    const response = await fetch(fetchUrl);
    
    if (!response.ok) {
      throw new Error(`TheSportsDB API error: ${response.status}`);
    }

    const data = await response.json();
    const rawPlayers = data.player || [];

    // Filter only soccer players or general athletes
    const filtered = rawPlayers
      .filter(p => !p.strSport || p.strSport.toLowerCase() === 'soccer' || p.strSport.toLowerCase() === 'football')
      .map(p => ({
        idPlayer: p.idPlayer,
        strPlayer: p.strPlayer,
        strNationality: p.strNationality || 'Chưa rõ',
        strTeam: p.strTeam || 'Tự do',
        strPosition: translatePosition(p.strPosition),
        strRawPosition: p.strPosition,
        strNumber: p.strNumber || '',
        dateBorn: p.dateBorn || '',
        age: calculateAge(p.dateBorn),
        strThumb: p.strThumb || null,
        strCutout: p.strCutout || null,
        strRender: p.strRender || null
      }));

    setCache(cacheKey, filtered, 30 * 60 * 1000); // 30 min cache
    res.json({ success: true, source: 'live_api', count: filtered.length, data: filtered });
  } catch (error) {
    console.error('Error fetching player search:', error.message);
    
    // Fallback search against trending
    const fallbackResults = TRENDING_PLAYERS.filter(p => 
      p.strPlayer.toLowerCase().includes(query.toLowerCase()) ||
      p.strNationality.toLowerCase().includes(query.toLowerCase()) ||
      p.strTeam.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      source: 'fallback',
      warning: 'Không thể kết nối API quốc tế, hiển thị kết quả cục bộ',
      count: fallbackResults.length,
      data: fallbackResults
    });
  }
});

// Endpoint: Detailed player information + career timeline + honours
app.get('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `player_detail_${id}`;
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json({ success: true, source: 'cache', data: cached });
  }

  try {
    // Parallel fetch from TheSportsDB: details, former teams, honours
    const [detailsRes, formerTeamsRes, honoursRes] = await Promise.all([
      fetch(`${BASE_URL}/lookupplayer.php?id=${id}`),
      fetch(`${BASE_URL}/lookupformerteams.php?id=${id}`).catch(() => null),
      fetch(`${BASE_URL}/lookuphonours.php?id=${id}`).catch(() => null)
    ]);

    if (!detailsRes.ok) {
      throw new Error(`Player lookup error: ${detailsRes.status}`);
    }

    const detailsData = await detailsRes.json();
    const rawPlayer = detailsData.players && detailsData.players[0];

    if (!rawPlayer) {
      // Check if matches trending player
      const trendingMatch = TRENDING_PLAYERS.find(p => p.idPlayer === id);
      if (trendingMatch) {
        return res.json({ success: true, source: 'trending_profile', data: trendingMatch });
      }
      return res.status(404).json({ success: false, message: 'Không tìm thấy cầu thủ với ID này' });
    }

    // Former teams data
    let formerTeams = [];
    if (formerTeamsRes && formerTeamsRes.ok) {
      const ftData = await formerTeamsRes.json();
      formerTeams = ftData.formerteams || [];
    }

    // Honours data
    let honours = [];
    if (honoursRes && honoursRes.ok) {
      const hData = await honoursRes.json();
      honours = hData.honours || [];
    }

    // Process career club breakdown and totals
    let totalGoals = 0;
    let totalAppearances = 0;

    const clubCareer = formerTeams
      .filter(item => !item.strSport || item.strSport.toLowerCase() === 'soccer')
      .map(item => {
        const apps = item.intAppearances ? parseInt(item.intAppearances, 10) : 0;
        const goals = item.intGoals ? parseInt(item.intGoals, 10) : 0;
        totalAppearances += apps;
        totalGoals += goals;

        return {
          id: item.id,
          club: item.strFormerTeam,
          badge: item.strBadge,
          joined: item.strJoined || '?',
          departed: item.strDeparted || 'Hiện tại',
          period: `${item.strJoined || '?'} - ${item.strDeparted || 'Hiện tại'}`,
          appearances: apps,
          goals: goals,
          moveType: item.strMoveType || 'Chính thức'
        };
      });

    // Clean description: extract first 2 paragraphs
    const fullDesc = rawPlayer.strDescriptionEN || '';
    const bioParagraphs = fullDesc.split(/\r?\n\r?\n/).filter(p => p.trim().length > 30);
    const summaryEN = bioParagraphs.slice(0, 3).join('\n\n');

    // Build structured response
    const playerDetail = {
      idPlayer: rawPlayer.idPlayer,
      strPlayer: rawPlayer.strPlayer,
      strPlayerAlternate: rawPlayer.strPlayerAlternate,
      strNationality: rawPlayer.strNationality || 'Chưa rõ',
      strTeam: rawPlayer.strTeam || 'Tự do',
      strTeamNational: rawPlayer.strTeam2 || rawPlayer.strNationality,
      strPosition: translatePosition(rawPlayer.strPosition),
      strRawPosition: rawPlayer.strPosition,
      strNumber: rawPlayer.strNumber || 'N/A',
      strSigning: rawPlayer.strSigning,
      strWage: rawPlayer.strWage,
      strKit: rawPlayer.strKit,
      dateBorn: rawPlayer.dateBorn,
      age: calculateAge(rawPlayer.dateBorn),
      strBirthLocation: rawPlayer.strBirthLocation || 'Chưa rõ',
      strHeight: rawPlayer.strHeight || 'Chưa có thông tin',
      strWeight: rawPlayer.strWeight || 'Chưa có thông tin',
      strSide: rawPlayer.strSide === 'Left' ? 'Chân trái' : rawPlayer.strSide === 'Right' ? 'Chân phải' : rawPlayer.strSide || 'Chân thuận chưa rõ',
      strThumb: rawPlayer.strThumb,
      strCutout: rawPlayer.strCutout,
      strRender: rawPlayer.strRender,
      strBanner: rawPlayer.strBanner,
      strFanart: [rawPlayer.strFanart1, rawPlayer.strFanart2, rawPlayer.strFanart3, rawPlayer.strFanart4].filter(Boolean),
      social: {
        facebook: rawPlayer.strFacebook,
        instagram: rawPlayer.strInstagram,
        twitter: rawPlayer.strTwitter,
        website: rawPlayer.strWebsite,
        youtube: rawPlayer.strYoutube
      },
      summaryEN: summaryEN || 'Chưa có bài viết chi tiết.',
      stats: {
        totalGoals,
        totalAppearances,
        goalsPerMatch: totalAppearances > 0 ? (totalGoals / totalAppearances).toFixed(2) : '0.00',
        totalClubs: clubCareer.length,
        totalHonours: honours.length
      },
      skillsRadar: estimatePlayerSkills(rawPlayer, totalGoals, totalAppearances),
      clubCareer,
      honours: honours.map(h => ({
        id: h.id,
        honourName: h.strHonour,
        season: h.strSeason || 'Không rõ',
        team: h.strTeam,
        teamBadge: h.strTeamBadge,
        trophyImage: h.strHonourTrophy || h.strHonourLogo
      }))
    };

    setCache(cacheKey, playerDetail);
    res.json({ success: true, source: 'live_api', data: playerDetail });
  } catch (error) {
    console.error(`Error loading player ${id}:`, error.message);
    res.status(500).json({ success: false, message: 'Lỗi khi tải thông tin cầu thủ từ hệ thống dữ liệu quốc tế' });
  }
});

// Endpoint: Compare two players
app.get('/api/players/compare/:id1/:id2', async (req, res) => {
  const { id1, id2 } = req.params;

  try {
    const [p1Res, p2Res] = await Promise.all([
      fetch(`http://localhost:${PORT}/api/players/${id1}`).then(r => r.json()),
      fetch(`http://localhost:${PORT}/api/players/${id2}`).then(r => r.json())
    ]);

    if (!p1Res.success || !p2Res.success) {
      return res.status(404).json({ success: false, message: 'Một trong hai cầu thủ không tồn tại để so sánh' });
    }

    res.json({
      success: true,
      comparison: {
        player1: p1Res.data,
        player2: p2Res.data
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Không thể so sánh 2 cầu thủ' });
  }
});

// Fallback to React index.html for non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(200).send(`
    <html>
      <head><title>FootyPedia - Đang khởi động</title></head>
      <body style="background:#020617;color:#f8fafc;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
        <div style="text-align:center;padding:24px;border:1px solid #1e293b;border-radius:16px;max-width:500px;background:#0f172a;">
          <h2 style="color:#10b981;margin-bottom:8px;">⚽ FootyPedia Server Đang Hoạt Động</h2>
          <p style="color:#94a3b8;font-size:14px;line-height:1.6;">
            Backend đã kết nối thành công. Nếu bạn đang thấy trang này, vui lòng đảm bảo trên Render đã cấu hình <b>Build Command: npm run build</b>.
          </p>
          <div style="margin-top:16px;">
            <a href="/api/players/trending" style="color:#38bdf8;font-size:13px;text-decoration:none;">Kiểm tra API dữ liệu ➔</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`[FOOTY BACKEND] Server running on http://localhost:${PORT}`);
});
