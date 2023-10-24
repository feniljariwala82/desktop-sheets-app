const { rename, rm } = require("fs/promises");
const path = require("path");

(async () => {
  const mainDirectory = path.join(__dirname, "..", "dist", "main");
  const obfuscatedDirectory = path.join(__dirname, "..", "dist", "obfuscated");

  // removing main directory
  await rm(mainDirectory, { recursive: true });

  // renaming obfuscated directory to main directory
  await rename(obfuscatedDirectory, mainDirectory);
})();
