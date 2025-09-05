const client = require("./src/bot");
const { connectDB, env } = require("./src/config");

connectDB();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(env.botToken);
