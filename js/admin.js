// ============================================================
//  admin.js  –  Admin panel UI logic
// ============================================================

function checkAdminAccess() {
  const user = getUser();
  if (!user) { window.location.href = 'login.html'; return false; }
  if (user.role !== 'admin') {
    showToast('Acces interzis! Numai administratorii pot accesa această pagină.', 'error');
    setTimeout(() => window.location.href = 'index.html', 1500);
    return false;
  }
  return true;
}

function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  const tab = document.getElementById(`admin-${tabName}`);
  const nav = document.querySelector(`[data-admin-tab="${tabName}"]`);
  if (tab) tab.classList.add('active');
  if (nav) nav.classList.add('active');
}

// ── Dashboard stats ───────────────────────────────────────────
function renderDashboard() {
  const users = JSON.parse(localStorage.getItem('fs_users') || '[]');
  const totalUsers = users.length + ADMIN_USERS.length - 1; // merge
  const liveCount = MATCHES.filter(m => m.status === 'LIVE').length;
  const betHistory = JSON.parse(localStorage.getItem('fs_bet_history') || '[]');

  document.getElementById('stat-users').textContent = totalUsers || ADMIN_USERS.length;
  document.getElementById('stat-live').textContent = liveCount;
  document.getElementById('stat-bets').textContent = betHistory.length;
  document.getElementById('stat-leagues').textContent = LEAGUES.length;

  renderActivityLog();
  renderCharts();
}

function renderActivityLog() {
  const log = document.getElementById('activity-log');
  if (!log) return;
  const activities = [
    { text: 'Utilizator nou înregistrat: ion.p@gmail.com', time: '2 minute în urmă' },
    { text: 'Meci actualizat: Manchester City 2-1 Arsenal (67\')', time: '5 minute în urmă' },
    { text: 'Bilet pariat plasat · Cotă 4.56 · 50 RON', time: '12 minute în urmă' },
    { text: 'Utilizator maria.i@yahoo.com a adăugat favorite', time: '18 minute în urmă' },
    { text: 'Logare admin: admin@flashscore.ro', time: '32 minute în urmă' },
    { text: 'Meci finalizat: PSG 4-0 Marseille (FT)', time: '1 oră în urmă' },
  ];
  log.innerHTML = activities.map(a => `
    <div class="activity-item">
      <div class="activity-dot"></div>
      <div>
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>`).join('');
}

function renderCharts() {
  const chartEl = document.getElementById('league-chart');
  if (!chartEl) return;
  const leagueData = LEAGUES.map(l => ({
    name: l.name,
    matches: MATCHES.filter(m => m.leagueId === l.id).length
  }));
  const max = Math.max(...leagueData.map(l => l.matches));
  chartEl.innerHTML = leagueData.map(l => `
    <div class="chart-bar-row">
      <span class="chart-bar-label">${l.name.length > 12 ? l.name.slice(0, 12) + '…' : l.name}</span>
      <div class="chart-bar-track">
        <div class="chart-bar-fill" style="width:${Math.round((l.matches / max) * 100)}%"></div>
      </div>
      <span class="chart-bar-value">${l.matches}</span>
    </div>`).join('');
}

// ── Users table ───────────────────────────────────────────────
function renderUsersTable() {
  const tbody = document.getElementById('users-tbody');
  if (!tbody) return;

  const storedUsers = JSON.parse(localStorage.getItem('fs_users') || '[]');
  const allUsers = [...ADMIN_USERS];
  storedUsers.forEach(u => {
    if (!allUsers.some(a => a.email === u.email)) {
      allUsers.push({ id: allUsers.length + 1, name: u.name, email: u.email, role: u.role || 'user', status: 'active', joined: u.joined });
    }
  });

  tbody.innerHTML = allUsers.map(u => `
    <tr id="user-row-${u.id}">
      <td>${u.id}</td>
      <td><div style="display:flex;align-items:center;gap:8px">
        <div style="width:28px;height:28px;background:linear-gradient(135deg,var(--accent),#0044cc);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0">${u.name.charAt(0)}</div>
        ${u.name}
      </div></td>
      <td>${u.email}</td>
      <td><span class="role-badge ${u.role}">${u.role}</span></td>
      <td><span class="status-badge ${u.status}">${u.status === 'active' ? 'Activ' : 'Blocat'}</span></td>
      <td>${u.joined}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editUser(${u.id})">✏️ Edit</button>
          <button class="action-btn ban" onclick="toggleBanUser(${u.id})">${u.status === 'banned' ? '✅ Activare' : '🚫 Blocare'}</button>
          <button class="action-btn delete" onclick="deleteUser(${u.id})">🗑️</button>
        </div>
      </td>
    </tr>`).join('');
}

function editUser(id) {
  openAdminModal('Editare Utilizator', `
    <div class="auth-form">
      <div class="form-group"><label>Nume</label><input type="text" id="modal-name" placeholder="Numele complet"></div>
      <div class="form-group"><label>Email</label><input type="email" id="modal-email" placeholder="Email"></div>
      <div class="form-group"><label>Rol</label>
        <select id="modal-role"><option value="user">User</option><option value="admin">Admin</option></select>
      </div>
    </div>`,
    () => { showToast('Utilizator actualizat (simulat) ✓', 'success'); closeAdminModal(); }
  );
}

function toggleBanUser(id) {
  const row = document.getElementById(`user-row-${id}`);
  const badge = row?.querySelector('.status-badge');
  const btn = row?.querySelector('.action-btn.ban');
  if (!badge || !btn) return;
  if (badge.classList.contains('active')) {
    badge.className = 'status-badge banned'; badge.textContent = 'Blocat';
    btn.textContent = '✅ Activare';
    showToast('Utilizator blocat.', 'info');
  } else {
    badge.className = 'status-badge active'; badge.textContent = 'Activ';
    btn.textContent = '🚫 Blocare';
    showToast('Utilizator activat.', 'success');
  }
}

function deleteUser(id) {
  openAdminModal('Confirmare ștergere', `<p style="font-size:14px;color:var(--text-muted)">Ești sigur că vrei să ștergi acest utilizator? Acțiunea este ireversibilă.</p>`,
    () => {
      document.getElementById(`user-row-${id}`)?.remove();
      showToast('Utilizator șters (simulat).', 'info');
      closeAdminModal();
    }
  );
}

// ── Matches table ─────────────────────────────────────────────
function renderMatchesTable() {
  const tbody = document.getElementById('matches-tbody');
  if (!tbody) return;
  tbody.innerHTML = MATCHES.map(m => {
    const league = getLeague(m.leagueId);
    const teams = TEAMS[m.leagueId] || [];
    const home = teams.find(t => t.id === m.homeTeam);
    const away = teams.find(t => t.id === m.awayTeam);
    return `<tr>
      <td>${m.id}</td>
      <td>${league?.flag || ''} ${league?.name || m.leagueId}</td>
      <td>${home?.name || m.homeTeam}</td>
      <td>${away?.name || m.awayTeam}</td>
      <td>${m.status === 'NS' ? '–' : `${m.homeScore}–${m.awayScore}`}</td>
      <td>${statusBadge(m.status, m.minute)}</td>
      <td>${m.date} ${m.time}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="editMatch('${m.id}')">✏️ Edit</button>
          <button class="action-btn delete" onclick="deleteMatch('${m.id}')">🗑️</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function editMatch(id) {
  const match = MATCHES.find(m => m.id === id);
  if (!match) return;
  openAdminModal('Editare Meci', `
    <div class="auth-form">
      <div class="form-row">
        <div class="form-group"><label>Scor Acasă</label><input type="number" id="modal-hs" value="${match.homeScore}" min="0"></div>
        <div class="form-group"><label>Scor Deplasare</label><input type="number" id="modal-as" value="${match.awayScore}" min="0"></div>
      </div>
      <div class="form-group"><label>Status</label>
        <select id="modal-status">
          <option ${match.status === 'NS' ? 'selected' : ''}>NS</option>
          <option ${match.status === 'LIVE' ? 'selected' : ''}>LIVE</option>
          <option ${match.status === 'HT' ? 'selected' : ''}>HT</option>
          <option ${match.status === 'FT' ? 'selected' : ''}>FT</option>
        </select>
      </div>
    </div>`,
    () => { showToast('Meci actualizat (simulat) ✓', 'success'); closeAdminModal(); }
  );
}

function deleteMatch(id) {
  openAdminModal('Confirmare', '<p style="font-size:14px;color:var(--text-muted)">Șterge meciul? (simulat)</p>',
    () => { showToast('Meci șters (simulat).', 'info'); closeAdminModal(); }
  );
}

// ── Modal helpers ─────────────────────────────────────────────
function openAdminModal(title, bodyHtml, onConfirm) {
  const overlay = document.getElementById('admin-modal-overlay');
  document.getElementById('admin-modal-title').textContent = title;
  document.getElementById('admin-modal-body').innerHTML = bodyHtml;
  document.getElementById('admin-modal-confirm').onclick = onConfirm;
  overlay.classList.add('open');
}
function closeAdminModal() {
  document.getElementById('admin-modal-overlay')?.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  if (!checkAdminAccess()) return;
  renderDashboard();
  renderUsersTable();
  renderMatchesTable();

  // Admin nav items
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.adminTab;
      if (tab) switchAdminTab(tab);
    });
  });
});
