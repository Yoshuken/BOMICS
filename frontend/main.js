const { app, BrowserWindow } = require('electron/main');
const path = require('node:path');


if (require('electron-squirrel-startup')) app.quit();

if(require('electron-squirrel-startup')) return;

function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 1100,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

