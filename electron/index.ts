const path = require('path');
const url = require('url');
const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
  //创建窗口
  let mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      nodeIntegration: true,
    },
    title: 'git-proxy-switcher',
    frame: true,
    width: 1700,
    height: 900,
    minWidth: 1300,
    minHeight: 900,
  });
  if (process.env.NODE_ENV === 'development') {
    // 开发环境
    // 加载页面并打开调试工具,根据 NODE_ENV
    // umijs 在dev时会给出相应的url，直接加载即可
    mainWindow.loadURL('http://localhost:8000/');
    mainWindow.webContents.openDevTools();
  } else {
    //生产环境
    // 加载html文件
    // 这里的路径是umi输出的html路径，如果没有修改过，路径和下面是一样的
    const target = new url.URL(path.join(__dirname, './dist/index.html'), 'file:');
    mainWindow.loadURL(target.href);
  }
  mainWindow.on('closed', () => {
    mainWindow = null as any;
  });

  // 在开发环境和生产环境均可通过快捷键打开devTools
  globalShortcut.register('ctrl+c+p', function() {
    mainWindow.webContents.openDevTools(); // 打开F12调试页面
  });
}

app.on('ready', () => {
  createWindow();

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  globalShortcut.unregisterAll();
});
