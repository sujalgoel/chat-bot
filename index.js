const Discord = require("discord.js");
const bot = new Discord.Client({
    disableEveryone: true
});
const botconfig = require("./botconfig.json");
const fs = require("fs");
const chatcord = require('chatcord')
const chat = new chatcord.Client()

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Could not find any commands.");
        return;
    }
    jsfile.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    });
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
    bot.user.setPresence({
            activity: {
                name: `${botconfig.prefix}help | ${botconfig.prefix}invite`,
                type: 'LISTENING'
            },
            status: 'dnd'
        })
        .then(console.log)
        .catch(console.error);
});

bot.on("message", async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    let prefix = botconfig.prefix;
    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd;
    cmd = args.shift().toLowerCase();
    let command;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
    if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
    } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
    }
    try {
        command.run(bot, message, args);
    } catch (e) {
        return;
    }
})

bot.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) {
        chat.chat(message.cleanContent).then(reply => {
            message.reply(`${reply}`)
        })
    return
    }
    const channel = message.guild.channels.cache.find(ch => ch.name === `${botconfig["channel-name"]}`);
    if (message.channel.id != channel) return;
    chat.chat(message.cleanContent).then(reply => {
        message.channel.send(`**${message.author.tag} :** ${reply}`)
    })
})


bot.login(botconfig.token);