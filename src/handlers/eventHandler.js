const path = require("path");
const fs = require("fs");
const { getRootDir } = require("../utils");

module.exports = function (client) {
  const eventsPath = path.join(getRootDir(), "events");
  const eventsFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
