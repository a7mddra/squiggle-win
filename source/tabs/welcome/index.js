const fileInput = document.getElementById('fileInput');
const uploadArea = document.getElementById('uploadArea');

// --- Traffic Light Controls ---
document.querySelector('.close-btn').addEventListener('click', () => {
  window.electron.closeWindow();
});
document.querySelector('.minimize-btn').addEventListener('click', () => {
  window.electron.minimizeWindow();
});
document.querySelector('.maximize-btn').addEventListener('click', () => {
  window.electron.maximizeWindow();
});

// --- File Handling ---

// Click on upload area to open file dialog
uploadArea.addEventListener('click', () => {
  fileInput.click();
});

// Press Enter when area focused
uploadArea.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fileInput.click();
  }
});

// File input change
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Drag & Drop on upload area
['dragenter','dragover'].forEach(ev => {
  uploadArea.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add('dragging');
  });
});
['dragleave','dragend'].forEach(ev => {
  uploadArea.addEventListener(ev, (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragging');
  });
});
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
  uploadArea.classList.remove('dragging');
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
    handleFiles(e.dataTransfer.files);
  }
});

// Paste support (disabled as per instructions)
document.addEventListener('paste', (e) => {
  alert('Pasting images is not supported. Please save the image, then drag & drop or click to upload.');
});

function handleFiles(files) {
  if (!files || !files.length) return;
  const file = files[0];

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file (PNG, JPG, WEBP).');
    return;
  }
  if (file.type === 'image/gif') {
    alert('GIFs are not supported.');
    return;
  }

  // The user wants to maintain the old logic, which requires a file path.
  if (file.path) {
    if (window.electron && typeof window.electron.sendImagePath === 'function') {
      window.electron.sendImagePath(file.path);
      // Assuming the main process will now switch to the login tab.
    } else {
      alert('Error: Cannot communicate with the main application.');
    }
  } else {
    // This case should not be reached with paste disabled.
    alert('An unexpected error occurred. Please click to upload your file.');
  }
}

// Small accessibility feature: focus outline for keyboard users only
function handleFirstTab(e) {
  if (e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
  window.removeEventListener('keydown', handleFirstTab);
}
window.addEventListener('keydown', handleFirstTab);
