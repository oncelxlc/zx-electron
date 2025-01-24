const {app} = require("electron");
const {createWindow} = require("./scripts/window-manager");
const {handleIPC} = require("./scripts/ipc-handler");
const {createMenu} = require("./scripts/menu-manager");
const {mainEvent} = require("./scripts/main");

// 当 Electron 应用准备就绪时调用各操作操作函数
app.whenReady().then(() => {
  createWindow();
  handleIPC();
  createMenu();
  mainEvent();
});
