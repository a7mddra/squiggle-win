const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  onImagePath: (callback) => ipcRenderer.on('image-path', (event, path) => callback(path)),
  onImageData: (callback) => ipcRenderer.on('image-data', (event, data) => callback(data)),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  sendImagePath: (path) => ipcRenderer.send('image-path', path),
  closeWindow: () => ipcRenderer.send('close-window'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window')
});

// Backwards-compatible alias used by other modules
contextBridge.exposeInMainWorld('electronAPI', {
  toggleTheme: () => ipcRenderer.send('toggle-theme'),
  clearCache: () => ipcRenderer.send('clear-cache'),
  getUserData: () => ipcRenderer.invoke('get-user-data'),
  openExternal: (url) => ipcRenderer.send('open-external', url),
  logout: () => ipcRenderer.send('logout'),
});
