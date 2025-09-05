const { Events } = require("discord.js");
const { User } = require("../models");
const { xpToNextLevel } = require("../utils");

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute: async function (message, client) {
    if (message.author.bot) return;

    const messageContent = message.content;
    const userId = message.author.id;
    const serverId = message.guild?.id;
    const minXP = 5;
    const maxXP = 15;
    const coolDown = 60000; // 1 min

    let user = await User.findOne({ userId, serverId });

    if (!user) user = await User.create({ userId, serverId });

    const canGainXP =
      !user.lastMessageAt ||
      Date.now() - user.lastMessageAt.getTime() >= coolDown;

    if (canGainXP) {
      const randomXP = Math.floor(Math.random() * (maxXP - minXP + 1)) + minXP;

      user.xp += randomXP;
      user.lastMessageAt = new Date();
    }

    if (user.xp > xpToNextLevel(user.level)) {
      user.level++;
    }

    user.save();
  },
};
