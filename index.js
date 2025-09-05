const { env, client, connectDB } = require("./src/config");
const path = require("path");
const fs = require("fs");

connectDB();

// Bot Event Handling
const eventsPath = path.join(__dirname, "./src/events");
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

client.login(env.botToken);
