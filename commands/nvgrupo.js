const { prefix, joinPartyEmoji } = require('../config.js');

module.exports = {
  name: 'nvgrupo',
  minArgs: 2,
  guildOnly: true,
  usage: '<horário> <nome do evento>',
  execute(msg, args) {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const time = args.shift();
    const partyName = args.join(' ');
    
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
}