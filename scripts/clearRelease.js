const { readdir, rm } = require("fs/promises");
const path = require("path");
const fs = require("fs");

const DIRECTORY = path.join(__dirname, "..", "release");

(async () => {
  if (fs.existsSync(DIRECTORY)) {
    const files = await readdir(DIRECTORY);

    for (const file of files) {
      const fileOrDirPath = path.join(DIRECTORY, file);
      await rm(fileOrDirPath, { recursive: true });
    }
  }
})();
