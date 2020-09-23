import { Message } from "discord.js";
import { getHours, getMinutes } from '../dateTime';
import config from '../config';

module.exports = {
  name: 'nvgrupo',
  minArgs: 2,
  guildOnly: true,
  usage: '<horário>h \"<nome do evento>\"\nex: 20h among us',
  execute(msg: Message, args: String[]) {
    const timeRegex = /^\d{1,2}(h|:)\d{0,2}$/;
    const time = args.filter(x => timeRegex.test(x.toString()))[0];

    const dateTime = new Date();
    dateTime.setHours(parseInt(getHours(time.toString())));
    dateTime.setMinutes(parseInt(getMinutes(time.toString())) || 0);

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, '0')

    const partyName = args.join(' ');
    const member = msg.member?.toString();

    const replyEmbed = {
      title: partyName,
      fields: [,
        {
          name: 'Horário',
          value: hours + ':' + minutes,
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