const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  launchApp: (appPath) => ipcRenderer.invoke('launch-app', appPath),
  executeCommand: (command) => ipcRenderer.invoke('execute-command', command),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
});
