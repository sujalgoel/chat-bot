const Discord = require('discord.js');
const botconfig = require("../botconfig.json")
const hastebin = require('hastebin.js');
const haste = new hastebin();

module.exports.run = async (bot, message) => {
  if (message.channel.name === `${botconfig["channel-name"]}`) {
    return
  }
  owners = [`${botconfig.owners}`]
  if (!owners.includes(message.author.id)) {
    return;
  }
  let arr = new Array();
  bot.guilds.cache.forEach(async servers => {
    arr.push(`
---> Server Info Of ${servers.name} <---
Server Name: ${servers.name}
Member Count: ${servers.memberCount}
Server ID: ${servers.id}  
---> Info Of ${servers.name} Ends Here <---
`)
  })
  haste.post(arr).then(link => {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        dynamic: true
      }))
      .setTitle(`\`${bot.user.username} is in total of ${bot.guilds.cache.size} servers!\``)
      .setURL(link)
      .setThumbnail(bot.user.displayAvatarURL())
      .setTimestamp()
    message.channel.send(embed);
  })
}

module.exports.help = {
  name: "serverlist",
  aliases: ["servers-list", "sl"]
}