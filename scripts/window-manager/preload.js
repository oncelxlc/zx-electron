const {contextBridge, ipcRenderer} = require("electron");

/**
 * 公开受保护的方法，允许渲染器进程使用 ipcRenderer 而无需公开整个对象
 */
contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, func),
  once: (channel, func) => ipcRenderer.once(channel, func),
});
