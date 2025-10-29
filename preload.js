const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startDrag: (filePath) => {
    ipcRenderer.send('ondragstart', filePath);
  }
});
