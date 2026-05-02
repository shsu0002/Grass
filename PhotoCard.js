/* ============================================================
   PlantPal — PhotoCard (swipeable feed) Component
   src/components/PhotoCard.js
   ============================================================ */

/**
 * Builds the swipeable friend photo card.
 * @returns {{ element: HTMLElement, dots: HTMLElement }}
 */
function buildPhotoCard(initialFeedIdx = 0) {
  let feedIdx    = initialFeedIdx;
  let swipeStartX = 0;

  // Card
  const card = el('div', { className: 'photo-card', attrs: { id: 'photoCard' } });
  card.innerHTML = `
    <div class="swipe-hint">← swipe →</div>
    <div class="photo-inner" id="feedInner" style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
      <div class="feed-icon" style="font-size:38px;">${FEED_ITEMS[feedIdx].icon}</div>
      <div style="font-size:8px;color:var(--text-sub);">${FEED_ITEMS[feedIdx].name} · 2 min ago</div>
    </div>
    <div class="photo-footer">
      <div style="width:20px;height:20px;border-radius:50%;background:var(--green-100);display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:600;color:var(--green-700);flex-shrink:0;" id="feedAvatar">AL</div>
      <div>
        <div style="font-size:8px;font-weight:600;color:var(--text-main);" id="feedName">${FEED_ITEMS[feedIdx].name}</div>
        <div style="font-size:7px;color:var(--text-muted);" id="feedLoc">📍 ${FEED_ITEMS[feedIdx].loc}</div>
      </div>
      <div style="margin-left:auto;display:flex;gap:5px;">
        <span style="font-size:13px;cursor:pointer;">🔥</span>
        <span style="font-size:13px;cursor:pointer;">💚</span>
        <span style="font-size:13px;cursor:pointer;">🌿</span>
      </div>
    </div>
  `;

  // Dot indicators
  const dotsEl = el('div', { className: 'feed-dots' });
  FEED_ITEMS.forEach((_, i) => {
    dotsEl.appendChild(el('div', { className: 'feed-dot' + (i === 0 ? ' active' : '') }));
  });

  function updateDots() {
    dotsEl.querySelectorAll('.feed-dot').forEach((d, i) => {
      d.classList.toggle('active', i === feedIdx);
    });
  }

  function animSwipe(dir) {
    const inner = document.getElementById('feedInner');
    inner.style.animation = (dir === 'left' ? 'swipeL' : 'swipeR') + ' .26s ease forwards';
    setTimeout(() => {
      feedIdx = (feedIdx + (dir === 'left' ? 1 : -1) + FEED_ITEMS.length) % FEED_ITEMS.length;
      const f = FEED_ITEMS[feedIdx];
      inner.innerHTML = `
        <div style="font-size:38px;">${f.icon}</div>
        <div style="font-size:8px;color:var(--text-sub);">${f.name} · just now</div>
      `;
      document.getElementById('feedName').textContent = f.name;
      document.getElementById('feedLoc').textContent  = '📍 ' + f.loc;
      inner.style.animation = (dir === 'left' ? 'inFromR' : 'inFromL') + ' .26s ease forwards';
      updateDots();
      setTimeout(() => { inner.style.animation = ''; }, 270);
    }, 260);
  }

  card.addEventListener('mousedown',   e => { swipeStartX = e.clientX; });
  card.addEventListener('touchstart',  e => { swipeStartX = e.touches[0].clientX; });
  card.addEventListener('mouseup',     e => { if (Math.abs(e.clientX - swipeStartX) > 18) animSwipe(e.clientX < swipeStartX ? 'left' : 'right'); });
  card.addEventListener('touchend',    e => { const ex = e.changedTouches[0].clientX; if (Math.abs(ex - swipeStartX) > 18) animSwipe(ex < swipeStartX ? 'left' : 'right'); });

  return { element: card, dots: dotsEl };
}
