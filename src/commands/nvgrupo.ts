import { Message } from "discord.js";
import config from '../config';

module.exports = {
  name: 'nvgrupo',
  minArgs: 2,
  guildOnly: true,
  usage: '<horário> <nome do evento>',
  execute(msg: Message, args: String[]) {
    const time = args.shift();
    const partyName = args.join(' ');
    const member = msg.member?.toString();
    
    const replyEmbed = {
      title: partyName,
      fields: [,
        {
          name: 'Horário',
          value: time,
        },
        {
          name: 'Participantes',
          value: member
        }
      ]
    }

    msg.channel.send({ embed: replyEmbed }).then(sentEmbed => {
      sentEmbed.react(config.joinPartyEmoji)
    });
  }
}