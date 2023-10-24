import { app } from "electron";
import path from "path";
import { URL } from "url";

// eslint-disable-next-line no-unused-vars
export let resolveHtmlPath: (htmlFileName: string) => string;

if (!app.isPackaged) {
  const port = 3000;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, "../../renderer/", htmlFileName)}`;
  };
}
