const path = require("path");
const { rename } = require("fs/promises");

const source = path.join(__dirname, "..", "renderer", "build");
const destination = path.join(__dirname, "..", "dist", "renderer");

(async () => {
  await rename(source, destination);
})();
