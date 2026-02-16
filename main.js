/* ===== Lotto Number Generator ===== */
function getRandomNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers.sort((a, b) => a - b);
}

function getBallClass(num) {
  if (num <= 10) return 'range-1';
  if (num <= 20) return 'range-2';
  if (num <= 30) return 'range-3';
  if (num <= 40) return 'range-4';
  return 'range-5';
}

function generateLotto() {
  const results = document.getElementById('results');
  if (!results) return;
  results.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const numbers = getRandomNumbers();
    const set = document.createElement('div');
    set.className = 'set';
    set.style.animationDelay = `${i * 0.1}s`;

    const label = document.createElement('span');
    label.className = 'set-label';
    label.textContent = String.fromCharCode(65 + i);

    const balls = document.createElement('div');
    balls.className = 'balls';

    numbers.forEach(num => {
      const ball = document.createElement('div');
      ball.className = `ball ${getBallClass(num)}`;
      ball.textContent = num;
      balls.appendChild(ball);
    });

    set.appendChild(label);
    set.appendChild(balls);
    results.appendChild(set);
  }
}

/* ===== Theme Toggle ===== */
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  body.classList.toggle('light');

  const isLight = body.classList.contains('light');
  btn.textContent = isLight ? '\u2600\uFE0F' : '\uD83C\uDF19';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '\u2600\uFE0F';
  }
}

/* ===== Mobile Navigation ===== */
function toggleNav() {
  const links = document.querySelector('.nav-links');
  if (links) links.classList.toggle('open');
}

/* ===== Stats Page: Frequency Chart ===== */
function renderFrequencyChart() {
  const chartEl = document.getElementById('frequencyChart');
  if (!chartEl) return;

  // Simulated frequency data (based on historical Lotto 6/45 patterns)
  const freq = [
    142,137,145,130,139,148,133,141,136,150,
    128,144,138,131,147,135,143,129,146,140,
    132,149,134,137,141,145,130,138,142,136,
    148,127,144,139,133,146,140,131,143,135,
    147,129,137,141,134
  ];

  const maxFreq = Math.max(...freq);

  const colors = ['#fbc531','#fbc531','#fbc531','#fbc531','#fbc531',
    '#fbc531','#fbc531','#fbc531','#fbc531','#fbc531',
    '#487eb0','#487eb0','#487eb0','#487eb0','#487eb0',
    '#487eb0','#487eb0','#487eb0','#487eb0','#487eb0',
    '#e84118','#e84118','#e84118','#e84118','#e84118',
    '#e84118','#e84118','#e84118','#e84118','#e84118',
    '#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c',
    '#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c','#8c8c8c',
    '#44bd32','#44bd32','#44bd32','#44bd32','#44bd32'];

  let html = '';
  for (let i = 0; i < 45; i++) {
    const height = Math.round((freq[i] / maxFreq) * 180);
    html += `<div class="bar-wrapper">
      <div class="bar" style="height:${height}px;background:${colors[i]}"></div>
      <span class="bar-label">${i + 1}</span>
    </div>`;
  }
  chartEl.innerHTML = html;
}

/* ===== Stats Page: Recent Draws Table ===== */
function renderRecentDraws() {
  const tableBody = document.getElementById('recentDrawsBody');
  if (!tableBody) return;

  // Real draw data from dhlottery.co.kr (verified)
  const draws = [
    { round: 1211, date: '2026-02-14', numbers: [23, 26, 27, 35, 38, 40], bonus: 10,
      prize1: '2,370,956,036', winners1: 14, prize2: '64,328,265', winners2: 86 },
    { round: 1210, date: '2026-02-07', numbers: [1, 7, 9, 17, 27, 38], bonus: 31,
      prize1: '1,102,298,407', winners1: 24, prize2: '28,818,259', winners2: 153 },
    { round: 1209, date: '2026-01-31', numbers: [2, 17, 20, 35, 37, 39], bonus: 24,
      prize1: '1,371,910,466', winners1: 22, prize2: '68,908,745', winners2: 73 },
    { round: 1208, date: '2026-01-24', numbers: [6, 27, 30, 36, 38, 42], bonus: 25,
      prize1: '5,001,713,625', winners1: 6, prize2: '73,554,613', winners2: 68 },
    { round: 1207, date: '2026-01-17', numbers: [10, 22, 24, 27, 38, 45], bonus: 11,
      prize1: '1,733,202,949', winners1: 17, prize2: '57,101,648', winners2: 86 },
    { round: 1206, date: '2026-01-10', numbers: [1, 3, 17, 26, 27, 42], bonus: 23,
      prize1: '1,868,807,000', winners1: 15, prize2: '63,135,372', winners2: 74 },
    { round: 1205, date: '2026-01-03', numbers: [1, 4, 16, 23, 31, 41], bonus: 2,
      prize1: '3,226,386,263', winners1: 10, prize2: '55,436,191', winners2: 97 },
    { round: 1204, date: '2025-12-27', numbers: [8, 16, 28, 30, 31, 44], bonus: 27,
      prize1: '1,661,000,000', winners1: 18, prize2: '52,450,000', winners2: 95 },
  ];

  let html = '';
  draws.forEach(d => {
    const ballsHtml = d.numbers.map(n =>
      `<span class="ball ${getBallClass(n)}" style="width:30px;height:30px;font-size:0.75rem;display:inline-flex">${n}</span>`
    ).join(' ');
    const bonusHtml = `<span class="ball ${getBallClass(d.bonus)}" style="width:30px;height:30px;font-size:0.75rem;display:inline-flex;opacity:0.7">${d.bonus}</span>`;

    html += `<tr class="draw-row" onclick="togglePrizeDetail(this)" style="cursor:pointer">
      <td>${d.round}회</td>
      <td>${d.date}</td>
      <td>${ballsHtml}</td>
      <td>${bonusHtml}</td>
    </tr>
    <tr class="prize-detail" style="display:none">
      <td colspan="4">
        <div class="prize-info">
          <span class="prize-badge p1">1등</span> ${d.winners1}명 &mdash; 각 <strong>${d.prize1}원</strong>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span class="prize-badge p2">2등</span> ${d.winners2}명 &mdash; 각 <strong>${d.prize2}원</strong>
        </div>
      </td>
    </tr>`;
  });
  tableBody.innerHTML = html;
}

function togglePrizeDetail(row) {
  const detail = row.nextElementSibling;
  if (detail && detail.classList.contains('prize-detail')) {
    detail.style.display = detail.style.display === 'none' ? 'table-row' : 'none';
  }
}

/* ===== Init ===== */
loadTheme();

// Page-specific init
if (document.getElementById('results')) {
  generateLotto();
}
if (document.getElementById('frequencyChart')) {
  renderFrequencyChart();
}
if (document.getElementById('recentDrawsBody')) {
  renderRecentDraws();
}
