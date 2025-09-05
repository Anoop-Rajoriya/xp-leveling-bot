require("dotenv").config();
const mongoose = require("mongoose");
const { Client, GatewayIntentBits } = require("discord.js");

const env = {
  botToken: process.env.DISCORD_BOT_TOKEN,
  dbUri: process.env.MONGO_URI,
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

function connectDB() {
  mongoose
    .connect(env.dbUri)
    .then(() => console.log("Bot: db connnected"))
    .catch(() => console.error("Bot: db connection failed"));
}

module.exports = { env, client, connectDB };
