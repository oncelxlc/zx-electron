interface IElectronAPI {
  /**
   * 向主进程发送消息
   * @param channel - 通信频道名称
   * @param data - 要发送的数据
   */
  send(channel: string, data?: any): void;

  /**
   * 监听来自主进程的消息
   * @param channel - 通信频道名称
   * @param callback - 接收消息的回调函数
   */
  on(
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ): void;

  /**
   * 监听来自主进程的一次性消息
   * @param channel - 通信频道名称
   * @param callback - 接收消息的回调函数
   */
  once(
    channel: string,
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ): void;
}

declare interface Window {
  /**
   * Electron 预加载脚本暴露的 API
   */
  electron: IElectronAPI;
}
