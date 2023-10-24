import { BrowserWindow, IpcMainEvent, IpcMainInvokeEvent } from "electron";

class WindowListener {
  /**
   * @description minimizes the main window
   */
  public static minimizeWindow = (event: IpcMainEvent) => {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    mainWindow?.minimize();
  };

  /**
   * @description maximizes the main window
   */
  public static maximizeWindow = (event: IpcMainInvokeEvent) => {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  };

  /**
   * @description quits the app
   */
  public static hideTheWindow = (event: IpcMainEvent) => {
    const webContents = event.sender;
    const mainWindow = BrowserWindow.fromWebContents(webContents);
    mainWindow?.hide();
  };
}

export default WindowListener;
