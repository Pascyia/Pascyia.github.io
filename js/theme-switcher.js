// Theme Switcher — injected on every page load
(function() {
  var STORAGE_THEME = 'wiki-theme';
  var STORAGE_ACCENT = 'wiki-accent';
  var ACCENTS = ['sky', 'blue', 'violet', 'green', 'amber', 'rose'];
  var ACCENT_COLORS = {
    sky: 'hsl(210,80%,60%)',
    blue: 'hsl(225,75%,58%)',
    violet: 'hsl(265,70%,62%)',
    green: 'hsl(155,65%,42%)',
    amber: 'hsl(38,85%,55%)',
    rose: 'hsl(350,75%,58%)'
  };

  // Apply saved theme immediately (prevent flash)
  var savedTheme = localStorage.getItem(STORAGE_THEME) || 'dark';
  var savedAccent = localStorage.getItem(STORAGE_ACCENT) || 'sky';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('data-accent', savedAccent);

  // Build switcher widget after DOM ready
  function init() {
    if (document.getElementById('theme-switcher')) return;

    var wrap = document.createElement('div');
    wrap.id = 'theme-switcher';
    wrap.className = 'theme-switcher';

    // Toggle button (sun/moon icon)
    var toggle = document.createElement('button');
    toggle.className = 'theme-toggle-btn';
    toggle.setAttribute('aria-label', '切换主题');
    toggle.innerHTML = savedTheme === 'dark' ? '☀' : '☽'; // ☀ / ☽

    // Panel
    var panel = document.createElement('div');
    panel.className = 'theme-panel';

    // Mode buttons
    var modeSection = document.createElement('div');
    modeSection.innerHTML = '<h4>模式</h4>';
    var modeRow = document.createElement('div');
    modeRow.className = 'theme-modes';

    ['dark', 'light'].forEach(function(mode) {
      var btn = document.createElement('button');
      btn.className = 'theme-mode-btn' + (savedTheme === mode ? ' active' : '');
      btn.textContent = mode === 'dark' ? '深色' : '浅色';
      btn.setAttribute('data-mode', mode);
      btn.addEventListener('click', function() {
        setTheme(mode);
        modeRow.querySelectorAll('.theme-mode-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        toggle.innerHTML = mode === 'dark' ? '☀' : '☽';
      });
      modeRow.appendChild(btn);
    });
    modeSection.appendChild(modeRow);

    // Accent color buttons
    var accentSection = document.createElement('div');
    accentSection.innerHTML = '<h4>配色</h4>';
    var accentRow = document.createElement('div');
    accentRow.className = 'theme-colors';

    ACCENTS.forEach(function(accent) {
      var btn = document.createElement('button');
      btn.className = 'theme-color-btn' + (savedAccent === accent ? ' active' : '');
      btn.style.background = ACCENT_COLORS[accent];
      btn.setAttribute('data-accent', accent);
      btn.setAttribute('aria-label', accent);
      btn.addEventListener('click', function() {
        setAccent(accent);
        accentRow.querySelectorAll('.theme-color-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
      accentRow.appendChild(btn);
    });
    accentSection.appendChild(accentRow);

    panel.appendChild(modeSection);
    panel.appendChild(accentSection);

    // Toggle panel visibility
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
      if (!wrap.contains(e.target)) panel.classList.remove('open');
    });

    wrap.appendChild(panel);
    wrap.appendChild(toggle);
    document.body.appendChild(wrap);
  }

  function setTheme(theme) {
    localStorage.setItem(STORAGE_THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  function setAccent(accent) {
    localStorage.setItem(STORAGE_ACCENT, accent);
    document.documentElement.setAttribute('data-accent', accent);
  }

  // Init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
