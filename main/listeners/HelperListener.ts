import { BrowserWindow, IpcMainEvent, app, shell } from "electron";

class HelperListener {
  /**
   * @description sets title for the window
   */
  public static setTitle = (event: IpcMainEvent, args: any) => {
    const webContents = event.sender;
    const window = BrowserWindow.fromWebContents(webContents);
    window?.setTitle(args);
  };

  /**
   * @description gets the version of an application
   */
  public static getVersion = (): string => app.getVersion();

  /**
   * @description opens folder in file system
   */
  public static openFolder = (_event: IpcMainEvent, path: string) => {
    shell.showItemInFolder(path);
  };
}

export default HelperListener;
