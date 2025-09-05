function xpToNextLevel(level) {
  return 5 * Math.pow(level, 2) + 50 * level + 100;
}

module.exports = { xpToNextLevel };
