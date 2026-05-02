/* ============================================================
   PlantPal — Plant Screen
   src/screens/Plant.js
   ============================================================ */

/**
 * Build the plant care screen.
 * @returns {HTMLElement}
 */
function buildPlantScreen() {
  const screen = el('div', { className: 'screen', attrs: { id: 'tabPlant' } });

  const header = el('div', { className: 'screen-header', text: 'My Plant' });

  const plantHeader = el('div', { className: 'plant-header' });
  plantHeader.innerHTML = `
    <div class="pill">Level <span id="lvTxt">2</span></div>
    <div style="font-size:7px;color:var(--text-muted);" id="xpTxt">42 / 100 XP</div>
  `;

  // Plant display
  const { element: plantBox, animateWater, animateGrow } = buildPlantBox(State.get('chosenPlant').icon);

  // XP bar
  const xpWrap = el('div', { className: 'xp-wrap', attrs: { style: 'margin-top:5px;' } });
  xpWrap.innerHTML = `<div class="xp-bar" id="xpBar" style="width:42%;"></div>`;

  // Water row
  const waterRow = el('div', { className: 'plant-water-row' });
  const dropRow  = buildDropRow(State.get('waterCount'));
  const waterBtn = el('button', { className: 'water-btn', text: '💧' });
  waterBtn.addEventListener('click', handleWater);
  waterRow.append(dropRow, waterBtn);

  // Message
  const msg = el('div', { className: 'plant-msg', attrs: { id: 'waterMsg' }, text: 'Post more photos → higher watering chance!' });

  // Stage track
  const track = el('div', { className: 'stage-track' });
  const chosen = State.get('chosenPlant');
  ['🌱','🪴', chosen.icon, '🌺'].forEach((icon, i) => {
    track.appendChild(el('div', {
      className: 'stage-item' + (i === 2 ? ' current' : '') + (i === 3 ? ' locked' : ''),
      text: icon,
      attrs: i === 3 ? { id: 'nextStage' } : (i === 2 ? { id: 'curStage' } : {})
    }));
  });

  screen.append(header, plantHeader, plantBox, xpWrap, waterRow, msg, track);

  // ---- Water logic ----
  function handleWater() {
    if (!State.canWater()) {
      msg.textContent = 'Daily limit reached! Come back tomorrow 🌙';
      return;
    }
    const chance = State.calcWaterChance();
    const ok     = rollChance(chance);
    State.set('waterCount', State.get('waterCount') + 1);
    updateDropRow(State.get('waterCount'));

    if (ok) {
      animateWater();
      animateGrow();
      const gain  = Math.round(5 + Math.random() * 8);
      const newXP = clamp(State.get('xp') + gain, 0, 100);
      State.set('xp', newXP);
      document.getElementById('xpBar').style.width = newXP + '%';
      document.getElementById('xpTxt').textContent = newXP + ' / 100 XP';
      msg.textContent = `Watered! +${gain} XP 🌿 (${State.get('waterMax') - State.get('waterCount')} left today)`;
      if (newXP >= 100) {
        const lv = State.get('plantLevel') + 1;
        State.patch({ plantLevel: lv, xp: 0 });
        document.getElementById('lvTxt').textContent = lv;
        document.getElementById('xpBar').style.width = '0%';
        msg.textContent = `🎉 Plant leveled up! Welcome to Level ${lv}!`;
      }
    } else {
      msg.textContent = `Missed… post more for better odds! (${State.get('waterMax') - State.get('waterCount')} left)`;
    }
  }

  return screen;
}
