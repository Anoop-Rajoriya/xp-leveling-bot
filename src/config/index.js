require("dotenv").config();
const mongoose = require("mongoose");

const env = {
  botId: process.env.DISCORD_BOT_ID,
  botkey: process.env.DISCORD_BOT_KEY,
  botToken: process.env.DISCORD_BOT_TOKEN,
  dbUri: process.env.MONGO_URI,
};

const connectDB = () => {
  mongoose
    .connect(env.dbUri)
    .then(() => console.log("Database Coonected ✔"))
    .catch(() => console.error("Failed To Connect Database ❌"));
};

module.exports = { env, connectDB };
