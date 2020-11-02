const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message) => {
    if (message.channel.name === `${botconfig["channel-name"]}`) {
        return
    }
    const embed = new Discord.MessageEmbed()
        .setColor('#ffb640')
        .setAuthor('Chat Bot | ImPoStoR#8011', `${bot.user.displayAvatarURL()}`, `https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot`)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField(':love_letter:    |    Invite the bot!', `[Invite me to your server!](https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot)`)
        .setTimestamp()
        .setFooter(`use "${botconfig.prefix}invite" to invite me!`, `${bot.user.displayAvatarURL()}`);
    message.channel.send(embed);
}
module.exports.help = {
    name: "invite",
    aliases: ["inv"]
}