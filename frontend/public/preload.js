// preload.js
const { contextBridge, shell, ipcRenderer  } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openExternalLink: (url) => shell.openExternal(url),
  receiveData: (callback) => ipcRenderer.on('token-data', (event, data) => {console.log(data) ;callback(data)})
  
});
