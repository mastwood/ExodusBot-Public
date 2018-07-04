'use strict';
const fs      = require('file-system');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();
const request = require('request');
const cheerio = require('cheerio');
const ytdl    = require('ytdl-core');

var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context) => {
    // triggered when input is needed to be shown to the user.

    context.msg.reply('\n' + msg).then(bot_response => {
      if (cfg.deleteAfterReply.enabled) {
        context.msg.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}: \"${msg.content}\"`))
          .catch(console.log);
        bot_response.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}: \"${msg.content}\"`))
          .catch(console.log);
      }
    });
  }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

bot.on('message', msg => {
  // triggered when someone sends a message
  if(msg.member.id === '138415218110758913'){
    msg.react(msg.guild.emojis.find('name', 'hahayes'));
  }
  else if(msg.member.id === '148723096990384130'){
    msg.react(msg.guild.emojis.find('name', 'myjeff'));
  }

  if (app.isCliSentence(msg.content)){
      app.parseInput(msg.content,
  	{
        msg: msg,
        bot: bot,
        request: request,
        cheerio: cheerio,
        thisbot: bot,
        fs: fs,
        discord: Discord,
        ytdl: ytdl
        // Keep adding properties to the context as you need them
  	});
  }
  if(msg.content.toLowerCase().includes("avocado") && !msg.content.toLowerCase().includes("avocadon\'t")){
	msg.channel.send("more like, avocadon\'t");
  }
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});
