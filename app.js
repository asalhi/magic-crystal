import { SYMBOLS, createRound, calculateOutcome, symbolMarkup } from './game.js';

const $ = (id) => document.getElementById(id);
const symbolsById = new Map(SYMBOLS.map((symbol) => [symbol.id, symbol]));
let round = createRound();
let roundCount = 1;
let currentView = 'welcome';
let revealTimer;
let toastTimer;
let soundEnabled = false;
let audioContext;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function decorateSky() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 52; i++) {
    const star = document.createElement('i');
    star.className = `star${i % 13 === 0 ? ' cross' : ''}`;
    const size = i % 13 === 0 ? 8 : (i % 3) + 1;
    Object.assign(star.style, { left: `${(i * 37.31) % 100}%`, top: `${(i * 23.73) % 100}%`, width: `${size}px`, height: `${size}px`, animationDelay: `${-(i % 7)}s` });
    fragment.append(star);
  }
  $('stars').append(fragment);
}

function renderGrid() {
  const fragment = document.createDocumentFragment();
  round.cells.forEach(({ number, symbolId }) => {
    const symbol = symbolsById.get(symbolId);
    const cell = document.createElement('div');
    cell.className = `symbol-cell${number >= 9 && number <= 81 && number % 9 === 0 ? ' pattern-cell' : ''}`;
    cell.setAttribute('role', 'listitem');
    cell.setAttribute('aria-label', `${number}: ${symbol.label}`);
    const numberElement = document.createElement('span');
    numberElement.className = 'cell-number';
    numberElement.textContent = number;
    cell.append(numberElement);
    const icon = document.createElement('span');
    icon.style.color = symbol.color;
    icon.innerHTML = symbolMarkup(symbolId, 'game-symbol');
    cell.append(icon);
    fragment.append(cell);
  });
  $('symbol-grid').replaceChildren(fragment);
  $('symbol-grid').classList.remove('pattern-visible');
  $('hide-pattern').hidden = true;
  $('round-number').textContent = String(roundCount).padStart(2, '0');
}

function showGame({ focus = true } = {}) {
  currentView = 'game';
  $('welcome-view').hidden = true;
  $('game-view').hidden = false;
  if (focus) {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    $('game-title').focus({ preventScroll: true });
  }
}

function goHome() {
  currentView = 'welcome';
  $('game-view').hidden = true;
  $('welcome-view').hidden = false;
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}

function newRound() {
  if ($('result-dialog').open) $('result-dialog').close();
  round = createRound(round.symbolId);
  roundCount++;
  renderGrid();
  showGame();
  playChime('start');
  toast('رموز جديدة، وفرصة جديدة للدهشة. اختر عددًا في سرّك!');
}

function openDialog(id) {
  const dialog = $(id);
  if (!dialog.open) dialog.showModal();
}

function openHelp() { openDialog('help-dialog'); }

function openTeacher() {
  $('teacher-gate').hidden = false;
  $('teacher-secret').hidden = true;
  openDialog('teacher-dialog');
}

function reveal() {
  if ($('result-dialog').open) return;
  $('reading-state').hidden = false;
  $('revealed-state').hidden = true;
  $('result-dialog').setAttribute('aria-label', 'البلورة تستعد لكشف الرمز');
  $('result-dialog').removeAttribute('aria-labelledby');
  openDialog('result-dialog');
  playChime('reading');
  revealTimer = window.setTimeout(() => {
    if (!$('result-dialog').open) return;
    const symbol = symbolsById.get(round.symbolId);
    $('result-symbol').innerHTML = symbolMarkup(round.symbolId, 'game-symbol');
    $('result-symbol').style.color = symbol.color;
    $('result-label').textContent = symbol.label;
    $('result-label').style.color = symbol.color;
    $('reading-state').hidden = true;
    $('revealed-state').hidden = false;
    $('result-dialog').removeAttribute('aria-label');
    $('result-dialog').setAttribute('aria-labelledby', 'result-title');
    $('play-again').focus({ preventScroll: true });
    playChime('reveal');
  }, reducedMotion.matches ? 200 : 2300);
}

function updateDemo() {
  const input = $('demo-number');
  const value = input.valueAsNumber;
  if (!input.checkValidity() || !Number.isInteger(value)) {
    $('demo-output').textContent = 'أدخل عددًا صحيحًا من 10 إلى 99.';
    return;
  }
  const tens = Math.floor(value / 10);
  const units = value % 10;
  const output = calculateOutcome(value);
  $('demo-output').innerHTML = `<bdi>${value} − (${tens} + ${units}) = ${output} = 9 × ${tens}</bdi>`;
}

function toast(message) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').hidden = false;
  toastTimer = window.setTimeout(() => { $('toast').hidden = true; }, 4200);
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function playChime(kind) {
  if (!soundEnabled) return;
  const context = getAudioContext();
  if (!context) return;
  const notes = kind === 'reveal' ? [523.25, 659.25, 783.99, 1046.5] : kind === 'reading' ? [261.63, 392, 523.25] : [523.25, 783.99];
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * (kind === 'reading' ? 0.38 : 0.13);
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.065, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 1.25);
  });
}

$('brand').addEventListener('click', (event) => { event.preventDefault(); goHome(); });
$('experience-nav').addEventListener('click', () => currentView === 'game' ? showGame() : goHome());
$('start-button').addEventListener('click', () => { showGame(); playChime('start'); });
['help-nav', 'example-button', 'game-help'].forEach((id) => $(id).addEventListener('click', openHelp));
$('help-start').addEventListener('click', () => { $('help-dialog').close(); showGame(); });
$('teacher-nav').addEventListener('click', openTeacher);
$('unlock-secret').addEventListener('click', () => { $('teacher-gate').hidden = true; $('teacher-secret').hidden = false; updateDemo(); $('demo-number').focus(); });
$('demo-number').addEventListener('input', updateDemo);
$('show-pattern').addEventListener('click', () => {
  $('teacher-dialog').close();
  showGame();
  $('symbol-grid').classList.add('pattern-visible');
  $('hide-pattern').hidden = false;
  toast('تأمّل مضاعفات 9 من 9 إلى 81: جميعها تحمل الرمز نفسه.');
});
$('hide-pattern').addEventListener('click', () => { $('symbol-grid').classList.remove('pattern-visible'); $('hide-pattern').hidden = true; });
['orb-button', 'reveal-button'].forEach((id) => $(id).addEventListener('click', reveal));
$('play-again').addEventListener('click', newRound);
$('new-round-top').addEventListener('click', newRound);
$('back-to-board').addEventListener('click', () => $('result-dialog').close());
$('result-dialog').addEventListener('close', () => { clearTimeout(revealTimer); });
$('sound-toggle').addEventListener('click', () => {
  if (!soundEnabled && !getAudioContext()) { toast('هذا المتصفح لا يدعم المؤثرات الصوتية.'); return; }
  soundEnabled = !soundEnabled;
  const label = soundEnabled ? 'إيقاف المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية';
  $('sound-toggle').setAttribute('aria-pressed', String(soundEnabled));
  $('sound-toggle').setAttribute('aria-label', label);
  $('sound-toggle').title = label;
  $('sound-toggle').querySelector('use').setAttribute('href', soundEnabled ? '#i-sound' : '#i-mute');
  if (soundEnabled) playChime('start');
});
$('fullscreen-toggle').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else { toast('استخدم زر ملء الشاشة في متصفحك للعرض الصفي.'); return; }
  } catch { toast('تعذّر تفعيل ملء الشاشة هنا. افتح التجربة في تبويب متصفح مستقل.'); }
});
document.addEventListener('fullscreenchange', () => {
  const enabled = Boolean(document.fullscreenElement);
  $('fullscreen-toggle').setAttribute('aria-label', enabled ? 'الخروج من ملء الشاشة' : 'ملء الشاشة');
  $('fullscreen-toggle').setAttribute('aria-pressed', String(enabled));
  $('fullscreen-toggle').title = enabled ? 'الخروج من ملء الشاشة' : 'ملء الشاشة';
});
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});

decorateSky();
renderGrid();
