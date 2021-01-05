// Import some of the modules and variables
const Discord = require("discord.js");
const express = require("express");
const app = express();
const bot = new Discord.Client({
  disableEveryone: true
});
const guildDB = require("./models/chat");
const botconfig = require("./botconfig.json");
const fs = require("fs");
const chatcord = require('chatcord');
const chat = new chatcord.Client();
const mongoose = require('mongoose');
const { mongoURI } = require("./botconfig.json");

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(_ => {
  console.log('Connected to DataBase!!');
});

// Create a new collection for commands and aliases
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

// Initialize the Commands within the commands folder
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

// A vital event for every bot made with Discord.js
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);
});

// An event listener for messages
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
});

// Another message event for the chat bot
bot.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) {
    chat.chat(message.cleanContent).then(reply => {
      message.reply(`${reply}`)
    })
    return
  }
  const guild_is_present = await guildDB.findOne({ _id: message.guild.id })
  if (!guild_is_present) {
    return;
  } else {
    guildDB.findOne({
      _id: message.guild.id
    }, async (err, data) => {
      if (err) throw err;
      const channel = message.guild.channels.cache.get(data.channel);
      if (message.channel.id !== channel.id) {
        return;
      } else {
        chat.chat(message.cleanContent).then(reply => {
          message.channel.send(`**${message.author.tag} :** ${reply}`)
        })
        const requests = data.count
        data.count = requests + 1
        data.save();
      }
    })
  }
});

// A simple express route
app.get("/", (req, res) => {
  res.set('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({ ping: `${bot.ws.ping}` }, null, 2));
});

// A simple express route
app.get("/data/:serverID", (req, res) => {
  const guild = req.params.serverID;
  guildDB.findOne({
    _id: guild
  }, async (err, data) => {
    if (err) throw err;
    if (data) {
      const message = {
        success: "true",
        chat: {
          messages: data.count,
          channel:{
            ID: data.channel,
            name: "#" + bot.channels.cache.get(data.channel).name,
            link: `https://discord.com/channels/${guild}/${data.channel}`
          },
        }
      }
      res.set('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(message, null, 2));
    } else {
      const message = {
        success: "false",
        data: {
          message: "It seems like you haven't chatted with the bot yet. Invite it and start chatting!"
        }
      }
      res.set('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(message, null, 2));
    }
  })
});

// Bot login
bot.login(botconfig.token);

// Express active on port 3244
app.listen(3244);