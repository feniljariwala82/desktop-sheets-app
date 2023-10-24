import { app } from "electron";
import path from "path";

/**
 * PNG image path
 */
export const APP_ICON_PNG = !app.isPackaged
  ? path.join(__dirname, "..", "..", "assets", "icon.png")
  : path.join(__dirname, "..", "..", "..", "assets", "icon.png");

/**
 * ICO image path
 */
export const APP_ICON_ICO = !app.isPackaged
  ? path.join(__dirname, "..", "..", "assets", "icon.ico")
  : path.join(__dirname, "..", "..", "..", "assets", "icon.ico");
