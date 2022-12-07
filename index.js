//commonJS 왜냐하면 노드 환경 이므로
const electron = require("electron");
const { app, BrowserWindow } = electron;

app.on("ready", () => {
  const win = new BrowserWindow();
  // win.loadURL("http://naver.com");
  // win.loadFile("index.html");
  win.loadURL(`file://${__dirname}/index.html`);
  win.webContents.openDevTools();
  console.log("ready for start");
});
