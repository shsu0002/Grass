/* ============================================================
   PlantPal — Onboarding Screen
   src/screens/Onboarding.js
   ============================================================ */

/**
 * Build the full onboarding flow (3 steps).
 * @param {function} onComplete  – called with chosen plant { icon, name }
 * @returns {HTMLElement}
 */
function buildOnboarding(onComplete) {
  let step = 0;
  let chosen = { ...PLANTS[0] };

  const wrap = el('div', { className: 'onboard-wrap screen active', attrs: { id: 'scrOnboard' } });
  const card = el('div', { className: 'onboard-card' });

  // Step dots
  const dotsWrap = el('div', { className: 'step-dots' });
  const dots = [0, 1, 2].map(i => {
    const d = el('div', { className: 'step-dot' + (i === 0 ? ' active' : '') });
    dotsWrap.appendChild(d);
    return d;
  });

  // ---- STEP 0: Sign in ----
  const s0 = el('div', { attrs: { id: 'onboard-step0' } });
  s0.innerHTML = `
    <div class="onboard-title">Welcome to PlantPal 🌱</div>
    <div class="onboard-sub">Go outside, snap a photo, grow your plant. Built for CS students who need to touch grass.</div>
    <button class="btn-primary btn-ghost" style="width:100%;display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:5px;">
      <svg width="11" height="11" viewBox="0 0 24 24">
        <path fill="var(--green-500)" d="M12 11h8.533c.044.385.067.78.067 1.184 0 5.394-3.617 9.226-9.6 9.226A9.41 9.41 0 0 1 2.6 12 9.41 9.41 0 0 1 11 2.59c2.537 0 4.657.94 6.29 2.47l-2.55 2.55C13.698 6.58 12.437 6.09 11 6.09c-3.3 0-5.91 2.667-5.91 5.91 0 3.244 2.61 5.91 5.91 5.91 3.013 0 5.01-1.707 5.49-4.01H12v-2.9z"/>
      </svg>
      Sign in with Google
    </button>
  `;
  const s0Next = el('button', { className: 'btn-primary', text: 'Continue →', attrs: { style: 'width:100%' } });
  s0Next.addEventListener('click', () => goStep(1));
  s0.appendChild(s0Next);

  // ---- STEP 1: Pick plant ----
  const s1 = el('div', { attrs: { id: 'onboard-step1' } });
  s1.style.display = 'none';
  const grid = el('div', { className: 'plant-grid' });
  PLANTS.forEach((p, i) => {
    const opt = el('div', { className: 'plant-opt' + (i === 0 ? ' selected' : '') });
    opt.innerHTML = `<div class="plant-opt-icon">${p.icon}</div><div class="plant-opt-name">${p.name}</div>`;
    opt.addEventListener('click', () => {
      grid.querySelectorAll('.plant-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      chosen = { ...p };
      s2Icon.textContent = p.icon;
      s2Name.textContent = p.name;
    });
    grid.appendChild(opt);
  });
  const s1Next = el('button', { className: 'btn-primary', text: 'Confirm →', attrs: { style: 'width:100%;margin-top:5px' } });
  s1Next.addEventListener('click', () => goStep(2));
  s1.innerHTML = `<div class="onboard-title">Pick your plant</div><div class="onboard-sub">It grows as you go outside. Choose wisely.</div>`;
  s1.append(grid, s1Next);

  // ---- STEP 2: Confirm ----
  const s2 = el('div', { attrs: { id: 'onboard-step2' } });
  s2.style.display = 'none';
  const s2Icon = el('div', { text: chosen.icon, attrs: { style: 'font-size:34px;text-align:center;margin:10px 0;' } });
  const s2Name = el('span', { text: chosen.name });
  const s2Sub  = el('div', { className: 'onboard-sub' });
  s2Sub.append('Your ', s2Name, ' is waiting. Head outside and snap your first photo!');
  const s2Btn  = el('button', { className: 'btn-primary', text: 'Start growing →', attrs: { style: 'width:100%;margin-top:8px' } });
  s2Btn.addEventListener('click', () => onComplete(chosen));
  s2.innerHTML = `<div class="onboard-title">You're all set!</div>`;
  s2.append(s2Sub, s2Icon, s2Btn);

  const steps = [s0, s1, s2];

  function goStep(n) {
    steps[step].style.display = 'none';
    dots[step].classList.remove('active');
    step = n;
    steps[step].style.display = 'block';
    dots[step].classList.add('active');
  }

  card.append(dotsWrap, s0, s1, s2);
  wrap.appendChild(card);
  return wrap;
}
