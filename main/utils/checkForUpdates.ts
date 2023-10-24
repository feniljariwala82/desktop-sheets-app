import log from "electron-log";
import { autoUpdater } from "electron-updater";

const checkForUpdates = async () => {
  try {
    await autoUpdater.checkForUpdates();
  } catch (error) {
    log.error(error.message);
  }
};

export default checkForUpdates;
