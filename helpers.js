/* ============================================================
   PlantPal — Utility Helpers
   src/utils/helpers.js
   ============================================================ */

/**
 * Format seconds into HH:MM:SS string
 * @param {number} totalSeconds
 * @returns {string}
 */
function fmtTime(totalSeconds) {
  const h  = Math.floor(totalSeconds / 3600);
  const m  = Math.floor((totalSeconds % 3600) / 60);
  const s  = totalSeconds % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

/**
 * Create a DOM element with optional class and inner HTML
 * @param {string} tag
 * @param {object} opts  – { className, html, text, attrs }
 * @returns {HTMLElement}
 */
function el(tag, opts = {}) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.html)      node.innerHTML  = opts.html;
  if (opts.text)      node.textContent = opts.text;
  if (opts.attrs)     Object.entries(opts.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
}

/**
 * Randomly succeed based on percentage
 * @param {number} pct  0-100
 * @returns {boolean}
 */
function rollChance(pct) {
  return Math.random() * 100 < pct;
}

/**
 * Clamp a number between min and max
 */
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

/**
 * Plant stage emoji sequence
 */
const PLANT_STAGES = ['🌱', '🪴', '🌸', '🌺', '🌳'];

/**
 * Available plants for onboarding
 */
const PLANTS = [
  { icon: '🌸', name: 'Cherry' },
  { icon: '🌵', name: 'Cactus' },
  { icon: '🪴', name: 'Pothos' },
  { icon: '🌻', name: 'Sunflower' },
  { icon: '🍀', name: 'Clover' },
  { icon: '🌿', name: 'Fern' },
];

/**
 * Mock friend feed data
 */
const FEED_ITEMS = [
  { icon: '🌿', name: 'Alex Lin',   loc: 'Library garden' },
  { icon: '🌸', name: 'Kay Yu',     loc: 'Rooftop terrace' },
  { icon: '🌻', name: 'Mike Jang',  loc: 'Campus park' },
];

/**
 * Mock friends list
 */
const FRIENDS_LIST = [
  { initials: 'AL', name: 'Alex Lin',  id: '#alex_2847', plant: '🌿', bg: 'var(--green-100)', color: 'var(--green-700)' },
  { initials: 'KY', name: 'Kay Yu',    id: '#kayyu_cs',  plant: '🌸', bg: '#e8f5e9',          color: '#2e7d32' },
  { initials: 'MJ', name: 'Mike Jang', id: '#mikeJ_99',  plant: '🪴', bg: '#f1f8e9',          color: '#558b2f' },
  { initials: 'SR', name: 'Sara R',    id: '#sara_r',    plant: '🌱', bg: '#e0f2f1',          color: '#00695c' },
];
