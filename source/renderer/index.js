import { createSettingsPanel } from '../tabs/settings/index.js';

const loginScreen = document.getElementById('login-screen');
const image = document.getElementById('image');
const loginBtn = document.getElementById('login-btn');
let imagePath;

window.electron.onImagePath((path) => {
  imagePath = path;
});

loginBtn.addEventListener('click', () => {
  if (imagePath) {
    image.src = imagePath;
    image.style.display = 'block';
    loginScreen.style.display = 'none';
  }
});

// Initially, show the login screen
loginScreen.style.display = 'block';
image.style.display = 'none';


function toggleSettingsPanel() {
  const panel = document.getElementById("panel");
  const panelOverlay = document.getElementById("panel-overlay");
  const settingsBtn = document.querySelector('.cat-btn[data-category="settings"]');
  panel.classList.toggle("active");
  panelOverlay.classList.toggle("active");
  settingsBtn.classList.toggle("panel-active");
}

function closeSettingsPanel() {
  const panel = document.getElementById("panel");
  const panelOverlay = document.getElementById("panel-overlay");
  const settingsBtn = document.querySelector('.cat-btn[data-category="settings"]');
  panel.classList.remove("active");
  panelOverlay.classList.remove("active");
  settingsBtn.classList.remove("panel-active");
}

function initializeSettingsPanel() {
  const panel = document.getElementById("panel");
  const loginScreen = document.getElementById("login-screen");
  const panelOverlay = document.getElementById("panel-overlay");
  const settingsContent = document.getElementById("settings-content");

  const settingsPanel = createSettingsPanel();
  settingsContent.appendChild(settingsPanel);

  const settingsBtn = document.querySelector(
    '.cat-btn[data-category="settings"]'
  );
  if (settingsBtn) {
    settingsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (loginScreen.style.display !== "none") return;

      toggleSettingsPanel();
    });
  }

  // For panel Esc close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('active')) {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        closeSettingsPanel();
      }
    }
  });

  // For global Esc close window
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        window.handleEscape();
      }
    }
  });

  panelOverlay.addEventListener("click", () => {
    closeSettingsPanel();
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !settingsBtn.contains(e.target)) {
      panel.classList.remove('active');
      const promptView = document.getElementById('promptView');
      if (promptView) {
        promptView.classList.remove('active');
        const settingsPanel = document.querySelector('.settings-panel');
        if (settingsPanel) settingsPanel.classList.remove('subview-active');
      }
    }
  });

  const darkModeBtn = document.getElementById("darkModeBtn");
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      darkModeToggle.checked = !darkModeToggle.checked;
      electronAPI.toggleTheme();
    });
  }

  const clearCacheBtn = document.getElementById("clearCacheBtn");
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener("click", () => {
      electronAPI.clearCache();
      showFeedbackMessage("Cache cleared", "success");
    });
  }
}

initializeSettingsPanel();
