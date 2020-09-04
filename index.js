const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

const { token, prefix, joinPartyEmoji, newPartyCommand } = require('./config');

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}!`)
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/)
  const command = args.shift().toLowerCase();

  if (command === newPartyCommand) {
    if (args.length === 0) {
      msg.channel.send('Preciso do horário e nome do grupo');
      return;
    }

    if (args.length < 2) {
      msg.channel.send('Preciso do nome do grupo');
      return;
    }

    const partyName = args[1];
    const time = args[0];

    const replyEmbed = {
      title: partyName,
      fields: [,
        {
          name: 'Horário',
          value: time,
        },
        {
          name: 'Participantes',
          value: msg.member.toString()
        }
      ]
    }

    msg.channel.send({ embed: replyEmbed }).then(sentEmbed => {
      sentEmbed.react(joinPartyEmoji)
    });
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.equals(client.user)) {
    return;
  }

  if (reaction.partial) {
		try {
      await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
  }

  const isMessageMyOwn = reaction.message.author.equals(client.user);

  if (reaction._emoji.name === joinPartyEmoji && isMessageMyOwn) {
    let embed = reaction.message.embeds[0];
    console.log(embed.fields[1]);

    const groupMembers = embed.fields[1].value;

    if (!groupMembers.split(',').includes(user.toString())) {
      embed.fields[1].value = groupMembers + ',' + user.toString();
      reaction.message.edit({ embed });
    }
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) {
		try {
      await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
  }

  if (reaction._emoji.name === joinPartyEmoji) {
    console.log(user.username + ' removeu sua presenca');

    let embed = reaction.message.embeds[0];

    const groupMembers = embed.fields[1].value.split(',');
    console.log('lista de membros: ', groupMembers);

    const updatedGroupMembers = groupMembers.filter(member => member !== user.toString());
    console.log('nova lista de membros: ', updatedGroupMembers);

    embed.fields[1].value = updatedGroupMembers.join(',');
    reaction.message.edit({ embed });
  }
})

client.login(token);

// ;nvgrupo [hora] [nome do grupo]

// ;grupos

// ;entrar [grupo]

// ;nvgrupo 20h39 Mine com os broder