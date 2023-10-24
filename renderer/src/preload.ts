import { AppUpdateCallback, PageRedirectionCallback } from "appTypes";

declare global {
  interface Window {
    electronAPI: {
      common: {
        setTitle: (title: string) => void;
        getVersion: () => Promise<string>;
        openFolder: (path: string) => void;
        pageRedirect: (callback: PageRedirectionCallback) => void;
        appUpdate: (callback: AppUpdateCallback) => any;
      };
    };
  }
}

export {};
