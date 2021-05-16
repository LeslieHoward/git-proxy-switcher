const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  log: () => console.log('starting...'),
});
