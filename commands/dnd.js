const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
const Discord = module.require('discord.js');

module.exports.run = async (bot, message, args) => {
if(!message.content.startsWith(prefix))return;
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You dont have such permission.");
  bot.user.setStatus('dnd')
  .then(console.log)
  .catch(console.error);
  
    message.delete().catch();
  (message.author.send(`Set status to "dnd"!`));
  
}

module.exports.help = {
    name: "dnd"
}
