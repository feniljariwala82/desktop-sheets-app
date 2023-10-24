import {
  app,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  nativeImage,
  NativeImage,
  Notification,
} from "electron";
import log from "electron-log";
import { autoUpdater } from "electron-updater";
import path from "path";
import "./start/mainListener";
import { APP_ICON_ICO, APP_ICON_PNG } from "./util";
import loadExtensions from "./utils/loadExtensions";
import loadShortCuts from "./utils/loadShortCuts";
import { resolveHtmlPath } from "./utils/resolveHtmlPath";

// saves native image source for displaying in notification bar
let nativeImageSrc: NativeImage;
if (process.platform === "win32") {
  app.setAppUserModelId("Sheets");
  nativeImageSrc = nativeImage.createFromPath(APP_ICON_ICO);
} else if (process.platform === "darwin") {
  nativeImageSrc = nativeImage.createFromPath(APP_ICON_PNG);
}

// shows notification
const showNotification = (text: string) => {
  new Notification({
    body: text,
    icon: nativeImageSrc,
  }).show();
};

const initialize = async () => {
  /**
   * loads extensions
   */
  if (!app.isPackaged) {
    loadExtensions();
  }
};

let mainWindow: BrowserWindow | null = null;
const minWidth = 1024;
const minHeight = 576;
const createWindow = () => {
  const mainWindowOptions: BrowserWindowConstructorOptions = {
    title: "Sheets",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: !app.isPackaged,
    },
    center: true,
    minWidth: minWidth, // set a min width
    minHeight: minHeight, // and a min height
  };

  // Create the browser window
  switch (process.platform) {
    case "win32": {
      mainWindow = new BrowserWindow(mainWindowOptions);
      break;
    }

    default: {
      mainWindow = new BrowserWindow({
        ...mainWindowOptions,
        icon: APP_ICON_PNG,
      });

      break;
    }
  }

  if (!app.isPackaged) {
    // open the DevTools
    mainWindow.webContents.openDevTools({ mode: "right" });
  } else {
    // disabling menu bar
    mainWindow.setMenuBarVisibility(false);
  }

  // maximizing app window on open
  mainWindow.maximize();

  /**
   * load short cuts
   */
  loadShortCuts(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL(resolveHtmlPath("index.html"));

  mainWindow.on("ready-to-show", () => {
    if (!mainWindow) {
      throw new Error("Window is not created");
    }
  });

  mainWindow.on("close", () => {
    mainWindow?.removeAllListeners("close");
    mainWindow?.close();
  });

  mainWindow.on("closed", () => {
    /**
     * Setting mainWindow to null is a common practice in Electron applications,
     * to clean up and release the memory associated with the main window after it's been closed.
     */
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    return app.quit();
  } else {
    app.on("second-instance", () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });
  }

  await initialize();

  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-available", (response) => {
  mainWindow?.webContents.send("common:pageRedirect", "/app/update");
  showNotification(`New version ${response.version} available for "Sheets"`);
});

autoUpdater.on("update-not-available", () => {
  log.info("Update not available");
});

autoUpdater.on("error", (error) => {
  log.error(error.message);
  showNotification(`Could not find the latest update`);
});

autoUpdater.on("download-progress", (result) => {
  const mbPerSecond = result.bytesPerSecond / (1024 * 1024); // bytes/1024 -> kilo bytes/1024 -> mega bytes
  mainWindow?.webContents.send("common:appUpdate", mbPerSecond, result.percent);
  mainWindow?.setProgressBar(result.percent / 100);
});

autoUpdater.on("update-downloaded", () => {
  showNotification("Applying update for Sheets");
  autoUpdater.quitAndInstall();
});
