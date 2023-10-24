export type PageRedirectionCallback = (event: any, path: string) => void;

export type AppUpdateCallback = (
  event: any,
  megaBytesPerSecond: number,
  percent: number
) => void;
