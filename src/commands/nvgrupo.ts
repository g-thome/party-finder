import { Message } from "discord.js";
import { getDate, getMonth, getHours, getMinutes } from '../dateTime';
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

    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    const dateRegex = /^\d{0,2}\/\d{0,2}$/;
    const date = args.filter(x => dateRegex.test(x.toString()))[0];

    if (date) {
      dateTime.setDate(parseInt(getDate(date.toString())));
      dateTime.setMonth(parseInt(getMonth(date.toString())));
    }

    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = dateTime.getMonth().toString().padStart(2, '0');

    const partyName = args.join(' ');
    const member = msg.member?.toString();

    const replyEmbed = {
      title: partyName,
      fields: [,
        {
          name: 'Horário',
          value: `${day}/${month} - ${hours}:${minutes}`
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