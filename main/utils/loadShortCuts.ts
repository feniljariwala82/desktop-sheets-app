import { app, BrowserWindow, globalShortcut, Menu, MenuItem } from "electron";

const loadShortCuts = (mainWindow: BrowserWindow | null) => {
  if (mainWindow) {
    if (!app.isPackaged) {
      let rightClickPosition: any = null;

      // mouse context menu
      const ctxMenu = new Menu();

      ctxMenu.append(
        new MenuItem({
          label: "Refresh",
          role: "reload",
        })
      );

      ctxMenu.append(
        new MenuItem({
          label: "Toggle Devtools",
          role: "toggleDevTools",
        })
      );

      ctxMenu.append(
        new MenuItem({
          label: "Inspect Element",
          click: () => {
            mainWindow.webContents.inspectElement(
              rightClickPosition.x,
              rightClickPosition.y
            );
          },
        })
      );

      mainWindow.webContents.on("context-menu", (_, params) => {
        rightClickPosition = { x: params.x, y: params.y };
        ctxMenu.popup({ window: mainWindow, x: params.x, y: params.y });
      });
    } else {
      // unregister all global shortcuts
      globalShortcut.unregisterAll();
    }
  }
};

export default loadShortCuts;
