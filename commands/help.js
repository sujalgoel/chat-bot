const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message) => {
    if (message.channel.name === `${botconfig["channel-name"]}`) {
        return
    }
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Commands')
        .setURL(`https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot`)
        .setAuthor('Chat Bot | ImPoStoR#8011', `${bot.user.displayAvatarURL()}`, `https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot`)
        .setDescription(`**\`${botconfig.prefix}help     \` | Shows the help menu \n\`${botconfig.prefix}ping     \` | Shows the bot ping! \n\`${botconfig.prefix}autosetup\` | Autosetup the bot! \n\`${botconfig.prefix}delete   \` | Deletes the bot configuration! \n\`${botconfig.prefix}invite   \` | Sends the invite link of the bot! \n\`${botconfig.prefix}system   \` | Shows the bot-info!**`)
        .addField('**Important Links!**', `**[Invite](https://discord.com/oauth2/authorize?client_id=${botconfig.clientid}&permissions=8&scope=bot) ● [Vote](https://discordbots.org/bot/${botconfig.clientid}/vote) ● [Support Server](${botconfig.server})**`)
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(`use "${botconfig.prefix}invite" to invite me!`, `${bot.user.displayAvatarURL()}`);
    message.channel.send(embed);
}

module.exports.help = {
    name: "help",
    aliases: ["cmds", "commands"]
}