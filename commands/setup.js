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
    const channel = message.mentions.channels.first();
    if (!channel) {
        const embed1 = new MessageEmbed()
            .setColor(`#f04947`)
            .setDescription(`**❌ | You forgot to mention a channel for the chat bot**`)
        return message.channel.send(embed1)
    }
    await guildDB.findOne({
        _id: message.guild.id
    }, async (err, data) => {
        if (err) throw err;
        if (data) {
            data.channel = channel.id
            data.save();
            const embed3 = new MessageEmbed()
                .setColor(`#43b481`)
                .setDescription(`**✅ | Successfully setted chat bot in <#${channel.id}>**`)
            message.channel.send(embed3)
        } else {
            const newData = new guildDB({
                _id: message.guild.id,
                channel: channel.id
            });
            newData.save();
            const embed3 = new MessageEmbed()
                .setColor(`#43b481`)
                .setDescription(`**✅ | Successfully setted chat bot in <#${channel.id}>**`)
            message.channel.send(embed3)
        }
    })
}

module.exports.help = {
    name: "setup",
    aliases: [""]
}