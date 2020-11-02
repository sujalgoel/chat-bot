const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fetch = require('node-fetch');

module.exports.run = async (_bot, message) => {
    if (message.channel.name === `${botconfig["channel-name"]}`) {
        return
    }
    fetch('https://status.discordapp.com/api/v2/summary.json')
        .then(res => res.json())
        .then(json => {
            const embed = new Discord.MessageEmbed()
                .setDescription(`[\`View on status.discordapp.com\`](${json.page.url})`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            if (json.incidents.length === 0) {
                embed.setTitle(`All systems are operational at the moment!`)
                    .setColor("RANDOM")
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
            }

            const incident = json.incidents[0];
            if (incident) {
                embed.setTitle(`There is an ongoing incident at the moment!`)
                    .setDescription(`[\`View incident on status.discordapp.com\`](https://status.discordapp.com/incidents/${incident.incident_id}/)`)
                    .setColor("RANDOM")
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField(`Incident updates`, incident.incident_updates[0].body);
            }

            return message.channel.send(embed);
        });
}

module.exports.help = {
    name: "discord",
    aliases: ["discord"]
}