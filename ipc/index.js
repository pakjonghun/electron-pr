const ffmpeg = require('fluent-ffmpeg');
const electron = require('electron');
const { createReadStream } = require('fs');
const { app, BrowserWindow, ipcMain } = electron;

let win = null;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('video:submit', (e, filePath) => {
  //   console.log('msg', msg);
  //   const readStream = createReadStream(filePath);
  //   console.log(readStream);
  try {
    ffmpeg.ffprobe(filePath, (error, data) => {
      console.log('ffg', data.format.duration);
      win.webContents.send('video:length', '123');
    });
  } catch (e) {
    console.error(e);
  }
});
// app.on('ready', () => {
//   const main = new BrowserWindow({});
//   main.webContents.openDevTools();
//   //   main.loadURL(`file://${__dirname}/index.html`);
//   main.loadFile('index.html');

//   main.on('video:submit', (data) => {
//     console.log('node', data);
//   });
// });
