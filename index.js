const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'MjUwODAwMDE4ODg0MTMyODY0.CxaIoQ.RQoEI3VK9uLImfJ-H4KHpq-4xdU';

var cleverbot = require('cleverbot.io');
var cleverBot = new cleverbot('fmRm0vshff1rDBY5','QxlwlHjAZDeZsfMBBBobMleeALhCD1Jy');
var cleverOn = false;

var fs = require('fs');

// Config Includs:
const userConfig = require('./config.json');
const botConfig = require('./bot_config.json');

var commandPrefix = userConfig["command_prefix"];

// Array of memes. Currently working on making this more efficient.
var memes = [
  "http://www.fullredneck.com/wp-content/uploads/2016/04/Funny-Russia-Meme-20.jpg",
  "https://s-media-cache-ak0.pinimg.com/736x/e2/d4/78/e2d47897e0652a6e00a912957b525fb8.jpg",
  "http://media.vogue.com/r/pass/2016/11/14/joe-biden-memes.jpg",
  "http://s2.quickmeme.com/img/1e/1e797a2ea3c4001c7c5d6d08736a0c8ca4c68b497a3f4c93cdf0594130bff486.jpg",
  "http://i3.kym-cdn.com/photos/images/facebook/000/234/765/b7e.jpg",
  "http://cdn4.teen.com/wp-content/uploads/2015/05/spongebob-patrick-naked-prostitution-meme.jpg",
  "https://s-media-cache-ak0.pinimg.com/564x/c7/77/1b/c7771bbfe3a8d2d6f022e9cc79f24af4.jpg"
];

/********************

Commands:

*********************/

var commands = {
  "hi": {
    name: "hi",
    description: "Greets the user.",
    render: message => {
      message.channel.sendMessage(`Hi there ${message.author}!`);
    },
  },
  "author": {
    name: "author",
    description: "Prints the author.",
    render: message => {
      message.channel.sendMessage(`NBot, version ${botConfig["version"]}. Made by Nikhil Deorkar(https://nikhilnd.github.io)`);
    }
  },
  "meme": {
    name: "meme",
    description: "Get a random meme.",
    render: message => {
      message.channel.sendMessage(memes[Math.floor(Math.random() * memes.length) + 0]);
    }
  },
  "insult-me": {
    name: "insult-me",
    description: "Insult the sender",
    render: message => {
      var insults = [
        `Hey ${message.author}! You're fat!`,
        `Hey ${message.author}! You're ugly!`,
        `Hey ${message.author}! You're dumb!`
      ];
      message.channel.sendMessage(insults[Math.floor(Math.random() * insults.length) + 0]);
    }
  },
  "addmeme": {
    name: "addmeme",
    description: "Add a meme to the memes array",
    render: (message, url) => {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      if(regexp.test(url)) {
        memes.push(url);
        message.channel.sendMessage('Meme added successfully!');
      } else {
        message.channel.sendMessage('Could not add meme. Please input a valid url.');
      }
    }
  },
  "insult": {
    name: "insut",
    description: "Insult someone",
    render: (message, person) => {
      var insults = [
        `Hey ${person}! You're fat!`,
        `Hey ${person}! You're ugly!`,
        `Hey ${person}! You're dumb!`
      ];
      if(person === undefined) {
        message.channel.sendMessage("Person not found. Please say who to insult. ex: !insult @NBot")
      } else {
        message.channel.sendMessage(insults[Math.floor(Math.random() * insults.length) + 0]);
      }
    }
  }
};

/********************

End of commands

*********************/

bot.on('ready', () => {
  console.log('Ready!');
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`);
});

bot.on('message', message => {
  if(message.content[0] === commandPrefix) {
    var sentCommand = message.content.substr(1);
    if(sentCommand.match(/\s/g)) {
      var splitCommand = sentCommand.split(" ");
      var cmd = commands[splitCommand[0]]
      if(cmd) {
        console.log("command sent");
        cmd.render(message, splitCommand[1]);
      } else {
        message.channel.sendMessage(`Sorry, !${splitCommand[0]} is not a command. Remember: NBot is case sensative.`);
      }
    } else {
      var cmd = commands[sentCommand];
      if (cmd) {
        console.log("command sent");
        cmd.render(message);
      } else {
        message.channel.sendMessage(`Sorry, !${sentCommand} is not a command. Remember: NBot is case sensative.`);
      }
    }
  }
});

bot.login(token);
