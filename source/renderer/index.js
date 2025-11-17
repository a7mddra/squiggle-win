import { createSettingsPanel } from '../tabs/settings/index.js';
import { setupTrafficLights, showFeedbackMessage } from './utilities.js';
import { createAiModeTab } from '../tabs/aimode/index.js';
import { createGoLensTab } from '../tabs/golens/index.js';

setupTrafficLights();
showFeedbackMessage("", "setup");

const loginScreen = document.getElementById('login-screen');
let imageData = null;
const loginBtn = document.getElementById('login-btn');
const contentContainer = document.getElementById('content-container');
let imagePath;

// Listen for the richer image-data object from main
if (window.electron.onImageData) {
  window.electron.onImageData((data) => {
    imageData = data;
    // If user already logged in (login screen hidden), recreate tabs so they get the metadata
    if (loginScreen.style.display === 'none') {
      const prevActive = activeTab;
      tabs = {
        aimode: createAiModeTab(imageData),
        lens: createGoLensTab(imageData),
      };
      // Re-attach the current active tab to update the view
      if (prevActive) switchTab(prevActive);
    }
  });
}

window.electron.onImagePath((path) => {
  // legacy/simple path listener (keep for backward compatibility)
  imageData = { path };
});

loginBtn.addEventListener('click', () => {
  // Hide login and immediately switch to aimode tab.
  loginScreen.style.display = 'none';

  // Ensure tabs are created and the aimode tab is active. If we have imageData, recreate tabs so they receive it.
  initializeTabsAndSwitch();
});

// Initially, show the login screen
loginScreen.style.display = 'block';

let tabs = {
  aimode: createAiModeTab(null),
  lens: createGoLensTab(null),
};

let activeTab = null;

function switchTab(category) {
  if (activeTab === category) return;

  // Update button states
  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Clear content and append new tab
  contentContainer.innerHTML = '';
  contentContainer.appendChild(tabs[category]);

  activeTab = category;
}

const navButtons = document.querySelectorAll('.category-nav-left .cat-btn');
navButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (loginScreen.style.display !== 'none') return;
    const category = e.currentTarget.dataset.category;
    switchTab(category);
  });
});

function initializeTabsAndSwitch() {
  // If we have imageData, recreate tabs so they receive the data object
  tabs = {
    aimode: createAiModeTab(imageData),
    lens: createGoLensTab(imageData),
  };

  // Immediately switch to aimode
  switchTab('aimode');
}

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
