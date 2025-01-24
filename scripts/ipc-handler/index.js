const {ipcMain, app} = require("electron");

function handleIPC() {
  ipcMain.on("close-app", () => {
    app.quit();
  });
  // ... 其他 IPC 消息处理
}

module.exports = {handleIPC};
