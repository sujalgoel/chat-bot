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
    message.guild.channels
        .create(`${botconfig["channel-name"]}`, {
            type: 'text',
        })
        .then((channel) => {
            const categoryID = message.channel.parentID
            channel.setParent(categoryID)
            message.channel.send(`✅ **| Successfully setted chat bot in <#${channel.id}>**`)
        })
}

module.exports.help = {
    name: "autosetup",
    aliases: ["auto-setup"]
}