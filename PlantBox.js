/* ============================================================
   PlantPal — PlantBox Component
   src/components/PlantBox.js
   ============================================================ */

/**
 * Renders the animated plant display box.
 * @param {string} plantIcon  – emoji
 * @returns {{ element: HTMLElement, animateWater: () => void, animateGrow: () => void }}
 */
function buildPlantBox(plantIcon = '🌸') {
  const box = el('div', { className: 'plant-box', attrs: { id: 'plantBox' } });
  box.innerHTML = `
    <div class="plant-soil"></div>
    <div style="display:flex;flex-direction:column;align-items:center;z-index:1;">
      <div class="plant-icon" id="plantIcon">${plantIcon}</div>
      <div class="plant-stem"></div>
    </div>
  `;

  /**
   * Drop a water droplet animation inside the box
   */
  function animateWater() {
    const drop = el('div', { className: 'water-anim', text: '💧' });
    drop.style.left = (30 + Math.random() * 40) + '%';
    drop.style.top  = '10px';
    box.appendChild(drop);
    setTimeout(() => drop.remove(), 800);
  }

  /**
   * Bounce the plant icon briefly
   */
  function animateGrow() {
    const icon = box.querySelector('.plant-icon');
    if (!icon) return;
    icon.style.transition = 'transform .2s';
    icon.style.transform  = 'scale(1.15)';
    setTimeout(() => { icon.style.transform = 'scale(1)'; }, 250);
  }

  /**
   * Update the emoji displayed
   */
  function setIcon(newIcon) {
    const icon = box.querySelector('.plant-icon');
    if (icon) icon.textContent = newIcon;
  }

  return { element: box, animateWater, animateGrow, setIcon };
}

/**
 * Build the water drops row (5 drops, n filled)
 * @param {number} filled  0-5
 * @returns {HTMLElement}
 */
function buildDropRow(filled = 0) {
  const row = el('div', { className: 'drop-row', attrs: { id: 'dropRow' } });
  for (let i = 0; i < 5; i++) {
    row.appendChild(el('div', { className: 'drop' + (i < filled ? ' filled' : '') }));
  }
  return row;
}

/**
 * Refresh the drop row in place
 * @param {number} filled
 */
function updateDropRow(filled) {
  const row = document.getElementById('dropRow');
  if (!row) return;
  row.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    row.appendChild(el('div', { className: 'drop' + (i < filled ? ' filled' : '') }));
  }
}
