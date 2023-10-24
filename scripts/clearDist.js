const { readdir, rm } = require("fs/promises");
const path = require("path");
const fs = require("fs");

const DIRECTORY = path.join(__dirname, "..", "dist");

(async () => {
  if (fs.existsSync(DIRECTORY)) {
    const files = await readdir(DIRECTORY);

    for (const file of files) {
      // if splash window, then not clearing it up
      if (file === "splash") {
        continue;
      }

      // otherwise, removing everything
      const fileOrDirPath = path.join(DIRECTORY, file);
      await rm(fileOrDirPath, { recursive: true });
    }
  }
})();
