const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFaceData: async (data) => ipcRenderer.invoke('save-face-data', data),
});