// ============================================================
//  league.js  –  League page rendering (standings, scorers, form)
// ============================================================

function renderLeaguePage() {
  const params = new URLSearchParams(window.location.search);
  const leagueId = params.get('id') || 'pl';
  const league = getLeague(leagueId);
  if (!league) { document.body.innerHTML = '<p style="color:var(--text-muted);padding:40px">Ligă negăsită.</p>'; return; }

  // Banner
  document.querySelector('.league-banner-info h1').textContent = league.name;
  document.querySelector('.league-flag-icon').textContent = league.flag;
  document.querySelector('.league-country-text').textContent = league.country;
  document.title = `${league.name} – FlashScore`;

  const favBtn = document.querySelector('.league-banner-fav .fav-btn');
  if (favBtn) {
    const isFav = getFavLeagues().includes(leagueId);
    favBtn.classList.toggle('active', isFav);
    favBtn.onclick = () => {
      const nowFav = toggleFavLeague(leagueId);
      favBtn.classList.toggle('active', nowFav);
    };
  }

  // Tab: Matches
  renderLeagueMatches(leagueId);
  // Tab: Standings
  renderStandings(leagueId);
  // Tab: Scorers
  renderTopScorers(leagueId);
  // Tab: Form
  renderFormTable(leagueId);
  // Stats row
  renderLeagueStats(leagueId);
}

function renderLeagueMatches(leagueId) {
  const container = document.getElementById('league-matches-tab');
  if (!container) return;
  const matches = getMatchesByLeague(leagueId);
  if (!matches.length) { container.innerHTML = '<p style="padding:20px;color:var(--text-muted)">Nu există meciuri disponibile.</p>'; return; }
  container.innerHTML = `<div class="matches-wrapper">${matches.map(m => renderMatchCard(m)).join('')}</div>`;
}

function renderStandings(leagueId) {
  const container = document.getElementById('standings-tab');
  if (!container) return;
  const rows = STANDINGS[leagueId] || [];
  const teams = TEAMS[leagueId] || [];

  container.innerHTML = `
    <div class="card">
      <table class="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Echipă</th>
            <th title="Meciuri jucate">MJ</th>
            <th title="Victorii">V</th>
            <th title="Egaluri">E</th>
            <th title="Înfrângeri">Î</th>
            <th title="Goluri marcate/primite">GM:GP</th>
            <th title="Golaveraj">+/-</th>
            <th title="Puncte">Pct</th>
            <th>Formă</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => {
            const team = teams.find(t => t.id === row.teamId) || { name: row.teamId, short: row.teamId, color: '#555' };
            const gdClass = row.gd > 0 ? 'positive' : row.gd < 0 ? 'negative' : '';
            return `<tr>
              <td>
                <span class="pos-indicator"></span>
                <span class="pos-num">${row.pos}</span>
              </td>
              <td>
                <div class="team-cell">
                  ${renderTeamLogo(team)}
                  <span class="team-full-name">${team.name}</span>
                  <span class="team-short-name">${team.short}</span>
                </div>
              </td>
              <td class="center">${row.played}</td>
              <td class="center" style="color:var(--green)">${row.won}</td>
              <td class="center" style="color:var(--orange)">${row.drawn}</td>
              <td class="center" style="color:var(--red)">${row.lost}</td>
              <td class="center">${row.gf}:${row.ga}</td>
              <td class="center td-gd ${gdClass}">${row.gd > 0 ? '+' : ''}${row.gd}</td>
              <td class="center td-pts">${row.pts}</td>
              <td>
                <div class="form-sequence">
                  ${row.form.map(f => `<span class="form-badge ${f}">${f}</span>`).join('')}
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      <div class="standings-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div>UEFA Champions League</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--orange)"></div>UEFA Europa League</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--red)"></div>Retrogradare</div>
      </div>
    </div>`;
}

function renderTopScorers(leagueId) {
  const container = document.getElementById('scorers-tab');
  if (!container) return;
  const scorers = TOP_SCORERS[leagueId] || [];
  const teams = TEAMS[leagueId] || [];
  const rankIcons = ['🥇','🥈','🥉'];

  container.innerHTML = `
    <div class="card">
      <div class="scorers-list">
        ${scorers.map((s, i) => {
          const team = teams.find(t => t.id === s.teamId) || { name: s.teamId, short: s.teamId, color: '#555' };
          return `<div class="scorer-row">
            <div class="scorer-rank ${i === 0 ? 'first' : i === 1 ? 'second' : i === 2 ? 'third' : ''}">
              ${rankIcons[i] || (i + 1)}
            </div>
            ${renderTeamLogo(team, 'sm')}
            <div class="scorer-info">
              <div class="scorer-name">${s.player}</div>
              <div class="scorer-team">${team.name}</div>
            </div>
            <div class="scorer-stats">
              <div class="scorer-stat">
                <span class="scorer-stat-value goals">${s.goals}</span>
                <span class="scorer-stat-label">Goluri</span>
              </div>
              <div class="scorer-stat">
                <span class="scorer-stat-value assists">${s.assists}</span>
                <span class="scorer-stat-label">Assist</span>
              </div>
              <div class="scorer-stat">
                <span class="scorer-stat-value" style="color:var(--text-muted)">${s.apps}</span>
                <span class="scorer-stat-label">Meciuri</span>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderFormTable(leagueId) {
  const container = document.getElementById('form-tab');
  if (!container) return;
  const rows = STANDINGS[leagueId] || [];
  const teams = TEAMS[leagueId] || [];

  const sorted = [...rows].sort((a, b) => {
    const ptsA = a.form.filter(f => f === 'W').length * 3 + a.form.filter(f => f === 'D').length;
    const ptsB = b.form.filter(f => f === 'W').length * 3 + b.form.filter(f => f === 'D').length;
    return ptsB - ptsA;
  });

  container.innerHTML = `
    <div class="card">
      <div class="form-table">
        ${sorted.map(row => {
          const team = teams.find(t => t.id === row.teamId) || { name: row.teamId, color: '#555' };
          const formPts = row.form.reduce((acc, f) => acc + (f === 'W' ? 3 : f === 'D' ? 1 : 0), 0);
          return `<div class="form-row-team">
            <div class="form-team-info">
              ${renderTeamLogo(team, 'sm')}
              <div>
                <div class="form-team-name">${team.name}</div>
                <div class="form-team-pts">Poz. ${row.pos} · ${row.pts} pct</div>
              </div>
            </div>
            <div class="form-sequence-lg">
              ${row.form.map(f => `<span class="form-badge-lg ${f}">${f}</span>`).join('')}
            </div>
            <div class="last5-pts" style="color:${formPts >= 12 ? 'var(--green)' : formPts >= 6 ? 'var(--orange)' : 'var(--red)'}">
              ${formPts}/15
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderLeagueStats(leagueId) {
  const container = document.getElementById('league-stats-row');
  if (!container) return;
  const matches = getMatchesByLeague(leagueId);
  const ftMatches = matches.filter(m => m.status === 'FT');
  const totalGoals = ftMatches.reduce((a, m) => a + m.homeScore + m.awayScore, 0);
  const avgGoals = ftMatches.length ? (totalGoals / ftMatches.length).toFixed(1) : '0.0';
  const liveCount = matches.filter(m => m.status === 'LIVE').length;
  const standings = STANDINGS[leagueId] || [];
  const leader = standings[0];
  const teams = TEAMS[leagueId] || [];
  const leaderTeam = teams.find(t => t.id === leader?.teamId);

  container.innerHTML = `
    <div class="league-stat-card"><div class="league-stat-value">${matches.length}</div><div class="league-stat-label">Meciuri total</div></div>
    <div class="league-stat-card"><div class="league-stat-value" style="color:var(--live-color)">${liveCount}</div><div class="league-stat-label">Live acum</div></div>
    <div class="league-stat-card"><div class="league-stat-value" style="color:var(--green)">${avgGoals}</div><div class="league-stat-label">Goluri/meci</div></div>
    <div class="league-stat-card"><div class="league-stat-value" style="font-size:14px">${leaderTeam?.short || '-'}</div><div class="league-stat-label">Lider clasament</div></div>`;
}

document.addEventListener('DOMContentLoaded', renderLeaguePage);
