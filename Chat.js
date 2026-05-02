/* ============================================================
   PlantPal — Chat Screen
   src/screens/Chat.js
   ============================================================ */

const MOCK_MESSAGES = [
  { type: 'timestamp', text: 'Today 14:32' },
  { type: 'them', text: 'Did you go outside today?? Post a photo!' },
  { type: 'me',   text: 'Just took one near the library lol' },
  { type: 'them', text: 'Nice! My watering failed again 😭' },
  { type: 'timestamp', text: '14:45' },
  { type: 'me',   text: 'Post more = higher chance! Go touch grass' },
  { type: 'them', text: 'Your plant looks so good btw!!' },
];

/**
 * Build the chat screen.
 * @returns {HTMLElement}
 */
function buildChatScreen() {
  const screen = el('div', { className: 'screen active', attrs: { id: 'scrChat' } });
  screen.style.flex = '1';
  screen.style.minHeight = '0';

  // Header
  const header = el('div', { className: 'chat-header' });
  header.innerHTML = `
    <div class="friend-avatar" style="background:var(--green-100);color:var(--green-700);font-size:9px;width:28px;height:28px;">AL</div>
    <div>
      <div class="chat-header-name">Alex Lin</div>
      <div class="chat-header-status">🌿 Level 3</div>
    </div>
  `;

  // Messages area
  const messages = el('div', { className: 'chat-messages', attrs: { id: 'chatMessages' } });
  MOCK_MESSAGES.forEach(m => {
    if (m.type === 'timestamp') {
      messages.appendChild(el('div', { className: 'chat-timestamp', text: m.text }));
    } else {
      messages.appendChild(el('div', { className: `bubble ${m.type}`, text: m.text }));
    }
  });

  // Input row
  const inputRow = el('div', { className: 'chat-input-row' });
  const input    = el('input', { className: 'input-base', attrs: { id: 'chatInput', placeholder: 'Message...' } });
  input.style.flex = '1';
  const sendBtn  = el('button', { className: 'chat-send-btn', text: '▶' });

  function send() {
    const val = input.value.trim();
    if (!val) return;
    messages.appendChild(el('div', { className: 'bubble me', text: val }));
    input.value = '';
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

  inputRow.append(input, sendBtn);
  screen.append(header, messages, inputRow);
  return screen;
}
