/** The symbols are drawn locally so the experience also works without a network. */
export const SYMBOLS = Object.freeze([
  { id: 'sparkle', label: 'وميض', color: '#83edff' },
  { id: 'moon', label: 'هلال', color: '#c4b5fd' },
  { id: 'sun', label: 'شمس', color: '#ffd479' },
  { id: 'planet', label: 'كوكب', color: '#faa9dd' },
  { id: 'diamond', label: 'ماسة', color: '#83edff' },
  { id: 'flame', label: 'شعلة', color: '#ffb48e' },
  { id: 'star', label: 'نجمة', color: '#ffd479' },
  { id: 'heart', label: 'قلب', color: '#faa9dd' },
  { id: 'lightning', label: 'برق', color: '#ffd479' },
  { id: 'eye', label: 'عين', color: '#b9a5ff' },
  { id: 'flower', label: 'زهرة', color: '#faa9dd' },
  { id: 'comet', label: 'مذنّب', color: '#83edff' },
  { id: 'orbit', label: 'مدار', color: '#9af3d2' },
  { id: 'crown', label: 'تاج', color: '#ffd479' },
  { id: 'butterfly', label: 'فراشة', color: '#c4b5fd' },
  { id: 'hexagon', label: 'سداسي', color: '#9af3d2' },
  { id: 'clover', label: 'برسيم', color: '#9af3d2' },
  { id: 'lotus', label: 'لوتس', color: '#faa9dd' },
  { id: 'waves', label: 'أمواج', color: '#83edff' },
  { id: 'spiral', label: 'دوّامة', color: '#c4b5fd' },
  { id: 'infinity', label: 'لانهاية', color: '#9af3d2' },
  { id: 'snowflake', label: 'بلورة', color: '#83edff' },
  { id: 'drop', label: 'قطرة', color: '#b9a5ff' },
  { id: 'compass', label: 'بوصلة', color: '#ffd479' },
].map(Object.freeze));

const DRAWINGS = Object.freeze({
  sparkle: '<path d="m16 3 3.5 9.5L29 16l-9.5 3.5L16 29l-3.5-9.5L3 16l9.5-3.5Z"/><path d="m26 3 .8 2.2L29 6l-2.2.8L26 9l-.8-2.2L23 6l2.2-.8Z"/>',
  moon: '<path d="M25.8 21.1A12 12 0 0 1 10.9 6.2 12 12 0 1 0 25.8 21.1Z"/><path d="m23 4 1.2 3.8L28 9l-3.8 1.2L23 14l-1.2-3.8L18 9l3.8-1.2Z"/>',
  sun: '<circle cx="16" cy="16" r="6"/><path d="M16 2v4m0 20v4M2 16h4m20 0h4M6.1 6.1 9 9m14 14 2.9 2.9M6.1 25.9 9 23M23 9l2.9-2.9"/>',
  planet: '<circle cx="16" cy="16" r="9"/><ellipse cx="16" cy="16" rx="15" ry="4.5" transform="rotate(-29 16 16)"/><path d="M13 10a6 6 0 0 1 6 0"/>',
  diamond: '<path d="m3 12 6-7h14l6 7-13 16Z"/><path d="M3 12h26M9 5l7 23 7-23M9 5l7 7 7-7"/>',
  flame: '<path d="M18 3c2 7-5 7-2 13 2-1 3-3 3-6 5 4 8 8 6 13a10 10 0 0 1-18-1C4 14 13 11 12 5c2 1 3 3 3 5 2-2 3-4 3-7Z"/><path d="M16 19c-5 4-4 8 0 9 5-1 4-6 0-9Z"/>',
  star: '<path d="m16 3 4.1 8.3 9.2 1.4-6.7 6.5 1.6 9.2L16 24l-8.2 4.4 1.6-9.2-6.7-6.5 9.2-1.4Z"/>',
  heart: '<path d="M16 28 5.3 17.4C-3 9.2 9.2-1 16 8c6.8-9 19 1.2 10.7 9.4Z"/><path d="M8 9c-2 0-3 2-2 4"/>',
  lightning: '<path d="M18 2 5 19h9l-1 11 14-18h-9Z"/>',
  eye: '<path d="M2 16S7 6 16 6s14 10 14 10-5 10-14 10S2 16 2 16Z"/><circle cx="16" cy="16" r="5"/><circle cx="17.5" cy="14.5" r="1" fill="currentColor" stroke="none"/>',
  flower: '<path d="M16 10c-7-13-16 1-6 6-13 7 1 16 6 6 7 13 16-1 6-6 13-7-1-16-6-6Z"/><circle cx="16" cy="16" r="4"/>',
  comet: '<path d="m3 3 12 7M3 10l7 4M10 3l5 5"/><circle cx="21" cy="21" r="8"/><path d="m5 19 6 1M19 5l1 6M18 20a3.5 3.5 0 0 1 4-2"/>',
  orbit: '<ellipse cx="16" cy="16" rx="14" ry="6"/><ellipse cx="16" cy="16" rx="14" ry="6" transform="rotate(60 16 16)"/><ellipse cx="16" cy="16" rx="14" ry="6" transform="rotate(120 16 16)"/><circle cx="16" cy="16" r="2" fill="currentColor" stroke="none"/>',
  crown: '<path d="m4 9 6 6 6-10 6 10 6-6-3 16H7Z"/><path d="M8 21h16M7 29h18"/><circle cx="4" cy="7" r="1.5"/><circle cx="16" cy="3" r="1.5"/><circle cx="28" cy="7" r="1.5"/>',
  butterfly: '<path d="M16 14C8-1-4 5 8 18c-9 10 5 15 8 3 3 12 17 7 8-3C36 5 24-1 16 14Z"/><path d="M16 12v12m0-12-3-5m3 5 3-5"/>',
  hexagon: '<path d="m16 2 12 7v14l-12 7-12-7V9Z"/><path d="m16 9 6 3.5v7L16 23l-6-3.5v-7ZM4 9l6 3.5m12 7 6 3.5M16 2v7m0 14v7M4 23l6-3.5m12-7L28 9"/>',
  clover: '<path d="M16 16C7 16 3 11 6 7c4-4 10 0 10 9Zm0 0c0-9 5-13 9-10 4 4 0 10-9 10Zm0 0c9 0 13 5 10 9-4 4-10 0-10-9Zm0 0c0 9-5 13-9 10-4-4 0-10 9-10Z"/><path d="M16 16c0 7-2 11-6 14"/>',
  lotus: '<path d="M16 3c-9 9-9 17 0 25 9-8 9-16 0-25Z"/><path d="M16 28C5 28 2 19 3 12c7 0 12 5 13 16Zm0 0c11 0 14-9 13-16-7 0-12 5-13 16Z"/>',
  waves: '<path d="M3 9c4-7 9 7 13 0s9 7 13 0M3 16c4-7 9 7 13 0s9 7 13 0M3 23c4-7 9 7 13 0s9 7 13 0"/>',
  spiral: '<path d="M15 16c0-3 5-3 5 1 0 6-10 6-10-1 0-10 16-10 16 1 0 15-24 15-24-1C2 3 15-2 25 5"/>',
  infinity: '<path d="M16 16C10 6 3 7 3 16s7 10 13 0c6-10 13-9 13 0s-7 10-13 0Z"/>',
  snowflake: '<path d="M16 2v28M3.9 9l24.2 14M3.9 23 28.1 9M11 5l5 5 5-5M11 27l5-5 5 5M4 14l7-2-2-7M28 18l-7 2 2 7M4 18l7 2-2 7M28 14l-7-2 2-7"/>',
  drop: '<path d="M16 2C12 9 5 14 5 21a11 11 0 0 0 22 0C27 14 20 9 16 2Z"/><path d="M10 21a6 6 0 0 0 6 6"/>',
  compass: '<circle cx="16" cy="16" r="13"/><path d="m22 10-4 8-8 4 4-8Z"/><path d="M16 3v3m0 20v3M3 16h3m20 0h3m-12-2 4 4"/>',
});

const escapeAttribute = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

/** Inline vector artwork; callers may supply a CSS class but never raw markup. */
export function symbolMarkup(id, extraClass = '') {
  if (!Object.hasOwn(DRAWINGS, id)) throw new RangeError(`Unknown symbol: ${id}`);
  return `<svg class="symbol-icon ${escapeAttribute(extraClass)}" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${DRAWINGS[id]}</svg>`;
}

export function calculateOutcome(number) {
  if (!Number.isInteger(number) || number < 10 || number > 99) {
    throw new RangeError('Choose an integer from 10 to 99.');
  }
  return number - Math.floor(number / 10) - (number % 10);
}

function randomIndex(length) {
  if (globalThis.crypto?.getRandomValues) {
    // Reject the incomplete tail so each index has the same probability.
    const limit = Math.floor(0x100000000 / length) * length;
    const value = new Uint32Array(1);
    do { globalThis.crypto.getRandomValues(value); } while (value[0] >= limit);
    return value[0] % length;
  }
  return Math.floor(Math.random() * length);
}

export function createRound(previousSymbolId = null) {
  const candidates = SYMBOLS.filter(({ id }) => id !== previousSymbolId);
  const symbolId = candidates[randomIndex(candidates.length)].id;
  const otherSymbols = SYMBOLS.filter(({ id }) => id !== symbolId);
  const cells = Array.from({ length: 100 }, (_, number) => ({
    number,
    symbolId: number >= 9 && number <= 81 && number % 9 === 0
      ? symbolId
      : otherSymbols[randomIndex(otherSymbols.length)].id,
  }));
  return { symbolId, cells };
}
