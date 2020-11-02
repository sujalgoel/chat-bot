const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    if (message.channel.name === `${botconfig["channel-name"]}`) {
        return
    }
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Chat Bot Statistics')
        .setAuthor('Chat Bot | ImPoStoR#8011', `${bot.user.displayAvatarURL()}`, `https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot`)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField(`ℹ    |    Information`, `Chat Bot is a bot built by <@${botconfig.owners}> on **Discord JS Version 12.4.1** to chat with super amazing bot!`)
        .addField("📊    |    Statistics", `Chat Bot is on **${bot.guilds.cache.size}** servers with **${bot.users.cache.size}** users!`)
        .addField(':love_letter:   |  Invite the bot!', `[Invite me to your server!](https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot)`)
        .addField("🗳️    |    Vote for bot!", `[Click here to vote!](https://top.gg/bot/${botconfig.clientid}/vote)`)
        .addField("🚪    |    Join the Support server!", `[Click here to join!](${botconfig.server})`)
        .setTimestamp()
        .setFooter(`use "${botconfig.prefix}invite" to invite me!`, `${bot.user.displayAvatarURL()}`);
    message.channel.send(embed);

}

module.exports.help = {
    name: "system",
    aliases: ["sys"]
}