/* ============================================================
   PlantPal — Home Screen
   src/screens/Home.js
   ============================================================ */

/**
 * Build the home feed screen (swipeable photos + idle timer).
 * @returns {HTMLElement}
 */
function buildHomeScreen() {
  const screen = el('div', { className: 'screen', attrs: { id: 'tabHome' } });

  // Top bar
  const topbar = el('div', { className: 'home-topbar' });
  topbar.innerHTML = `
    <div class="home-topbar-brand">PlantPal</div>
    <div class="home-topbar-status">12 friends online</div>
  `;

  // Photo card + dots
  const { element: photoCard, dots: feedDots } = buildPhotoCard();

  // Idle row
  const idleRow = el('div', { className: 'idle-row' });
  idleRow.innerHTML = `
    <div class="sbar-dot"></div>
    <div style="font-size:8px;color:var(--text-sub);">Idle window</div>
    <div class="idle-timer" id="timerDisp">01:23:44</div>
  `;

  // Stats row
  const statsRow = el('div', { className: 'chance-row' });
  statsRow.innerHTML = `Posts: <span id="postCnt">3</span> · Watering chance: <span id="chancePct">38%</span>`;

  screen.append(topbar, photoCard, feedDots, idleRow, statsRow);
  return screen;
}
