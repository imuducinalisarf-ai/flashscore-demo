// ============================================================
//  app.js  –  Shared utilities: auth state, navbar, toast
// ============================================================

// ── Auth helpers ─────────────────────────────────────────────
function getUser() {
  try { return JSON.parse(localStorage.getItem('fs_user')); } catch { return null; }
}
function isLoggedIn() { return !!getUser(); }
function logout() {
  localStorage.removeItem('fs_user');
  showToast('Deconectat cu succes.', 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
}

// ── Favourites helpers ────────────────────────────────────────
function getFavTeams()   { try { return JSON.parse(localStorage.getItem('fs_fav_teams'))  || []; } catch { return []; } }
function getFavLeagues() { try { return JSON.parse(localStorage.getItem('fs_fav_leagues')) || []; } catch { return []; } }
function toggleFavTeam(teamId) {
  const favs = getFavTeams();
  const idx = favs.indexOf(teamId);
  if (idx === -1) { favs.push(teamId); showToast('Echipă adăugată la favorite ⭐', 'success'); }
  else           { favs.splice(idx, 1); showToast('Echipă eliminată din favorite', 'info'); }
  localStorage.setItem('fs_fav_teams', JSON.stringify(favs));
  return idx === -1;
}
function toggleFavLeague(leagueId) {
  const favs = getFavLeagues();
  const idx = favs.indexOf(leagueId);
  if (idx === -1) { favs.push(leagueId); showToast('Ligă adăugată la favorite ⭐', 'success'); }
  else           { favs.splice(idx, 1); showToast('Ligă eliminată din favorite', 'info'); }
  localStorage.setItem('fs_fav_leagues', JSON.stringify(favs));
  return idx === -1;
}

// ── Toast notifications ───────────────────────────────────────
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3100);
}

// ── Team logo helper ─────────────────────────────────────────
function renderTeamLogo(team, size = '') {
  const bg = team?.color || '#444';
  const label = team?.short?.slice(0, 3) || '?';
  return `<span class="team-logo ${size}" style="background:${bg}">${label}</span>`;
}

// ── Status label helpers ─────────────────────────────────────
function statusBadge(status, minute) {
  switch (status) {
    case 'LIVE': return `<span class="badge badge-live">${minute}'</span>`;
    case 'HT':   return `<span class="badge badge-ht">HT</span>`;
    case 'FT':   return `<span class="badge badge-ft">FT</span>`;
    case 'NS':   return `<span class="badge badge-ns">Programat</span>`;
    case 'PP':   return `<span class="badge badge-pp">Amânat</span>`;
    default:     return `<span class="badge badge-ft">${status}</span>`;
  }
}

// ── Navbar renderer ───────────────────────────────────────────
function renderNavbar(activePage = '') {
  const user = getUser();
  const navEl = document.querySelector('.navbar');
  if (!navEl) return;

  const leagueTabs = LEAGUES.map(l => `
    <button class="league-tab ${activePage === l.id ? 'active' : ''}"
      onclick="window.location.href='league.html?id=${l.id}'">
      <span>${l.flag}</span> ${l.name}
    </button>
  `).join('');

  const userSection = user
    ? `<div class="user-menu">
         <button class="user-avatar-btn" onclick="toggleUserDropdown()">
           <div class="avatar">${user.name.charAt(0).toUpperCase()}</div>
           <span>${user.name.split(' ')[0]}</span>
           <span style="font-size:10px;color:var(--text-muted)">▾</span>
         </button>
         <div class="user-dropdown" id="user-dropdown">
           <a href="profile.html">👤 Profilul meu</a>
           <a href="profile.html#favorites">⭐ Favorite</a>
           ${user.role === 'admin' ? '<a href="admin.html">⚙️ Admin Panel</a>' : ''}
           <div class="divider"></div>
           <button onclick="logout()">🚪 Deconectare</button>
         </div>
       </div>`
    : `<a href="login.html" class="btn-login">Autentificare</a>
       <a href="register.html" class="btn-register">Înregistrare</a>`;

  navEl.innerHTML = `
    <a href="index.html" class="navbar-brand">
      <div class="logo-icon">⚽</div>
      Flash<span>Score</span>
    </a>
    <div class="navbar-leagues">${leagueTabs}</div>
    <div class="navbar-right">
      <a href="matches.html" style="font-size:13px;color:var(--text-muted);padding:6px 10px;border-radius:6px;transition:color .2s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Meciuri</a>
      <a href="gallery.html" style="font-size:13px;color:var(--text-muted);padding:6px 10px;border-radius:6px;transition:color .2s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Galerie</a>
      <a href="contact.html" style="font-size:13px;color:var(--text-muted);padding:6px 10px;border-radius:6px;transition:color .2s" onmouseover="this.style.color='var(--text)'" onmouseout="this.style.color='var(--text-muted)'">Contact</a>
      ${userSection}
      <button class="hamburger" onclick="toggleMobileNav()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;
}

function toggleUserDropdown() {
  const dd = document.getElementById('user-dropdown');
  if (dd) dd.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const dd = document.getElementById('user-dropdown');
  if (dd && !e.target.closest('.user-menu')) dd.classList.remove('open');
});

function toggleMobileNav() {
  let mobileNav = document.getElementById('mobile-nav');
  if (!mobileNav) {
    mobileNav = document.createElement('div');
    mobileNav.id = 'mobile-nav';
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = LEAGUES.map(l =>
      `<a href="league.html?id=${l.id}" class="league-tab">${l.flag} ${l.name}</a>`
    ).join('') +
    `<a href="matches.html" class="league-tab">📅 Meciuri</a>
     <a href="gallery.html" class="league-tab">🖼️ Galerie</a>
     <a href="contact.html" class="league-tab">📬 Contact</a>`;
    document.querySelector('.navbar').after(mobileNav);
  }
  mobileNav.classList.toggle('open');
}

// ── Live ticker ───────────────────────────────────────────────
function renderTicker() {
  const ticker = document.querySelector('.ticker-content');
  if (!ticker) return;
  const liveMatches = MATCHES.filter(m => m.status === 'LIVE' || m.status === 'HT');
  if (!liveMatches.length) { document.querySelector('.ticker-bar')?.remove(); return; }
  const items = liveMatches.map(m => {
    const home = getTeamByIdGlobal(m.homeTeam);
    const away = getTeamByIdGlobal(m.awayTeam);
    return `<div class="ticker-item">
      <span>${home?.short || m.homeTeam}</span>
      <span class="score-badge">${m.homeScore}-${m.awayScore}</span>
      <span>${away?.short || m.awayTeam}</span>
      <span style="color:var(--text-muted);font-size:11px">${m.status === 'HT' ? 'HT' : m.minute + "'"}</span>
    </div>`;
  });
  ticker.innerHTML = items.join('') + items.join('');
}

// ── Tab system ─────────────────────────────────────────────────
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = container.querySelector(`#${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    });
  });
}

// ── Filter buttons ────────────────────────────────────────────
function initFilters(containerSelector, onFilter) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onFilter(btn.dataset.filter);
    });
  });
}

// ── On DOM ready ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderTicker();
});
