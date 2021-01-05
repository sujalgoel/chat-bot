const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message) => {
    if (message.channel.name === `${botconfig["channel-name"]}`) {
        return
    }
    const embed = new Discord.MessageEmbed()
        .setColor('BLURPLE')
        .setTitle('Commands')
        .setAuthor('Chat Bot | ImPoStoR#8011', `${bot.user.displayAvatarURL()}`)
        .setDescription(`**\`${botconfig.prefix}help     \` | Shows the help menu \n\`${botconfig.prefix}setup    \` | Setup the chat bot! \n\`${botconfig.prefix}delete   \` | Deletes the bot configuration!**`)
        .addField('**Important Links!**',`[Vote](https://discordbots.org/bot/${bot.user.id}/vote) ● [Support Server](${botconfig.server})**`)
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(`use "${botconfig.prefix}invite" to invite me!`, `${bot.user.displayAvatarURL()}`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "help",
    aliases: ["cmds", "commands"]
}