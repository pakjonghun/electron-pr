const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const template = [
  {
    label: 'file',
    submenu: [
      {
        label: 'new todo',
        accelerator: 'Command+A',
        click: () => {
          addNewWindow();
        },
      },
      {
        label: 'clear todo',
        accelerator: 'Command+C',
        click: () => {
          clearTodo();
        },
      },
      {
        label: 'quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Alt+F4',
        // accelerator: (() => {
        //   if (process.platform === 'darwin') {
        //     return 'Command+Q';
        //   } else {
        //     return 'Alt+F4';
        //   }
        // })(),
        click: () => {
          if (BrowserWindow.getAllWindows().length !== 0) {
            // console.log('this?');
            // BrowserWindow.getAllWindows().forEach((item) => item.close());
          }
          app.quit();
        },
      },
    ],
  },
];

let addWindow = null;
let window = null;

app.whenReady().then(() => {
  createWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    qpp.quit();
  }
});

if (process.platform === 'darwin') {
  template.unshift({ label: '' });
}

if (process.env.NODE_ENV !== 'production') {
  template.push({
    label: 'View',

    submenu: [
      { role: 'reload' },
      {
        label: 'toggle developer tools',
        accelerator: 'CommandOrControl+Shift+I',
        click: (item, focusWindow) => {
          focusWindow.toggleDevTools();
        },
      },
    ],
  });
}

function createWindow() {
  window = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  window.webContents.isDevToolsOpened();
  window.on('closed', () => app.quit());
  window.loadFile('index.html');
}

function addNewWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: 'Add Todo',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  addWindow.loadFile('addmenu.html');
  addWindow.on('closed', () => (addWindow = null));
}

ipcMain.on('todo:add', (e, todo) => {
  window.webContents.send('todo:render', todo);
  addWindow.close();
});

function clearTodo() {
  window.send('todo:clear');
}
