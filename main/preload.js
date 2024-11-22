const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getUUID: () => ipcRenderer.invoke('get-uuid'),
});
