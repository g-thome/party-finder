const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

const { token, prefix, joinPartyEmoji } = require('./config');
const { addMemberToEmbed, removeMemberFromEmbed, getMemberCount } = require('./embed.js');
const { fetchReaction } = require('./reaction.js');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  if (args.length < command.minArgs) {
    let reply = `${msg.author} argumentos inválidos ou insuficientes`;

    if (command.usage) {
      reply += `\nUso do comando: ${prefix}${command.name} ${command.usage}`;
    }

    return msg.channel.send(reply);
  }

  console.log('args: ', args);
  console.log('minArgs: ', command.minArgs);

  try {
    command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.equals(client.user)) {
    return;
  }

  await fetchReaction(reaction);

  const isMessageMyOwn = reaction.message.author.equals(client.user);

  if (reaction._emoji.name === joinPartyEmoji && isMessageMyOwn) {
    let embed = reaction.message.embeds[0];
    
    const newEmbed = addMemberToEmbed(embed, user);

    console.log(newEmbed);
    reaction.message.edit({ embed: newEmbed });
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  await fetchReaction(reaction);

  if (reaction._emoji.name === joinPartyEmoji) {
    let embed = reaction.message.embeds[0];

    if (getMemberCount(embed) === 1) {
      return reaction.message.delete();
    } 

    const newEmbed = removeMemberFromEmbed(embed, user);
    
    reaction.message.edit({ embed: newEmbed });
  }
})

client.login(token);

// ;nvgrupo [hora] [nome do grupo]

// ;grupos

// ;entrar [grupo]

// ;nvgrupo 20h39 Mine com os broder