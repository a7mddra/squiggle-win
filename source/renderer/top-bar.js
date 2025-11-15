document.querySelector('.close-btn').addEventListener('click', () => {
  window.electron.closeWindow();
});

document.querySelector('.minimize-btn').addEventListener('click', () => {
  window.electron.minimizeWindow();
});

document.querySelector('.maximize-btn').addEventListener('click', () => {
  window.electron.maximizeWindow();
});
