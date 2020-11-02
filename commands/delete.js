const botconfig = require("../botconfig.json");

module.exports.run = async (_bot, message) => {
    if (message.channel.name === `${botconfig["channel-name"]}`) {
        return
    }
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send("❌ **| You don't have `MANAGE_CHANNELS` permission!**")
    }

    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send("❌ **| I am lacking permission of `MANAGE_CHANNELS`**")
    }
    const channel = message.guild.channels.cache.find(ch => ch.name === `${botconfig["channel-name"]}`)
    if (!channel) return message.channel.send(`❌ **| There is no channel named \`${botconfig["channel-name"]}\`**`);
    channel.delete();
    message.channel.send(`✅ **| Successfully deleted chat bot channel!**`)
}

module.exports.help = {
    name: "delete",
    aliases: ["del"]
}
