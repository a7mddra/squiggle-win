const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  onImagePath: (callback) => ipcRenderer.on('image-path', (event, path) => callback(path)),
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog')
});
