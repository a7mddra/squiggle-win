const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: path.join(__dirname, '../assets/icons/light/512.png'),
    backgroundColor: '#333333',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const imagePath = process.argv.find(arg => arg.toLowerCase().endsWith('.png'));
  if (imagePath) {
    win.loadFile(path.join(__dirname, './renderer/index.html'));
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('image-path', imagePath);
    });
  } else {
    win.loadFile(path.join(__dirname, './tabs/welcome/index.html'));
  }

  ipcMain.on('image-path', (event, imagePath) => {
    win.loadFile(path.join(__dirname, './renderer/index.html'));
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('image-path', imagePath);
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('close-window', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.close();
  }
});

ipcMain.on('minimize-window', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.minimize();
  }
});

ipcMain.on('maximize-window', () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.handle('open-file-dialog', async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'bmp', 'webp'] }
    ]
  });
  return filePaths[0];
});
