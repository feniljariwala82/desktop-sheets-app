const { readFile, writeFile } = require("fs/promises");
const path = require("path");
const fs = require("fs");

const DIRECTORY = path.join(__dirname, "..", "dist", "renderer");

(async () => {
  if (fs.existsSync(DIRECTORY)) {
    const htmlFilePath = path.join(DIRECTORY, "index.html");
    let fileString = await readFile(htmlFilePath, "utf8");

    // updating favicon icon path
    fileString = fileString.replace("/favicon.ico", "./favicon.ico");

    // updating manifest.json
    fileString = fileString.replace("/manifest.json", "./manifest.json");

    // updating static js path
    fileString = fileString.replace("/static/js", "./static/js");

    // updating static css path
    fileString = fileString.replace("/static/css", "./static/css");

    const contentSecurityPolicyTag = `
      <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'self' http://localhost:* https://fonts.googleapis.com; script-src 'self'; img-src 'self' http://localhost:* data:; font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
    `;

    fileString = fileString.replace(
      "<head>",
      `<head>${contentSecurityPolicyTag}`
    );

    await writeFile(htmlFilePath, fileString);
  }
})();
