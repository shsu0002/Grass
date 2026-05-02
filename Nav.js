/* ============================================================
   PlantPal — Nav Component
   src/components/Nav.js
   ============================================================ */

/**
 * Build a bottom navigation bar.
 * @param {object} opts
 *   activeTab  – 'plant' | 'friends' | null
 *   onPlant    – click handler for plant button
 *   onCamera   – click handler for camera button
 *   onFriends  – click handler for friends button
 *   camLocked  – bool, show locked state on camera
 *   camTimer   – string, timer text shown inside camera btn
 * @returns {HTMLElement}
 */
function buildNav({ activeTab, onPlant, onCamera, onFriends, camLocked, camTimer, camClickable = true } = {}) {
  const nav = el('div', { className: 'nav' });

  // Plant button
  const plantBtn = el('button', {
    className: 'nav-btn' + (activeTab === 'plant' ? ' active' : ''),
    html: `<svg viewBox="0 0 24 24">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s-7 3-7 10c0 2.25.42 3.76 1 4.88L7.34 18A16.77 16.77 0 0 1 17 8z"/>
    </svg>`,
    attrs: { title: 'Plant' }
  });
  if (onPlant) plantBtn.addEventListener('click', onPlant);
  if (!camClickable) plantBtn.style.pointerEvents = 'none';

  // Camera button
  const camBtn = el('div', { className: 'nav-cam' + (camLocked ? ' locked' : '') });
  camBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      <circle cx="12" cy="12" r="3.2"/>
    </svg>
    <span class="nav-cam-timer" id="navCamTimer">${camTimer || ''}</span>
  `;
  if (onCamera) camBtn.addEventListener('click', onCamera);

  // Friends button
  const friendsBtn = el('button', {
    className: 'nav-btn' + (activeTab === 'friends' ? ' active' : ''),
    html: `<svg viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>`,
    attrs: { title: 'Friends' }
  });
  if (onFriends) friendsBtn.addEventListener('click', onFriends);
  if (!camClickable) friendsBtn.style.pointerEvents = 'none';

  nav.append(plantBtn, camBtn, friendsBtn);
  return nav;
}

/**
 * Build a static (non-interactive) nav for display phones
 * @param {'plant'|'friends'|null} activeTab
 */
function buildStaticNav(activeTab) {
  return buildNav({ activeTab, camClickable: false, camLocked: true });
}
