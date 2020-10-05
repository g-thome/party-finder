import fs from 'fs';
import Discord from 'discord.js';
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

import config from './config';
import {
  addMemberToEmbed,
  removeMemberFromEmbed,
  getMemberCount,
} from './embed';
import { fetchReaction } from './reaction';
import Command from './interfaces/Command';

const commands = new Discord.Collection<string, Command>();

const commandFiles = fs
  .readdirSync(__dirname + '/commands')
  .filter((file) => file.endsWith('.js'));

client.once('ready', async () => {

  for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.set(command.name, command);
  }

  const clientInfo = client?.user?.tag;
  console.log(`logged in as ${clientInfo}!`);
});

client.on('message', (msg) => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args?.shift()?.toLowerCase();

  const command = commands.get(commandName || '');

  if (!command) return;

  if (args.length < command.minArgs) {
    let reply = `argumentos insuficientes`;

    if (command.usage) {
      reply += `\nUso do comando: ${config.prefix}${command.name} ${command.usage}`;
    }

    msg.reply(reply);
    return;
  }

  try {
    command.execute(msg, args);
  } catch (error) {
    msg.reply(error.message);
    return;
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if (!client.user) return;

  if (user.equals(client.user)) {
    return;
  }

  await fetchReaction(reaction);

  if (reaction.emoji.name === config.joinPartyEmoji) {
    const embed = reaction.message.embeds[0];

    const newEmbed = addMemberToEmbed(embed, user);
    reaction.message.edit({ embed: newEmbed });
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  await fetchReaction(reaction);

  if (reaction.emoji.name === config.joinPartyEmoji) {
    const embed = reaction.message.embeds[0];

    if (getMemberCount(embed) === 1) {
      reaction.message.delete();
      return;
    }

    const newEmbed = removeMemberFromEmbed(embed, user);

    reaction.message.edit({ embed: newEmbed });
  }
});

client.login(config.token);
