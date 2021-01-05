const guildDB = require("../models/chat");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (_bot, message) => {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    const embed1 = new MessageEmbed()
      .setColor(`#f04947`)
      .setDescription("❌ **| You are lacking permission of `MANAGE_CHANNELS`**")
    return message.channel.send(embed1)
  }
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
    const embed1 = new MessageEmbed()
      .setColor(`#f04947`)
      .setDescription("❌ **| I am lacking permission of `MANAGE_CHANNELS`**")
    return message.channel.send(embed1)
  }
  const guild_is_present = await guildDB.findOne({ _id: message.guild.id })
  if (!guild_is_present) {
    const embed1 = new MessageEmbed()
      .setColor(`#f04947`)
      .setDescription("❌ **| It seems like the chat bot was never used here.**")
    return message.channel.send(embed1)
  } else {
    await guildDB.findOneAndDelete({
      _id: message.guild.id
    }).then(_ => {
      const embed3 = new MessageEmbed()
        .setColor(`#43b481`)
        .setDescription(`**✅ | Successfully removed chat bot**`)
      message.channel.send(embed3)
    })
  }
}

module.exports.help = {
  name: "delete",
  aliases: ["del"]
}
