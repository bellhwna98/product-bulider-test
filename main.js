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

  // Sample recent draw data
  const draws = [
    { round: 1155, date: '2025-02-08', numbers: [3, 11, 18, 27, 34, 42], bonus: 7 },
    { round: 1154, date: '2025-02-01', numbers: [5, 14, 19, 23, 38, 45], bonus: 31 },
    { round: 1153, date: '2025-01-25', numbers: [2, 8, 16, 29, 33, 40], bonus: 12 },
    { round: 1152, date: '2025-01-18', numbers: [1, 10, 22, 30, 37, 44], bonus: 25 },
    { round: 1151, date: '2025-01-11', numbers: [6, 13, 21, 28, 35, 41], bonus: 9 },
    { round: 1150, date: '2025-01-04', numbers: [4, 15, 20, 26, 32, 43], bonus: 17 },
    { round: 1149, date: '2024-12-28', numbers: [7, 12, 24, 31, 36, 39], bonus: 2 },
    { round: 1148, date: '2024-12-21', numbers: [9, 17, 25, 33, 38, 45], bonus: 14 },
  ];

  let html = '';
  draws.forEach(d => {
    const ballsHtml = d.numbers.map(n =>
      `<span class="ball ${getBallClass(n)}" style="width:30px;height:30px;font-size:0.75rem;display:inline-flex">${n}</span>`
    ).join(' ');
    const bonusHtml = `<span class="ball ${getBallClass(d.bonus)}" style="width:30px;height:30px;font-size:0.75rem;display:inline-flex;opacity:0.7">${d.bonus}</span>`;

    html += `<tr>
      <td>${d.round}</td>
      <td>${d.date}</td>
      <td>${ballsHtml}</td>
      <td>${bonusHtml}</td>
    </tr>`;
  });
  tableBody.innerHTML = html;
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
