import { contextBridge, ipcRenderer } from "electron";

/**
 * common API
 */
const common = {
  setTitle: (title: string) => ipcRenderer.send("common:set:title", title),
  getVersion: (): Promise<string> => ipcRenderer.invoke("common:get:version"),
  openFolder: (path: string) => ipcRenderer.send("common:openFolder", path),
  pageRedirect: (callback: any) =>
    ipcRenderer.on("common:pageRedirect", callback).setMaxListeners(2),
  appUpdate: (callback: any) =>
    ipcRenderer.on("common:appUpdate", callback).setMaxListeners(1),
};

contextBridge.exposeInMainWorld("electronAPI", {
  common,
});
