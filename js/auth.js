// ============================================================
//  auth.js  –  Login, Register, Profile (localStorage sim)
// ============================================================

// ── Login ────────────────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  if (!email || !password) {
    errorEl.textContent = 'Completează toate câmpurile.';
    errorEl.style.display = 'block';
    return;
  }

  // Check registered users
  const users = JSON.parse(localStorage.getItem('fs_users') || '[]');
  // Add default admin if not exists
  if (!users.some(u => u.email === 'admin@flashscore.ro')) {
    users.push({ name: 'Admin User', email: 'admin@flashscore.ro', password: 'admin123', role: 'admin', joined: '2024-01-01' });
    localStorage.setItem('fs_users', JSON.stringify(users));
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    errorEl.textContent = 'Email sau parolă incorecte.';
    errorEl.style.display = 'block';
    return;
  }

  const sessionUser = { name: user.name, email: user.email, role: user.role || 'user', joined: user.joined };
  localStorage.setItem('fs_user', JSON.stringify(sessionUser));
  showToast(`Bun venit, ${user.name}! ✓`, 'success');
  setTimeout(() => window.location.href = 'index.html', 800);
}

// ── Register ─────────────────────────────────────────────────
function handleRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirm  = document.getElementById('reg-confirm').value;
  const terms    = document.getElementById('reg-terms').checked;
  const errorEl  = document.getElementById('reg-error');

  if (!name || !email || !password || !confirm) {
    errorEl.textContent = 'Completează toate câmpurile.';
    errorEl.style.display = 'block'; return;
  }
  if (password.length < 6) {
    errorEl.textContent = 'Parola trebuie să aibă minim 6 caractere.';
    errorEl.style.display = 'block'; return;
  }
  if (password !== confirm) {
    errorEl.textContent = 'Parolele nu coincid.';
    errorEl.style.display = 'block'; return;
  }
  if (!terms) {
    errorEl.textContent = 'Trebuie să accepti termenii și condițiile.';
    errorEl.style.display = 'block'; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEl.textContent = 'Adresă de email invalidă.';
    errorEl.style.display = 'block'; return;
  }

  const users = JSON.parse(localStorage.getItem('fs_users') || '[]');
  if (users.some(u => u.email === email)) {
    errorEl.textContent = 'Există deja un cont cu acest email.';
    errorEl.style.display = 'block'; return;
  }

  const newUser = { name, email, password, role: 'user', joined: new Date().toISOString().split('T')[0] };
  users.push(newUser);
  localStorage.setItem('fs_users', JSON.stringify(users));

  const sessionUser = { name, email, role: 'user', joined: newUser.joined };
  localStorage.setItem('fs_user', JSON.stringify(sessionUser));
  showToast(`Cont creat cu succes! Bun venit, ${name}! 🎉`, 'success');
  setTimeout(() => window.location.href = 'index.html', 1000);
}

// ── Password toggle ───────────────────────────────────────────
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ── Password strength ─────────────────────────────────────────
function checkPasswordStrength(password) {
  const fill = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  if (!fill || !label) return;
  let strength = 0;
  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  const levels = ['', 'weak', 'fair', 'good', 'strong', 'strong'];
  const labels = ['', 'Slabă', 'Medie', 'Bună', 'Puternică', 'Excelentă'];
  fill.className = `strength-fill ${levels[strength]}`;
  label.textContent = password ? `Putere parolă: ${labels[strength]}` : '';
}

// ── Profile page ──────────────────────────────────────────────
function renderProfile() {
  const user = getUser();
  if (!user) { window.location.href = 'login.html'; return; }

  document.getElementById('profile-name').textContent = user.name;
  document.getElementById('profile-email').textContent = user.email;
  document.getElementById('profile-joined').textContent = `Membru din: ${user.joined || '2024'}`;
  document.getElementById('profile-avatar-letter').textContent = user.name.charAt(0).toUpperCase();
  document.getElementById('edit-name').value = user.name;
  document.getElementById('edit-email').value = user.email;

  if (user.role === 'admin') {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) adminLink.style.display = 'flex';
  }

  renderFavTeams();
  renderFavLeagues();
  renderBetHistory();
}

function renderFavTeams() {
  const container = document.getElementById('fav-teams-container');
  if (!container) return;
  const favs = getFavTeams();
  if (!favs.length) {
    container.innerHTML = '<p style="font-size:13px;color:var(--text-muted);padding:10px 0">Nu ai echipe favorite. Adaugă din lista de meciuri.</p>';
    return;
  }
  const teams = favs.map(id => getTeamByIdGlobal(id)).filter(Boolean);
  container.innerHTML = `<div class="favorites-grid">${teams.map(t => `
    <div class="fav-card">
      ${renderTeamLogo(t)}
      <span class="fav-name">${t.name}</span>
      <button class="fav-btn fav-remove active" onclick="removeFavTeam('${t.id}',this)">★</button>
    </div>`).join('')}</div>`;
}

function removeFavTeam(id, btn) {
  toggleFavTeam(id);
  btn.closest('.fav-card')?.remove();
}

function renderFavLeagues() {
  const container = document.getElementById('fav-leagues-container');
  if (!container) return;
  const favs = getFavLeagues();
  if (!favs.length) {
    container.innerHTML = '<p style="font-size:13px;color:var(--text-muted);padding:10px 0">Nu ai ligi favorite.</p>';
    return;
  }
  const leagues = favs.map(id => getLeague(id)).filter(Boolean);
  container.innerHTML = `<div class="favorites-grid">${leagues.map(l => `
    <div class="fav-card" onclick="window.location.href='league.html?id=${l.id}'">
      <span style="font-size:20px">${l.flag}</span>
      <span class="fav-name">${l.name}</span>
      <button class="fav-btn fav-remove active" onclick="event.stopPropagation();removeFavLeague('${l.id}',this)">★</button>
    </div>`).join('')}</div>`;
}

function removeFavLeague(id, btn) {
  toggleFavLeague(id);
  btn.closest('.fav-card')?.remove();
}

function renderBetHistory() {
  const container = document.getElementById('bet-history-container');
  if (!container) return;
  const history = JSON.parse(localStorage.getItem('fs_bet_history') || '[]');
  if (!history.length) {
    container.innerHTML = '<p style="font-size:13px;color:var(--text-muted);padding:10px 0">Nu ai pariuri plasate.</p>';
    return;
  }
  container.innerHTML = history.slice(0, 10).map(b => `
    <div class="bet-history-item">
      <div>
        <div style="font-size:13px;font-weight:600">${b.bets.length} selecție/ii · Cotă: ${b.odds.toFixed(2)}</div>
        <div style="font-size:11px;color:var(--text-muted)">${b.date} · Miză: ${b.stake} RON</div>
      </div>
      <div>
        <span class="bet-result ${b.status}">${b.status === 'open' ? 'Deschis' : b.status === 'won' ? 'Câștigat' : 'Pierdut'}</span>
        <div style="font-size:12px;color:var(--text-muted);text-align:right">${b.potential} RON</div>
      </div>
    </div>`).join('');
}

function handleEditProfile(e) {
  e.preventDefault();
  const user = getUser();
  const newName = document.getElementById('edit-name').value.trim();
  const newEmail = document.getElementById('edit-email').value.trim();
  if (!newName || !newEmail) { showToast('Completează toate câmpurile.', 'error'); return; }

  const updatedUser = { ...user, name: newName, email: newEmail };
  localStorage.setItem('fs_user', JSON.stringify(updatedUser));

  // Update in users list too
  const users = JSON.parse(localStorage.getItem('fs_users') || '[]');
  const idx = users.findIndex(u => u.email === user.email);
  if (idx !== -1) { users[idx].name = newName; users[idx].email = newEmail; localStorage.setItem('fs_users', JSON.stringify(users)); }

  showToast('Profil actualizat cu succes! ✓', 'success');
  document.getElementById('profile-name').textContent = newName;
  document.getElementById('profile-avatar-letter').textContent = newName.charAt(0).toUpperCase();
}

document.addEventListener('DOMContentLoaded', () => {
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  // Register form
  const regForm = document.getElementById('register-form');
  if (regForm) regForm.addEventListener('submit', handleRegister);
  // Password strength
  const regPw = document.getElementById('reg-password');
  if (regPw) regPw.addEventListener('input', (e) => checkPasswordStrength(e.target.value));
  // Profile
  if (document.getElementById('profile-name')) renderProfile();
  // Edit profile form
  const editForm = document.getElementById('edit-profile-form');
  if (editForm) editForm.addEventListener('submit', handleEditProfile);
});
