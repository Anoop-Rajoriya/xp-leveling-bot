const path = require("path");
const fs = require("fs");

function xpToNextLevel(level) {
  return 5 * Math.pow(level, 2) + 50 * level + 100;
}

function getRootDir() {
  const currentDir = __dirname;

  while (fs.existsSync(path.join(currentDir, "package.json"))) {
    currentDir = path.join(currentDir, "..");
  }

  return currentDir;
}

module.exports = { xpToNextLevel, getRootDir };
