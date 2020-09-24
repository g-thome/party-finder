import { Message } from "discord.js";
import { getDate, getMonth, getHours, getMinutes } from '../dateTime';
import config from '../config';

module.exports = {
  name: 'nvgrupo',
  minArgs: 2,
  guildOnly: true,
  usage: '20h "among us"',
  execute(msg: Message, args: String[]) {
    const argsString = args.join(' ');

    const timeRegex = /(\s|^)\d{1,2}(h|:)\d{0,2}(\s|$)/;
    const timeList = argsString.match(timeRegex);

    if (!timeList) {
      throw new Error("preciso de um horário");
    }

    const time = timeList[0];

    const dateTime = new Date();
    dateTime.setHours(parseInt(getHours(time.toString())));
    dateTime.setMinutes(parseInt(getMinutes(time.toString())) || 0);

    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    const dateRegex = /(\s|^)\d{0,2}\/\d{0,2}(\s|$)/;
    const date = argsString.match(dateRegex);

    if (date) {
      dateTime.setDate(parseInt(getDate(date.toString())));
      dateTime.setMonth(parseInt(getMonth(date.toString())));
    }

    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = dateTime.getMonth().toString().padStart(2, '0');

    const partyNameRegex = /(?<=\").*(?=\")/;

    const partyNameList = argsString.match(partyNameRegex);

    if (!partyNameList || !partyNameList[0]) {
      throw new Error("preciso do nome do grupo");
    }

    const partyName = partyNameList[0];

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