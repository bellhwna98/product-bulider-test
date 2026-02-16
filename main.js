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

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  body.classList.toggle('light');

  const isLight = body.classList.contains('light');
  btn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    document.getElementById('themeToggle').textContent = '☀️';
  }
}

loadTheme();
generateLotto();
