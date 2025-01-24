const {BrowserWindow, app} = require("electron");
const {createWindow} = require("../window-manager");

function mainEvent() {
  // 当应用在 macOS 上，并且没有打开的窗口时，创建一个新的窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

// 当所有窗口都被关闭时，退出应用（除了 macOS）
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

module.exports = {mainEvent};
