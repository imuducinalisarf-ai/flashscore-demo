// ============================================================
//  matches.js  –  Match rendering, live sim, detail modal
// ============================================================

// Live state (mutable copy)
let liveMatches = MATCHES.map(m => ({ ...m }));

// ── Render a single match card ────────────────────────────────
function renderMatchCard(match, showOdds = true) {
  const leagueTeams = TEAMS[match.leagueId] || [];
  const home = leagueTeams.find(t => t.id === match.homeTeam) || { name: match.homeTeam, short: match.homeTeam, color: '#555' };
  const away = leagueTeams.find(t => t.id === match.awayTeam) || { name: match.awayTeam, short: match.awayTeam, color: '#555' };
  const isLive = match.status === 'LIVE';
  const isFav = getFavTeams().includes(match.homeTeam) || getFavTeams().includes(match.awayTeam);

  const homeWinner = match.status === 'FT' && match.homeScore > match.awayScore;
  const awayWinner = match.status === 'FT' && match.awayScore > match.homeScore;

  const centerContent = match.status === 'NS'
    ? `<div class="match-time">${match.time}</div>`
    : `<div class="score-display ${match.status.toLowerCase()}" id="score-${match.id}">
         <span class="${homeWinner ? 'text-green' : ''}">${match.homeScore}</span>
         <span class="score-sep">-</span>
         <span class="${awayWinner ? 'text-green' : ''}">${match.awayScore}</span>
       </div>`;

  const oddsHtml = showOdds ? `
    <div class="odds-row">
      <button class="odd-btn" data-match="${match.id}" data-type="home" data-odd="${match.odds.home}" onclick="addToBet('${match.id}','home','${home.name} win',${match.odds.home}, event)">
        <span class="odd-label">1</span>
        <span class="odd-value">${match.odds.home.toFixed(2)}</span>
      </button>
      <button class="odd-btn" data-match="${match.id}" data-type="draw" data-odd="${match.odds.draw}" onclick="addToBet('${match.id}','draw','X - Egal',${match.odds.draw}, event)">
        <span class="odd-label">X</span>
        <span class="odd-value">${match.odds.draw.toFixed(2)}</span>
      </button>
      <button class="odd-btn" data-match="${match.id}" data-type="away" data-odd="${match.odds.away}" onclick="addToBet('${match.id}','away','${away.name} win',${match.odds.away}, event)">
        <span class="odd-label">2</span>
        <span class="odd-value">${match.odds.away.toFixed(2)}</span>
      </button>
    </div>` : '';

  return `
    <div class="match-card" onclick="openMatchDetail('${match.id}')" data-match-id="${match.id}" data-status="${match.status}" data-league="${match.leagueId}">
      <div class="team-home">
        ${renderTeamLogo(home)}
        <span class="team-name ${homeWinner ? 'winner' : ''}">${home.name}</span>
      </div>
      <div class="match-center">
        ${statusBadge(match.status, match.minute)}
        ${centerContent}
      </div>
      <div class="team-away">
        ${renderTeamLogo(away)}
        <span class="team-name ${awayWinner ? 'winner' : ''}">${away.name}</span>
      </div>
      <button class="fav-btn match-fav ${isFav ? 'active' : ''}" title="Salvează la favorite"
        onclick="event.stopPropagation(); favMatch('${match.homeTeam}','${match.awayTeam}',this)">★</button>
    </div>
    ${oddsHtml}
  `;
}

// ── Render matches grouped by league ─────────────────────────
function renderAllMatches(filter = 'all', searchTerm = '') {
  const container = document.getElementById('matches-container');
  if (!container) return;

  let filtered = liveMatches;
  if (filter === 'live')     filtered = filtered.filter(m => m.status === 'LIVE');
  if (filter === 'ft')       filtered = filtered.filter(m => m.status === 'FT');
  if (filter === 'upcoming') filtered = filtered.filter(m => m.status === 'NS');
  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    filtered = filtered.filter(m => {
      const teams = TEAMS[m.leagueId] || [];
      const h = teams.find(t => t.id === m.homeTeam);
      const a = teams.find(t => t.id === m.awayTeam);
      return h?.name.toLowerCase().includes(q) || a?.name.toLowerCase().includes(q);
    });
  }

  if (!filtered.length) {
    container.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted)">
      <div style="font-size:36px;margin-bottom:12px">⚽</div>
      <p>Nu s-au găsit meciuri pentru filtrul selectat.</p></div>`;
    return;
  }

  const grouped = {};
  filtered.forEach(m => {
    if (!grouped[m.leagueId]) grouped[m.leagueId] = [];
    grouped[m.leagueId].push(m);
  });

  container.innerHTML = Object.entries(grouped).map(([lgId, matches]) => {
    const league = getLeague(lgId);
    const liveCount = matches.filter(m => m.status === 'LIVE').length;
    return `
      <div class="league-section" id="section-${lgId}">
        <div class="league-header" onclick="toggleLeagueSection('${lgId}')">
          <span class="league-flag">${league?.flag || '🏆'}</span>
          <span class="league-name-text">${league?.name || lgId}</span>
          ${liveCount ? `<span class="badge badge-live" style="font-size:10px">${liveCount} LIVE</span>` : ''}
          <span class="league-match-count">${matches.length} meciuri</span>
          <span class="league-toggle-icon">▾</span>
        </div>
        <div class="league-matches matches-wrapper">
          ${matches.map(m => renderMatchCard(m)).join('')}
        </div>
      </div>`;
  }).join('');
}

// ── Toggle league section collapse ───────────────────────────
function toggleLeagueSection(lgId) {
  document.getElementById(`section-${lgId}`)?.classList.toggle('collapsed');
}

// ── Fav from match card ───────────────────────────────────────
function favMatch(homeId, awayId, btn) {
  if (!isLoggedIn()) { showToast('Trebuie să fii autentificat pentru a adăuga favorite!', 'error'); return; }
  const isFav = getFavTeams().includes(homeId);
  if (isFav) {
    toggleFavTeam(homeId);
    toggleFavTeam(awayId);
    btn.classList.remove('active');
  } else {
    toggleFavTeam(homeId);
    btn.classList.add('active');
  }
}

// ── Match Detail Modal ─────────────────────────────────────────
function openMatchDetail(matchId) {
  const match = liveMatches.find(m => m.id === matchId);
  if (!match) return;

  const leagueTeams = TEAMS[match.leagueId] || [];
  const home = leagueTeams.find(t => t.id === match.homeTeam) || { name: match.homeTeam, color: '#555', short: match.homeTeam };
  const away = leagueTeams.find(t => t.id === match.awayTeam) || { name: match.awayTeam, color: '#555', short: match.awayTeam };
  const league = getLeague(match.leagueId);
  const stats = MATCH_STATS[matchId];
  const events = MATCH_EVENTS[matchId] || [];

  const statsHtml = stats ? `
    <div class="stat-bar-container">
      <h4 style="font-size:13px;font-weight:700;margin-bottom:14px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">Statistici</h4>
      ${renderStatBar('Posesie', stats.possession[0] + '%', stats.possession[1] + '%', stats.possession[0], stats.possession[1])}
      ${renderStatBar('Șuturi pe poartă', stats.shotsOnTarget[0], stats.shotsOnTarget[1], stats.shotsOnTarget[0], stats.shotsOnTarget[0]+stats.shotsOnTarget[1])}
      ${renderStatBar('Șuturi totale', stats.shots[0], stats.shots[1], stats.shots[0], stats.shots[0]+stats.shots[1])}
      ${renderStatBar('Faulturi', stats.fouls[0], stats.fouls[1], stats.fouls[0], stats.fouls[0]+stats.fouls[1])}
      ${renderStatBar('Cornere', stats.corners[0], stats.corners[1], stats.corners[0], stats.corners[0]+stats.corners[1])}
      ${renderStatBar('Cartonașe galbene', stats.yellowCards[0], stats.yellowCards[1], stats.yellowCards[0], stats.yellowCards[0]+stats.yellowCards[1])}
    </div>` : '<p style="padding:20px;color:var(--text-muted);text-align:center;font-size:13px">Statistici indisponibile</p>';

  const eventsHtml = events.length ? `
    <div class="events-list">
      <h4 style="font-size:13px;font-weight:700;margin-bottom:14px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.5px">Evenimente</h4>
      ${events.map(ev => {
        const icon = ev.type === 'goal' ? '⚽' : ev.type === 'yellow' ? '🟨' : ev.type === 'red' ? '🟥' : '🔄';
        const team = leagueTeams.find(t => t.id === ev.team);
        return `<div class="event-item">
          <span class="event-min">${ev.minute}'</span>
          <span class="event-icon">${icon}</span>
          <div class="event-info">
            <div class="event-player">${ev.player}</div>
            ${ev.assist ? `<div class="event-assist">Assist: ${ev.assist}</div>` : ''}
          </div>
          <span class="event-side">${team?.short || ev.team}</span>
        </div>`;
      }).join('')}
    </div>` : '';

  const modal = document.createElement('div');
  modal.className = 'match-detail-overlay';
  modal.id = 'match-detail-modal';
  modal.onclick = (e) => { if (e.target === modal) closeMatchDetail(); };
  modal.innerHTML = `
    <div class="match-detail-panel">
      <div class="detail-header">
        <button class="detail-close" onclick="closeMatchDetail()">✕</button>
        <div class="detail-league-info" style="margin-bottom:12px">${league?.flag || ''} ${league?.name || ''} · ${match.date}</div>
        <div class="detail-teams">
          <div class="detail-team">
            ${renderTeamLogo(home, 'lg')}
            <div class="detail-team-name">${home.name}</div>
          </div>
          <div class="detail-score-block">
            <div class="detail-score ${match.status === 'LIVE' ? 'live-score' : ''}" id="detail-score">
              ${match.homeScore} – ${match.awayScore}
            </div>
            <div class="detail-status-block">
              ${statusBadge(match.status, match.minute)}
            </div>
          </div>
          <div class="detail-team">
            ${renderTeamLogo(away, 'lg')}
            <div class="detail-team-name">${away.name}</div>
          </div>
        </div>
      </div>
      <div style="padding:0">
        <div class="tabs" style="padding:0 16px;border-bottom:1px solid var(--border)">
          <button class="tab-btn active" data-tab="tab-stats" onclick="switchDetailTab(this,'tab-stats')">Statistici</button>
          <button class="tab-btn" data-tab="tab-events" onclick="switchDetailTab(this,'tab-events')">Evenimente</button>
          <button class="tab-btn" data-tab="tab-odds" onclick="switchDetailTab(this,'tab-odds')">Cote</button>
        </div>
        <div id="tab-stats" class="tab-content active">${statsHtml}</div>
        <div id="tab-events" class="tab-content">${eventsHtml || '<p style="padding:20px;color:var(--text-muted);text-align:center;font-size:13px">Nu există evenimente înregistrate.</p>'}</div>
        <div id="tab-odds" class="tab-content">
          <div style="padding:20px">
            <p style="font-size:12px;color:var(--text-muted);margin-bottom:14px">Cotele se actualizează în timp real. Click pe o cotă pentru a adăuga la bilet.</p>
            <div class="odds-row" style="justify-content:flex-start">
              <button class="odd-btn" onclick="addToBet('${match.id}','home','${home.name} câștigă',${match.odds.home}, event)">
                <span class="odd-label">1 – ${home.short}</span>
                <span class="odd-value">${match.odds.home.toFixed(2)}</span>
              </button>
              <button class="odd-btn" onclick="addToBet('${match.id}','draw','X – Egal',${match.odds.draw}, event)">
                <span class="odd-label">X – Egal</span>
                <span class="odd-value">${match.odds.draw.toFixed(2)}</span>
              </button>
              <button class="odd-btn" onclick="addToBet('${match.id}','away','${away.name} câștigă',${match.odds.away}, event)">
                <span class="odd-label">2 – ${away.short}</span>
                <span class="odd-value">${match.odds.away.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeMatchDetail() {
  document.getElementById('match-detail-modal')?.remove();
  document.body.style.overflow = '';
}

function switchDetailTab(btn, tabId) {
  const panel = document.querySelector('.match-detail-panel');
  if (!panel) return;
  panel.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  panel.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  panel.querySelector(`#${tabId}`)?.classList.add('active');
}

function renderStatBar(label, homeVal, awayVal, homePct, total) {
  const pct = total > 0 ? Math.round((homePct / total) * 100) : 50;
  return `
    <div class="stat-row">
      <span class="stat-val-home">${homeVal}</span>
      <div style="display:flex;flex-direction:column;gap:4px;flex:1">
        <div class="stat-label" style="text-align:center;margin-bottom:2px">${label}</div>
        <div class="stat-bars">
          <div class="stat-bar-home" style="width:${pct}%"></div>
          <div class="stat-bar-away" style="width:${100-pct}%"></div>
        </div>
      </div>
      <span class="stat-val-away">${awayVal}</span>
    </div>`;
}

// ── Live score simulation ──────────────────────────────────────
function simulateLiveUpdates() {
  setInterval(() => {
    liveMatches.forEach(match => {
      if (match.status !== 'LIVE') return;
      match.minute = Math.min(match.minute + 1, 90);
      if (match.minute >= 90) match.status = 'FT';
      if (match.minute === 45) match.status = 'HT';

      // ~5% chance of a goal each tick
      if (Math.random() < 0.05) {
        if (Math.random() < 0.5) match.homeScore++;
        else match.awayScore++;
        const scoreEl = document.getElementById(`score-${match.id}`);
        if (scoreEl) {
          scoreEl.textContent = `${match.homeScore} - ${match.awayScore}`;
          scoreEl.style.transform = 'scale(1.3)';
          scoreEl.style.color = 'var(--yellow)';
          setTimeout(() => { scoreEl.style.transform = ''; scoreEl.style.color = ''; }, 600);
        }
      }

      // Update minute badge
      const card = document.querySelector(`[data-match-id="${match.id}"]`);
      if (card) {
        const badge = card.querySelector('.badge-live');
        if (badge) badge.textContent = match.minute + "'";
      }
    });
    renderTicker();
  }, 8000);
}

// ── Keyboard shortcut: ESC closes modal ───────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMatchDetail();
});
