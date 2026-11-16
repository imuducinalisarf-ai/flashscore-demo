// ============================================================
//  data.js  –  All fake/static data for the FlashScore clone
// ============================================================

const LEAGUES = [
  { id: 'pl',         name: 'Premier League',  country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', shortName: 'PL' },
  { id: 'laliga',     name: 'La Liga',          country: 'Spain',   flag: '🇪🇸', shortName: 'LL' },
  { id: 'seriea',     name: 'Serie A',          country: 'Italy',   flag: '🇮🇹', shortName: 'SA' },
  { id: 'bundesliga', name: 'Bundesliga',       country: 'Germany', flag: '🇩🇪', shortName: 'BL' },
  { id: 'ligue1',     name: 'Ligue 1',          country: 'France',  flag: '🇫🇷', shortName: 'L1' },
  { id: 'superliga',  name: 'Superliga',        country: 'Romania', flag: '🇷🇴', shortName: 'SL' },
];

const TEAMS = {
  pl: [
    { id: 'mci', name: 'Manchester City',   short: 'MCI', color: '#6CABDD' },
    { id: 'ars', name: 'Arsenal',            short: 'ARS', color: '#EF0107' },
    { id: 'liv', name: 'Liverpool',          short: 'LIV', color: '#C8102E' },
    { id: 'che', name: 'Chelsea',            short: 'CHE', color: '#034694' },
    { id: 'mun', name: 'Manchester United',  short: 'MUN', color: '#DA291C' },
    { id: 'tot', name: 'Tottenham',          short: 'TOT', color: '#132257' },
    { id: 'new', name: 'Newcastle United',   short: 'NEW', color: '#241F20' },
    { id: 'avl', name: 'Aston Villa',        short: 'AVL', color: '#95BFE5' },
  ],
  laliga: [
    { id: 'rma', name: 'Real Madrid',        short: 'RMA', color: '#FEBE10' },
    { id: 'bar', name: 'Barcelona',          short: 'BAR', color: '#A50044' },
    { id: 'atm', name: 'Atletico Madrid',    short: 'ATM', color: '#CB3524' },
    { id: 'sev', name: 'Sevilla',            short: 'SEV', color: '#D4021D' },
    { id: 'val', name: 'Valencia',           short: 'VAL', color: '#EF7D00' },
    { id: 'bet', name: 'Real Betis',         short: 'BET', color: '#00954C' },
    { id: 'vil', name: 'Villarreal',         short: 'VIL', color: '#FFD700' },
    { id: 'ath', name: 'Athletic Bilbao',    short: 'ATH', color: '#EE1520' },
  ],
  seriea: [
    { id: 'int', name: 'Inter Milan',        short: 'INT', color: '#010E80' },
    { id: 'acm', name: 'AC Milan',           short: 'ACM', color: '#FB090B' },
    { id: 'juv', name: 'Juventus',           short: 'JUV', color: '#000000' },
    { id: 'nap', name: 'Napoli',             short: 'NAP', color: '#087AC1' },
    { id: 'laz', name: 'Lazio',             short: 'LAZ', color: '#87D8F7' },
    { id: 'rom', name: 'Roma',               short: 'ROM', color: '#8B1A1A' },
    { id: 'fio', name: 'Fiorentina',         short: 'FIO', color: '#4A148C' },
    { id: 'ata', name: 'Atalanta',           short: 'ATA', color: '#1E88E5' },
  ],
  bundesliga: [
    { id: 'bay', name: 'Bayern Munich',      short: 'BAY', color: '#DC052D' },
    { id: 'bvb', name: 'Borussia Dortmund',  short: 'BVB', color: '#FDE100' },
    { id: 'rbl', name: 'RB Leipzig',         short: 'RBL', color: '#DD0741' },
    { id: 'b04', name: 'Bayer Leverkusen',   short: 'B04', color: '#E32221' },
    { id: 'sgf', name: 'Eintracht Frankfurt',short: 'SGF', color: '#E1000F' },
    { id: 'wob', name: 'Wolfsburg',          short: 'WOB', color: '#64A12D' },
    { id: 'scf', name: 'SC Freiburg',        short: 'SCF', color: '#E22B2B' },
    { id: 'bmg', name: 'Borussia M\'gladbach',short: 'BMG', color: '#000000' },
  ],
  ligue1: [
    { id: 'psg', name: 'PSG',                short: 'PSG', color: '#004170' },
    { id: 'mar', name: 'Marseille',           short: 'MAR', color: '#2FB3E8' },
    { id: 'oly', name: 'Lyon',               short: 'OLY', color: '#0033A0' },
    { id: 'mon', name: 'Monaco',             short: 'MON', color: '#D2001E' },
    { id: 'lil', name: 'Lille',              short: 'LIL', color: '#E2002B' },
    { id: 'ren', name: 'Rennes',             short: 'REN', color: '#000000' },
    { id: 'nic', name: 'Nice',               short: 'NIC', color: '#C8102E' },
    { id: 'len', name: 'Lens',               short: 'LEN', color: '#FFCD00' },
  ],
  superliga: [
    { id: 'fcs', name: 'FCSB',              short: 'FCS', color: '#C8102E' },
    { id: 'cfr', name: 'CFR Cluj',           short: 'CFR', color: '#7B0000' },
    { id: 'rap', name: 'Rapid București',    short: 'RAP', color: '#C8000A' },
    { id: 'ucv', name: 'U. Craiova',         short: 'UCV', color: '#004FA3' },
    { id: 'far', name: 'Farul Constanța',    short: 'FAR', color: '#002868' },
    { id: 'sep', name: 'Sepsi OSK',          short: 'SEP', color: '#CF0A2C' },
    { id: 'pet', name: 'Petrolul Ploiești',  short: 'PET', color: '#FFD700' },
    { id: 'ucl', name: 'U Cluj',             short: 'UCL', color: '#1E3A5F' },
  ],
};

const MATCHES = [
  // Premier League
  { id: 'm001', leagueId: 'pl', homeTeam: 'mci', awayTeam: 'ars', homeScore: 2, awayScore: 1, minute: 67, status: 'LIVE', date: '2026-04-17', time: '20:45', odds: { home: 1.85, draw: 3.60, away: 4.20 } },
  { id: 'm002', leagueId: 'pl', homeTeam: 'liv', awayTeam: 'che', homeScore: 3, awayScore: 1, minute: 90, status: 'FT',   date: '2026-04-17', time: '18:00', odds: { home: 1.70, draw: 3.80, away: 5.00 } },
  { id: 'm003', leagueId: 'pl', homeTeam: 'mun', awayTeam: 'tot', homeScore: 1, awayScore: 1, minute: 45, status: 'HT',   date: '2026-04-17', time: '15:00', odds: { home: 2.10, draw: 3.30, away: 3.50 } },
  { id: 'm004', leagueId: 'pl', homeTeam: 'new', awayTeam: 'avl', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-17', time: '21:00', odds: { home: 2.40, draw: 3.20, away: 3.10 } },
  { id: 'm005', leagueId: 'pl', homeTeam: 'che', awayTeam: 'mci', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-18', time: '17:30', odds: { home: 3.50, draw: 3.60, away: 2.05 } },
  // La Liga
  { id: 'm006', leagueId: 'laliga', homeTeam: 'rma', awayTeam: 'bar', homeScore: 1, awayScore: 0, minute: 55, status: 'LIVE', date: '2026-04-17', time: '21:00', odds: { home: 2.20, draw: 3.40, away: 3.10 } },
  { id: 'm007', leagueId: 'laliga', homeTeam: 'atm', awayTeam: 'sev', homeScore: 2, awayScore: 0, minute: 90, status: 'FT',   date: '2026-04-17', time: '19:00', odds: { home: 1.65, draw: 3.90, away: 5.50 } },
  { id: 'm008', leagueId: 'laliga', homeTeam: 'val', awayTeam: 'vil', homeScore: 1, awayScore: 2, minute: 78, status: 'LIVE', date: '2026-04-17', time: '20:00', odds: { home: 2.80, draw: 3.20, away: 2.60 } },
  { id: 'm009', leagueId: 'laliga', homeTeam: 'bet', awayTeam: 'ath', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-18', time: '17:00', odds: { home: 2.60, draw: 3.10, away: 2.90 } },
  { id: 'm010', leagueId: 'laliga', homeTeam: 'bar', awayTeam: 'atm', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-19', time: '20:00', odds: { home: 1.90, draw: 3.50, away: 4.10 } },
  // Serie A
  { id: 'm011', leagueId: 'seriea', homeTeam: 'int', awayTeam: 'acm', homeScore: 1, awayScore: 1, minute: 88, status: 'LIVE', date: '2026-04-17', time: '20:45', odds: { home: 2.10, draw: 3.30, away: 3.60 } },
  { id: 'm012', leagueId: 'seriea', homeTeam: 'juv', awayTeam: 'nap', homeScore: 0, awayScore: 1, minute: 90, status: 'FT',   date: '2026-04-17', time: '18:00', odds: { home: 2.00, draw: 3.40, away: 3.80 } },
  { id: 'm013', leagueId: 'seriea', homeTeam: 'rom', awayTeam: 'fio', homeScore: 2, awayScore: 0, minute: 45, status: 'HT',   date: '2026-04-17', time: '15:00', odds: { home: 1.95, draw: 3.50, away: 4.00 } },
  { id: 'm014', leagueId: 'seriea', homeTeam: 'laz', awayTeam: 'ata', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-18', time: '20:45', odds: { home: 2.70, draw: 3.20, away: 2.80 } },
  // Bundesliga
  { id: 'm015', leagueId: 'bundesliga', homeTeam: 'bay', awayTeam: 'bvb', homeScore: 3, awayScore: 2, minute: 90, status: 'FT',   date: '2026-04-17', time: '18:30', odds: { home: 1.55, draw: 4.20, away: 5.80 } },
  { id: 'm016', leagueId: 'bundesliga', homeTeam: 'rbl', awayTeam: 'b04', homeScore: 1, awayScore: 0, minute: 34, status: 'LIVE', date: '2026-04-17', time: '20:30', odds: { home: 2.30, draw: 3.30, away: 3.10 } },
  { id: 'm017', leagueId: 'bundesliga', homeTeam: 'sgf', awayTeam: 'wob', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-18', time: '15:30', odds: { home: 2.20, draw: 3.20, away: 3.40 } },
  { id: 'm018', leagueId: 'bundesliga', homeTeam: 'bmg', awayTeam: 'scf', homeScore: 1, awayScore: 1, minute: 45, status: 'HT',   date: '2026-04-17', time: '15:30', odds: { home: 2.70, draw: 3.10, away: 2.80 } },
  // Ligue 1
  { id: 'm019', leagueId: 'ligue1', homeTeam: 'psg', awayTeam: 'mar', homeScore: 4, awayScore: 0, minute: 90, status: 'FT',   date: '2026-04-17', time: '21:00', odds: { home: 1.35, draw: 5.00, away: 8.00 } },
  { id: 'm020', leagueId: 'ligue1', homeTeam: 'oly', awayTeam: 'mon', homeScore: 2, awayScore: 2, minute: 72, status: 'LIVE', date: '2026-04-17', time: '19:00', odds: { home: 2.50, draw: 3.20, away: 2.90 } },
  { id: 'm021', leagueId: 'ligue1', homeTeam: 'lil', awayTeam: 'ren', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-18', time: '19:00', odds: { home: 2.40, draw: 3.10, away: 3.00 } },
  { id: 'm022', leagueId: 'ligue1', homeTeam: 'nic', awayTeam: 'len', homeScore: 1, awayScore: 0, minute: 60, status: 'LIVE', date: '2026-04-17', time: '20:00', odds: { home: 2.20, draw: 3.20, away: 3.30 } },
  // Superliga
  { id: 'm023', leagueId: 'superliga', homeTeam: 'fcs', awayTeam: 'cfr', homeScore: 1, awayScore: 0, minute: 44, status: 'LIVE', date: '2026-04-17', time: '20:00', odds: { home: 2.10, draw: 3.00, away: 3.60 } },
  { id: 'm024', leagueId: 'superliga', homeTeam: 'rap', awayTeam: 'ucv', homeScore: 2, awayScore: 1, minute: 90, status: 'FT',   date: '2026-04-17', time: '17:00', odds: { home: 2.30, draw: 3.10, away: 3.20 } },
  { id: 'm025', leagueId: 'superliga', homeTeam: 'far', awayTeam: 'sep', homeScore: 0, awayScore: 1, minute: 85, status: 'LIVE', date: '2026-04-17', time: '19:30', odds: { home: 2.60, draw: 3.00, away: 2.80 } },
  { id: 'm026', leagueId: 'superliga', homeTeam: 'pet', awayTeam: 'ucl', homeScore: 0, awayScore: 0, minute: 0,  status: 'NS',   date: '2026-04-18', time: '18:00', odds: { home: 2.50, draw: 3.10, away: 2.90 } },
];

const MATCH_STATS = {
  'm001': { possession: [58, 42], shotsOnTarget: [7, 4], shots: [14, 9], fouls: [11, 13], corners: [6, 4], yellowCards: [1, 2], redCards: [0, 0] },
  'm006': { possession: [52, 48], shotsOnTarget: [5, 6], shots: [12, 14], fouls: [9, 12], corners: [5, 7], yellowCards: [2, 1], redCards: [0, 0] },
  'm011': { possession: [55, 45], shotsOnTarget: [6, 5], shots: [13, 10], fouls: [10, 11], corners: [4, 5], yellowCards: [1, 1], redCards: [0, 0] },
  'm023': { possession: [47, 53], shotsOnTarget: [3, 5], shots: [8, 11], fouls: [14, 8], corners: [3, 6], yellowCards: [2, 1], redCards: [0, 0] },
};

const MATCH_EVENTS = {
  'm001': [
    { minute: 23, type: 'goal', team: 'mci', player: 'Haaland', assist: 'De Bruyne' },
    { minute: 41, type: 'yellow', team: 'ars', player: 'Xhaka' },
    { minute: 58, type: 'goal', team: 'ars', player: 'Saka', assist: 'Ødegaard' },
    { minute: 63, type: 'goal', team: 'mci', player: 'Foden', assist: 'Silva' },
  ],
  'm006': [
    { minute: 31, type: 'goal', team: 'rma', player: 'Bellingham', assist: 'Vinicius Jr.' },
    { minute: 55, type: 'yellow', team: 'bar', player: 'Gavi' },
  ],
};

const STANDINGS = {
  pl: [
    { pos: 1, teamId: 'mci', played: 31, won: 22, drawn: 5, lost: 4, gf: 74, ga: 35, gd: 39, pts: 71, form: ['W','W','D','W','W'] },
    { pos: 2, teamId: 'ars', played: 31, won: 21, drawn: 6, lost: 4, gf: 70, ga: 34, gd: 36, pts: 69, form: ['W','D','W','W','L'] },
    { pos: 3, teamId: 'liv', played: 31, won: 20, drawn: 7, lost: 4, gf: 66, ga: 38, gd: 28, pts: 67, form: ['W','W','W','D','W'] },
    { pos: 4, teamId: 'che', played: 31, won: 17, drawn: 5, lost: 9, gf: 58, ga: 48, gd: 10, pts: 56, form: ['L','W','W','D','W'] },
    { pos: 5, teamId: 'mun', played: 31, won: 14, drawn: 6, lost: 11, gf: 44, ga: 51, gd: -7, pts: 48, form: ['D','L','W','L','D'] },
    { pos: 6, teamId: 'tot', played: 31, won: 13, drawn: 7, lost: 11, gf: 55, ga: 55, gd: 0,  pts: 46, form: ['W','D','D','L','W'] },
    { pos: 7, teamId: 'new', played: 31, won: 13, drawn: 5, lost: 13, gf: 48, ga: 54, gd: -6, pts: 44, form: ['L','W','L','W','D'] },
    { pos: 8, teamId: 'avl', played: 31, won: 12, drawn: 6, lost: 13, gf: 50, ga: 58, gd: -8, pts: 42, form: ['W','L','D','W','L'] },
  ],
  laliga: [
    { pos: 1, teamId: 'rma', played: 30, won: 22, drawn: 4, lost: 4, gf: 68, ga: 32, gd: 36, pts: 70, form: ['W','W','W','D','W'] },
    { pos: 2, teamId: 'bar', played: 30, won: 20, drawn: 5, lost: 5, gf: 65, ga: 35, gd: 30, pts: 65, form: ['W','D','W','W','L'] },
    { pos: 3, teamId: 'atm', played: 30, won: 18, drawn: 6, lost: 6, gf: 55, ga: 30, gd: 25, pts: 60, form: ['W','W','D','W','W'] },
    { pos: 4, teamId: 'sev', played: 30, won: 14, drawn: 7, lost: 9, gf: 48, ga: 42, gd: 6,  pts: 49, form: ['D','W','L','D','W'] },
    { pos: 5, teamId: 'val', played: 30, won: 12, drawn: 8, lost: 10, gf: 42, ga: 45, gd: -3, pts: 44, form: ['L','D','W','L','D'] },
    { pos: 6, teamId: 'vil', played: 30, won: 12, drawn: 7, lost: 11, gf: 44, ga: 47, gd: -3, pts: 43, form: ['W','L','D','W','L'] },
    { pos: 7, teamId: 'bet', played: 30, won: 11, drawn: 8, lost: 11, gf: 40, ga: 46, gd: -6, pts: 41, form: ['D','W','L','D','W'] },
    { pos: 8, teamId: 'ath', played: 30, won: 10, drawn: 9, lost: 11, gf: 38, ga: 44, gd: -6, pts: 39, form: ['L','D','W','W','D'] },
  ],
  seriea: [
    { pos: 1, teamId: 'int', played: 31, won: 23, drawn: 5, lost: 3, gf: 72, ga: 26, gd: 46, pts: 74, form: ['W','W','D','W','W'] },
    { pos: 2, teamId: 'acm', played: 31, won: 20, drawn: 6, lost: 5, gf: 62, ga: 34, gd: 28, pts: 66, form: ['W','D','W','W','D'] },
    { pos: 3, teamId: 'juv', played: 31, won: 18, drawn: 7, lost: 6, gf: 55, ga: 35, gd: 20, pts: 61, form: ['L','W','D','W','W'] },
    { pos: 4, teamId: 'nap', played: 31, won: 17, drawn: 6, lost: 8, gf: 60, ga: 42, gd: 18, pts: 57, form: ['W','W','L','D','W'] },
    { pos: 5, teamId: 'laz', played: 31, won: 14, drawn: 5, lost: 12, gf: 48, ga: 50, gd: -2, pts: 47, form: ['D','L','W','D','L'] },
    { pos: 6, teamId: 'rom', played: 31, won: 12, drawn: 8, lost: 11, gf: 46, ga: 48, gd: -2, pts: 44, form: ['W','D','D','W','L'] },
    { pos: 7, teamId: 'ata', played: 31, won: 12, drawn: 7, lost: 12, gf: 50, ga: 52, gd: -2, pts: 43, form: ['W','L','W','L','D'] },
    { pos: 8, teamId: 'fio', played: 31, won: 11, drawn: 7, lost: 13, gf: 40, ga: 50, gd: -10, pts: 40, form: ['L','D','L','W','W'] },
  ],
  bundesliga: [
    { pos: 1, teamId: 'bay', played: 30, won: 22, drawn: 4, lost: 4, gf: 78, ga: 34, gd: 44, pts: 70, form: ['W','W','W','W','D'] },
    { pos: 2, teamId: 'bvb', played: 30, won: 18, drawn: 5, lost: 7, gf: 58, ga: 42, gd: 16, pts: 59, form: ['W','D','L','W','W'] },
    { pos: 3, teamId: 'rbl', played: 30, won: 17, drawn: 6, lost: 7, gf: 56, ga: 40, gd: 16, pts: 57, form: ['W','W','D','L','W'] },
    { pos: 4, teamId: 'b04', played: 30, won: 16, drawn: 5, lost: 9, gf: 54, ga: 44, gd: 10, pts: 53, form: ['D','W','W','L','D'] },
    { pos: 5, teamId: 'sgf', played: 30, won: 12, drawn: 8, lost: 10, gf: 46, ga: 46, gd: 0,  pts: 44, form: ['D','L','W','D','W'] },
    { pos: 6, teamId: 'wob', played: 30, won: 11, drawn: 7, lost: 12, gf: 42, ga: 50, gd: -8, pts: 40, form: ['L','W','D','L','W'] },
    { pos: 7, teamId: 'scf', played: 30, won: 10, drawn: 8, lost: 12, gf: 38, ga: 48, gd: -10, pts: 38, form: ['W','L','D','D','L'] },
    { pos: 8, teamId: 'bmg', played: 30, won: 9,  drawn: 7, lost: 14, gf: 36, ga: 56, gd: -20, pts: 34, form: ['L','D','L','W','L'] },
  ],
  ligue1: [
    { pos: 1, teamId: 'psg', played: 31, won: 25, drawn: 4, lost: 2, gf: 80, ga: 28, gd: 52, pts: 79, form: ['W','W','W','W','W'] },
    { pos: 2, teamId: 'mar', played: 31, won: 18, drawn: 6, lost: 7, gf: 58, ga: 36, gd: 22, pts: 60, form: ['W','D','W','L','W'] },
    { pos: 3, teamId: 'oly', played: 31, won: 17, drawn: 7, lost: 7, gf: 55, ga: 40, gd: 15, pts: 58, form: ['D','W','D','W','W'] },
    { pos: 4, teamId: 'mon', played: 31, won: 16, drawn: 5, lost: 10, gf: 54, ga: 44, gd: 10, pts: 53, form: ['L','W','W','D','L'] },
    { pos: 5, teamId: 'lil', played: 31, won: 14, drawn: 7, lost: 10, gf: 48, ga: 42, gd: 6,  pts: 49, form: ['W','D','L','W','D'] },
    { pos: 6, teamId: 'nic', played: 31, won: 13, drawn: 6, lost: 12, gf: 44, ga: 46, gd: -2, pts: 45, form: ['W','L','D','W','L'] },
    { pos: 7, teamId: 'ren', played: 31, won: 12, drawn: 6, lost: 13, gf: 42, ga: 50, gd: -8, pts: 42, form: ['D','L','W','D','W'] },
    { pos: 8, teamId: 'len', played: 31, won: 10, drawn: 8, lost: 13, gf: 38, ga: 52, gd: -14, pts: 38, form: ['L','D','D','L','W'] },
  ],
  superliga: [
    { pos: 1, teamId: 'fcs', played: 28, won: 18, drawn: 5, lost: 5, gf: 56, ga: 28, gd: 28, pts: 59, form: ['W','W','D','W','W'] },
    { pos: 2, teamId: 'cfr', played: 28, won: 16, drawn: 7, lost: 5, gf: 48, ga: 26, gd: 22, pts: 55, form: ['W','D','W','W','D'] },
    { pos: 3, teamId: 'rap', played: 28, won: 14, drawn: 6, lost: 8, gf: 44, ga: 34, gd: 10, pts: 48, form: ['W','L','W','D','W'] },
    { pos: 4, teamId: 'ucv', played: 28, won: 12, drawn: 8, lost: 8, gf: 40, ga: 36, gd: 4,  pts: 44, form: ['D','W','D','L','W'] },
    { pos: 5, teamId: 'far', played: 28, won: 11, drawn: 6, lost: 11, gf: 36, ga: 38, gd: -2, pts: 39, form: ['L','D','W','L','W'] },
    { pos: 6, teamId: 'sep', played: 28, won: 10, drawn: 6, lost: 12, gf: 34, ga: 42, gd: -8, pts: 36, form: ['W','L','L','D','W'] },
    { pos: 7, teamId: 'pet', played: 28, won: 8,  drawn: 7, lost: 13, gf: 30, ga: 46, gd: -16, pts: 31, form: ['L','D','L','W','L'] },
    { pos: 8, teamId: 'ucl', played: 28, won: 7,  drawn: 6, lost: 15, gf: 28, ga: 52, gd: -24, pts: 27, form: ['L','L','D','L','D'] },
  ],
};

const TOP_SCORERS = {
  pl: [
    { player: 'Erling Haaland',   teamId: 'mci', goals: 24, assists: 5,  apps: 28 },
    { player: 'Bukayo Saka',       teamId: 'ars', goals: 18, assists: 12, apps: 30 },
    { player: 'Mohamed Salah',     teamId: 'liv', goals: 17, assists: 11, apps: 29 },
    { player: 'Cole Palmer',       teamId: 'che', goals: 16, assists: 8,  apps: 30 },
    { player: 'Son Heung-min',     teamId: 'tot', goals: 14, assists: 7,  apps: 29 },
  ],
  laliga: [
    { player: 'Robert Lewandowski',teamId: 'bar', goals: 22, assists: 7,  apps: 28 },
    { player: 'Jude Bellingham',   teamId: 'rma', goals: 20, assists: 10, apps: 28 },
    { player: 'Vinicius Jr.',      teamId: 'rma', goals: 18, assists: 14, apps: 27 },
    { player: 'Antoine Griezmann', teamId: 'atm', goals: 15, assists: 8,  apps: 29 },
    { player: 'Dani Olmo',         teamId: 'bar', goals: 13, assists: 9,  apps: 28 },
  ],
  seriea: [
    { player: 'Lautaro Martinez',  teamId: 'int', goals: 25, assists: 6,  apps: 29 },
    { player: 'Rafael Leao',       teamId: 'acm', goals: 18, assists: 10, apps: 28 },
    { player: 'Kylian Mbappe',     teamId: 'nap', goals: 16, assists: 8,  apps: 26 },
    { player: 'Dusan Vlahovic',    teamId: 'juv', goals: 15, assists: 4,  apps: 28 },
    { player: 'Paulo Dybala',      teamId: 'rom', goals: 13, assists: 9,  apps: 27 },
  ],
  bundesliga: [
    { player: 'Harry Kane',        teamId: 'bay', goals: 28, assists: 8,  apps: 28 },
    { player: 'Niclas Fullkrug',   teamId: 'bvb', goals: 16, assists: 5,  apps: 27 },
    { player: 'Lois Openda',       teamId: 'rbl', goals: 15, assists: 6,  apps: 28 },
    { player: 'Granit Xhaka',      teamId: 'b04', goals: 10, assists: 12, apps: 29 },
    { player: 'Omar Marmoush',     teamId: 'sgf', goals: 14, assists: 9,  apps: 27 },
  ],
  ligue1: [
    { player: 'Ousmane Dembélé',   teamId: 'psg', goals: 22, assists: 11, apps: 29 },
    { player: 'Pierre-Emerick A.', teamId: 'mar', goals: 18, assists: 6,  apps: 28 },
    { player: 'Alexandre Lacazette',teamId: 'oly', goals: 16, assists: 5, apps: 30 },
    { player: 'Folarin Balogun',   teamId: 'mon', goals: 14, assists: 7,  apps: 27 },
    { player: 'Jonathan David',    teamId: 'lil', goals: 20, assists: 4,  apps: 29 },
  ],
  superliga: [
    { player: 'Florin Tănase',     teamId: 'fcs', goals: 18, assists: 8,  apps: 26 },
    { player: 'Billel Omrani',     teamId: 'cfr', goals: 14, assists: 5,  apps: 24 },
    { player: 'Rareș Itu',         teamId: 'rap', goals: 12, assists: 9,  apps: 25 },
    { player: 'Elvir Koljic',      teamId: 'ucv', goals: 11, assists: 4,  apps: 23 },
    { player: 'Louis Munteanu',    teamId: 'far', goals: 10, assists: 6,  apps: 24 },
  ],
};

const GALLERY_IMAGES = [
  { url: 'https://picsum.photos/seed/football1/1200/600', caption: 'Premier League – Spectacular Goal of the Week' },
  { url: 'https://picsum.photos/seed/football2/1200/600', caption: 'El Clásico – Real Madrid vs Barcelona' },
  { url: 'https://picsum.photos/seed/football3/1200/600', caption: 'Derby della Madonnina – Inter vs Milan' },
  { url: 'https://picsum.photos/seed/football4/1200/600', caption: 'Der Klassiker – Bayern vs Dortmund' },
  { url: 'https://picsum.photos/seed/football5/1200/600', caption: 'Ligue 1 – PSG Domination' },
  { url: 'https://picsum.photos/seed/football6/1200/600', caption: 'Superliga – FCSB vs CFR Cluj' },
  { url: 'https://picsum.photos/seed/football7/1200/600', caption: 'Champions League Night' },
  { url: 'https://picsum.photos/seed/football8/1200/600', caption: 'World Cup Memories' },
];

const ADMIN_USERS = [
  { id: 1, name: 'Admin User',    email: 'admin@flashscore.ro',  role: 'admin',  status: 'active', joined: '2024-01-01' },
  { id: 2, name: 'Ion Popescu',   email: 'ion.p@gmail.com',       role: 'user',   status: 'active', joined: '2024-03-15' },
  { id: 3, name: 'Maria Ionescu', email: 'maria.i@yahoo.com',     role: 'user',   status: 'active', joined: '2024-04-02' },
  { id: 4, name: 'Alex Marin',    email: 'alex.m@hotmail.com',    role: 'user',   status: 'banned', joined: '2024-02-20' },
  { id: 5, name: 'Elena Dumitrescu', email: 'elena.d@gmail.com',  role: 'user',   status: 'active', joined: '2024-05-10' },
  { id: 6, name: 'Mihai Stanescu',email: 'mihai.s@yahoo.com',     role: 'user',   status: 'active', joined: '2024-06-01' },
  { id: 7, name: 'Andrei Popa',   email: 'andrei.p@gmail.com',    role: 'user',   status: 'active', joined: '2025-01-14' },
];

function getTeam(leagueId, teamId) {
  return TEAMS[leagueId]?.find(t => t.id === teamId) || { name: teamId, short: teamId, color: '#888' };
}

function getTeamByIdGlobal(teamId) {
  for (const lg of Object.values(TEAMS)) {
    const found = lg.find(t => t.id === teamId);
    if (found) return found;
  }
  return null;
}

function getMatchesByLeague(leagueId) {
  return MATCHES.filter(m => m.leagueId === leagueId);
}

function getLeague(leagueId) {
  return LEAGUES.find(l => l.id === leagueId);
}
