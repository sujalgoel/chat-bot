const botconfig = require("../botconfig.json");
const Discord = require("discord.js")

module.exports.run = async (bot, message) => {
  if (message.channel.name === `${botconfig["channel-name"]}`) {
    return
  }
  let loadingEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`<a:lo:764768353939750922> Calculating!..`)
  let msg = await message.channel.send(loadingEmbed)
  const Embed = new Discord.MessageEmbed()
    .setTitle("Pong!")
    .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
      dynamic: true
    }))
    .setDescription(
      `**❯❯❯ Bot Latency** \n <:ime:764768351377424394> ${Math.floor(
        msg.createdTimestamp - message.createdTimestamp
      )}ms\n\n**❯❯❯ API Latency** \n <:ime:764768351377424394> ${message.client.ws.ping}ms`
    )
    .setColor("RANDOM")
    .setTimestamp()
    .setThumbnail(bot.user.displayAvatarURL())
    .setFooter(`use "${botconfig.prefix}invite" to invite me!`, `${bot.user.displayAvatarURL()}`);
  msg.edit(Embed);
  msg.edit("\u200b");
}

module.exports.help = {
  name: "ping",
  aliases: ["latency"]
}