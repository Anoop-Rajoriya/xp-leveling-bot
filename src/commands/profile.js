const { User } = require("../models");
const { xpToNextLevel } = require("../utils");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Show your XP & Level profile"),
  async execute(interaction) {
    try {
      const target = interaction.user;

      const user = await User.findOne({ userId: target.id });
      if (!user) {
        return interaction.reply({
          content: `${target.username} has no profile yet.`,
          ephemeral: true,
        });
      }

      // XP Calculation
      const xpRequired = xpToNextLevel(user.level);
      const xpRemaining = xpRequired - user.xp;

      // Reply with Embed
      const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle(`${target.username}'s Profile`)
        .setThumbnail(target.displayAvatarURL())
        .addFields(
          { name: "Level", value: `${user.level}`, inline: true },
          { name: "XP", value: `${user.xp} / ${xpRequired}`, inline: true },
          { name: "Next Level In", value: `${xpRemaining} XP`, inline: true }
        )
        .setFooter({ text: "Keep chatting to gain more XP!" });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching profile:", err);
      await interaction.reply(
        "⚠️ Something went wrong while fetching the profile."
      );
    }
  },
};
