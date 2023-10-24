// In this file you can include the rest of your app's specific main process listeners
import { ipcMain } from "electron";
import HelperListener from "../listeners/HelperListener";

ipcMain.on("common:set:title", HelperListener.setTitle);
ipcMain.handle("common:get:version", HelperListener.getVersion);
ipcMain.on("common:openFolder", HelperListener.openFolder);
