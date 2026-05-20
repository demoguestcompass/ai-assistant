(function () {
  var config = window.GuestCompassConfig || {};
  var hotelName = config.hotelName || 'GuestCompass AI';
  var color = config.color || '#F97316';
  var assistantUrl = config.assistantUrl || 'https://hospitality-ai.guestcompass.nl/';

  var styles = `
    #gc-widget-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ` + color + `;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 99999;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #gc-widget-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }
    #gc-widget-btn svg {
      width: 28px;
      height: 28px;
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: opacity 0.15s;
    }
    #gc-widget-btn .gc-icon-close { display: none; }
    #gc-widget-btn.gc-open .gc-icon-chat { display: none; }
    #gc-widget-btn.gc-open .gc-icon-close { display: block; }
    #gc-chat-window {
      position: fixed;
      bottom: 100px;
      right: 24px;
      width: 370px;
      height: 560px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      z-index: 99998;
      display: none;
      flex-direction: column;
      transform-origin: bottom right;
      transform: scale(0.85);
      opacity: 0;
      transition: transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease;
    }
    #gc-chat-window.gc-visible {
      display: flex;
      transform: scale(1);
      opacity: 1;
    }
    #gc-chat-header {
      background: ` + color + `;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    #gc-chat-header .gc-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      font-family: sans-serif;
      flex-shrink: 0;
    }
    #gc-chat-header .gc-info p {
      margin: 0;
      color: #fff;
      font-family: sans-serif;
    }
    #gc-chat-header .gc-name { font-size: 14px; font-weight: 600; }
    #gc-chat-header .gc-status { font-size: 11px; opacity: 0.85; display: flex; align-items: center; gap: 5px; }
    #gc-chat-header .gc-dot { width: 7px; height: 7px; background: #86efac; border-radius: 50%; display: inline-block; }
    #gc-iframe {
      flex: 1;
      border: none;
      background: #fff;
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  var initials = hotelName.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2).toUpperCase();

  var btn = document.createElement('button');
  btn.id = 'gc-widget-btn';
  btn.setAttribute('aria-label', 'Chat openen');
  btn.innerHTML = `
    <svg class="gc-icon-chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <svg class="gc-icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  `;

  var chatWindow = document.createElement('div');
  chatWindow.id = 'gc-chat-window';
  chatWindow.innerHTML = `
    <div id="gc-chat-header">
      <div class="gc-avatar">` + initials + `</div>
      <div class="gc-info">
        <p class="gc-name">` + hotelName + `</p>
        <p class="gc-status"><span class="gc-dot"></span> Altijd beschikbaar</p>
      </div>
    </div>
    <iframe id="gc-iframe" src="` + assistantUrl + `" title="GuestCompass AI Assistent"></iframe>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(chatWindow);

  var isOpen = false;
  btn.addEventListener('click', function () {
    isOpen = !isOpen;
    btn.classList.toggle('gc-open', isOpen);
    if (isOpen) {
      chatWindow.style.display = 'flex';
      setTimeout(function () { chatWindow.classList.add('gc-visible'); }, 10);
    } else {
      chatWindow.classList.remove('gc-visible');
      setTimeout(function () { chatWindow.style.display = 'none'; }, 220);
    }
  });
})();
