const { User } = require("../models");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show top 10 users XP & Level"),
  async execute(interaction) {
    try {
      const topUsers = await User.find({}).sort({ xp: -1 }).limit(10);

      if (topUsers.length === 0) {
        return interaction.reply("❌ No users found in the leaderboard yet.");
      }

      let leaderboard = "";
      for (let i = 0; i < topUsers.length; i++) {
        const user = topUsers[i];
        const member = await interaction.client.users
          .fetch(user.userId)
          .catch(() => null);

        if (member) {
          leaderboard += `**#${i + 1}** ${
            member ? member.username : "Unknown User"
          } — 🏅 Level: ${user.level} | ✨ XP: ${user.xp}\n`;
        }
      }

      const embed = new EmbedBuilder()
        .setTitle("🏆 Leaderboard - Top 10 Users")
        .setDescription(leaderboard)
        .setColor("Gold")
        .setFooter({ text: `Requested by ${interaction.user.username}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching leaderboard:", err);
      await interaction.reply(
        "⚠️ Something went wrong while fetching the leaderboard."
      );
    }
  },
};
