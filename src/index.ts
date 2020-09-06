import fs from 'fs';
import Discord from 'discord.js';
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

import config from './config';
import { addMemberToEmbed, removeMemberFromEmbed, getMemberCount } from './embed';
import { fetchReaction } from './reaction';

let commands = new Discord.Collection<String, Command>();

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file  => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.set(command.name, command);
}

client.once('ready', () => {
  const clientInfo = client?.user?.tag
  console.log(`logged in as ${clientInfo}!`)
});

client.on('message', msg => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/)
  const commandName = args?.shift()?.toLowerCase();
  
  const command = commands.get(commandName||'');  

  if (!command) return;

  if (args.length < command.minArgs) {
    let reply = `${msg.author.toString()} argumentos inválidos ou insuficientes`;

    if (command.usage) {
      reply += `\nUso do comando: ${config.prefix}${command.name} ${command.usage}`;
    }

    msg.reply(reply);
  }

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('Erro ao tentar executar comando');
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (!client.user) return;

  if (user.equals(client.user)) {
    return;
  }

  await fetchReaction(reaction);

  if (reaction.emoji.name === config.joinPartyEmoji) {
    let embed = reaction.message.embeds[0];
    
    const newEmbed = addMemberToEmbed(embed, user);
    reaction.message.edit({ embed: newEmbed });
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  await fetchReaction(reaction);

  if (reaction.emoji.name === config.joinPartyEmoji) {
    let embed = reaction.message.embeds[0];

    if (getMemberCount(embed) === 1) {
      reaction.message.delete();
      return
    } 

    const newEmbed = removeMemberFromEmbed(embed, user);
    
    reaction.message.edit({ embed: newEmbed });
  }
})

client.login(config.token);