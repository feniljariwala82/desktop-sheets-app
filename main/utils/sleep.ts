/**
 * @description sleeps for given time
 * @param sleepTimeInMills sleep time in milliseconds
 */
const sleep = (sleepTimeInMills: number) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve("Ok");
    }, sleepTimeInMills);
  });
};

export default sleep;
