const {app, BrowserWindow, ipcMain} = require("electron");
const {join} = require("node:path");

// 定义创建窗口的函数
function createWindow() {
  // 创建一个新的 BrowserWindow 实例
  const win = new BrowserWindow({
    frame: false,
    // 设置窗口的 web 偏好设置
    webPreferences: {
      // 加载一个预加载脚本
      preload: join(__dirname, "preload.js"),
      // 不允许在渲染进程中使用 Node.js 模块
      nodeIntegration: false,
      // 隔离上下文
      contextIsolation: true,
      // 禁用远程模块
      enableRemoteModule: false,
    },
    // 设置窗口的宽度和高度
    width: 1280,
    height: 720,
  });

  // 如果应用没有被打包
  if (!app.isPackaged) {
    // 加载本地开发服务器的 URL
    win.loadURL("http://localhost:9701");
  }
  // 如果应用已经被打包
  else {
    // 加载打包后的文件
    win.loadFile("web-projects/dist/electron-ng/browser/index.html");
  }

  ipcMain.on('close-app', () => {
    app.quit();
  });
}

// 当 Electron 应用准备就绪时调用 createWindow 函数
app.whenReady().then(() => {
  createWindow();

  // 当应用在 macOS 上，并且没有打开的窗口时，创建一个新的窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口都被关闭时，退出应用（除了 macOS）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
