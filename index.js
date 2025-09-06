const { env, client, connectDB } = require("./src/config");
const loadEvents = require("./src/handlers/eventHandler");
const loadCommands = require("./src/handlers/commandHandler");
const deployCommands = require("./src/deployCommands");

connectDB();

loadCommands(client);
deployCommands(client);

loadEvents(client);

client.login(env.botToken);
