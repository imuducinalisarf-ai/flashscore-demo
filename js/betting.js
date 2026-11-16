// ============================================================
//  betting.js  –  Betting slip logic (simulated)
// ============================================================

let betSlip = [];

// ── Add / remove bet ──────────────────────────────────────────
function addToBet(matchId, type, label, odd, event) {
  if (event) event.stopPropagation();

  const existing = betSlip.findIndex(b => b.matchId === matchId);
  if (existing !== -1) {
    if (betSlip[existing].type === type) {
      betSlip.splice(existing, 1);
      showToast('Pariu eliminat din bilet.', 'info');
    } else {
      betSlip[existing] = { matchId, type, label, odd };
      showToast('Pariu actualizat ✓', 'success');
    }
  } else {
    if (betSlip.length >= 10) { showToast('Biletul poate conține maxim 10 pariuri!', 'error'); return; }
    betSlip.push({ matchId, type, label, odd });
    showToast(`Cotă ${odd.toFixed(2)} adăugată la bilet ✓`, 'success');
  }

  renderBetSlip();
  updateOddButtons();
  updateMobileSlipBtn();
}

// ── Render slip ───────────────────────────────────────────────
function renderBetSlip() {
  const slips = document.querySelectorAll('.betting-slip');
  slips.forEach(slip => {
    const body = slip.querySelector('.slip-body');
    const footer = slip.querySelector('.slip-footer');
    const countEl = slip.querySelector('.bet-count');
    if (countEl) countEl.textContent = betSlip.length;

    if (!body) return;
    if (!betSlip.length) {
      body.innerHTML = `<div class="slip-empty">
        <div class="slip-icon">🎫</div>
        <p>Biletul tău este gol.</p>
        <p style="font-size:11px;margin-top:6px">Click pe cote pentru a adăuga pariuri.</p>
      </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    body.innerHTML = betSlip.map((b, i) => {
      const match = MATCHES.find(m => m.id === b.matchId);
      const teams = TEAMS[match?.leagueId] || [];
      const home = teams.find(t => t.id === match?.homeTeam);
      const away = teams.find(t => t.id === match?.awayTeam);
      const teamsText = match ? `${home?.short || '?'} vs ${away?.short || '?'}` : b.matchId;
      return `<div class="bet-item">
        <div class="bet-item-teams">${teamsText}</div>
        <div class="bet-item-selection">${b.label}</div>
        <div class="bet-item-odd">${b.odd.toFixed(2)}</div>
        <button class="bet-remove" onclick="removeBet(${i})">✕</button>
      </div>`;
    }).join('');

    if (footer) {
      footer.style.display = 'block';
      const totalOdds = betSlip.reduce((acc, b) => acc * b.odd, 1);
      const stakeInput = footer.querySelector('#slip-stake');
      const stake = parseFloat(stakeInput?.value) || 10;
      const potential = (stake * totalOdds).toFixed(2);

      footer.querySelector('.slip-total-odds').textContent = totalOdds.toFixed(2);
      footer.querySelector('.win-amount').textContent = `${potential} RON`;
    }
  });
}

function removeBet(index) {
  betSlip.splice(index, 1);
  renderBetSlip();
  updateOddButtons();
  updateMobileSlipBtn();
  showToast('Pariu eliminat.', 'info');
}

function clearSlip() {
  betSlip = [];
  renderBetSlip();
  updateOddButtons();
  updateMobileSlipBtn();
  showToast('Bilet șters.', 'info');
}

function placeBet() {
  if (!isLoggedIn()) {
    showToast('Trebuie să fii autentificat pentru a plasa pariuri!', 'error');
    setTimeout(() => window.location.href = 'login.html', 1500);
    return;
  }
  if (!betSlip.length) { showToast('Adaugă cel puțin un pariu!', 'error'); return; }
  const stakeEl = document.querySelector('#slip-stake');
  const stake = parseFloat(stakeEl?.value) || 10;
  if (stake < 1) { showToast('Miza minimă este 1 RON.', 'error'); return; }
  const totalOdds = betSlip.reduce((acc, b) => acc * b.odd, 1);
  const win = (stake * totalOdds).toFixed(2);

  // Save to history
  const history = JSON.parse(localStorage.getItem('fs_bet_history') || '[]');
  history.unshift({ bets: [...betSlip], stake, odds: totalOdds, potential: win, date: new Date().toLocaleDateString('ro-RO'), status: 'open' });
  localStorage.setItem('fs_bet_history', JSON.stringify(history.slice(0, 50)));

  showToast(`Bilet plasat! Câștig potențial: ${win} RON 🎉`, 'success');
  betSlip = [];
  renderBetSlip();
  updateOddButtons();
  updateMobileSlipBtn();
}

// ── Highlight selected odds ───────────────────────────────────
function updateOddButtons() {
  document.querySelectorAll('.odd-btn').forEach(btn => {
    const matchId = btn.dataset.match;
    const type = btn.dataset.type;
    const inSlip = betSlip.some(b => b.matchId === matchId && b.type === type);
    btn.classList.toggle('selected', inSlip);
  });
}

// ── Mobile toggle ─────────────────────────────────────────────
function updateMobileSlipBtn() {
  const btn = document.getElementById('slip-mobile-btn');
  if (!btn) return;
  const countEl = btn.querySelector('.slip-mobile-count');
  if (countEl) countEl.textContent = betSlip.length;
  btn.style.display = betSlip.length > 0 ? 'flex' : 'none';
}

function toggleMobileSlip() {
  document.querySelectorAll('.betting-slip').forEach(s => s.classList.toggle('mobile-open'));
}

// ── Stake input live update ───────────────────────────────────
document.addEventListener('input', (e) => {
  if (e.target.id === 'slip-stake') renderBetSlip();
});

// ── Build betting slip HTML (injected into page) ──────────────
function buildBettingSlip() {
  return `
    <div class="betting-slip" id="betting-slip">
      <div class="betting-slip-header">
        <div class="betting-slip-title">
          🎫 Bilet pariuri
          <span class="bet-count">0</span>
        </div>
        <button onclick="clearSlip()" class="btn btn-sm btn-secondary" style="font-size:11px">Șterge tot</button>
      </div>
      <div class="slip-body"></div>
      <div class="slip-footer" style="display:none">
        <div class="slip-total-row">
          <span>Cotă totală:</span>
          <span class="slip-total-odds">1.00</span>
        </div>
        <div class="stake-input-row">
          <label for="slip-stake">Miză (RON):</label>
          <input type="number" id="slip-stake" value="10" min="1" max="10000" step="1">
        </div>
        <div class="slip-potential-win">
          <span>Câștig potențial:</span>
          <span class="win-amount">10.00 RON</span>
        </div>
        <button class="btn btn-primary btn-full" onclick="placeBet()">Plasează biletul</button>
      </div>
    </div>
    <button id="slip-mobile-btn" class="slip-mobile-toggle" onclick="toggleMobileSlip()" style="display:none">
      🎫
      <span class="slip-mobile-count">0</span>
    </button>`;
}
