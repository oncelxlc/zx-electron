const {app, BrowserWindow, ipcMain} = require("electron");
const {join} = require("node:path");

// 定义创建窗口的函数
function createWindow() {
  // 创建一个新的 BrowserWindow 实例
  const win = new BrowserWindow({
    frame: false, // 设置窗口的 web 偏好设置
    webPreferences: {
      preload: join(__dirname, "preload.js"), // 加载一个预加载脚本
      nodeIntegration: false, // 不允许在渲染进程中使用 Node.js 模块
      contextIsolation: true, // 隔离上下文
      enableRemoteModule: false, // 禁用远程模块
    }, width: 1280, height: 720, // 设置窗口的宽度和高度
  });

  // 如果应用没有被打包
  if (!app.isPackaged) {
    // 加载本地开发服务器的 URL
    win.loadURL("http://localhost:9701").then();
  } else { // 如果应用已经被打包
    // 加载打包后的文件
    win.loadFile("web-projects/dist/electron-ng/browser/index.html").then();
  }

  ipcMain.on("close-app", () => {
    app.quit();
  });
}

module.exports = {createWindow};
