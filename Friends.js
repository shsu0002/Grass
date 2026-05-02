/* ============================================================
   PlantPal — Friends Screen
   src/screens/Friends.js
   ============================================================ */

/**
 * Build the friends list + search screen.
 * @returns {HTMLElement}
 */
function buildFriendsScreen() {
  const screen = el('div', { className: 'screen', attrs: { id: 'tabFriends' } });

  const header = el('div', { className: 'screen-header', text: 'Friends' });

  // Search row
  const searchRow = el('div', { className: 'friends-search-row' });
  const searchInput = el('input', {
    className: 'search-input',
    attrs: { id: 'fsearch', placeholder: 'Search by ID...', style: 'flex:1;' }
  });
  searchInput.addEventListener('input', () => filterFriends(searchInput.value));
  const addBtn = el('button', { className: 'btn-primary', text: 'Add' });
  addBtn.addEventListener('click', () => addFriend(searchInput.value.trim()));
  searchRow.append(searchInput, addBtn);

  // Friend list
  const list = el('div', { attrs: { id: 'flist' } });
  FRIENDS_LIST.forEach(f => {
    const item = el('div', { className: 'friend-item' });
    item.innerHTML = `
      <div class="friend-avatar" style="background:${f.bg};color:${f.color};">${f.initials}</div>
      <div style="flex:1;">
        <div style="font-size:9px;font-weight:600;color:var(--text-main);">${f.name}</div>
        <div style="font-size:7px;color:var(--text-muted);">${f.id}</div>
      </div>
      <span style="font-size:14px;">${f.plant}</span>
    `;
    list.appendChild(item);
  });

  // Add message (hidden)
  const addMsg = el('div', { attrs: { id: 'fAddMsg', style: 'display:none;text-align:center;font-size:8px;color:var(--green-600);margin:6px 12px;font-weight:600;' } });

  // Footer notice
  const notice = el('div', { className: 'friends-notice' });
  notice.innerHTML = 'Your ID: <strong>#your_id_here</strong>';

  screen.append(header, searchRow, list, addMsg, notice);
  return screen;

  // ---- Helpers ----
  function filterFriends(val) {
    list.querySelectorAll('.friend-item').forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
    });
  }

  function addFriend(val) {
    if (!val) return;
    addMsg.textContent = `Friend request sent to ${val} ✓`;
    addMsg.style.display = 'block';
    searchInput.value = '';
    setTimeout(() => { addMsg.style.display = 'none'; }, 2500);
  }
}
