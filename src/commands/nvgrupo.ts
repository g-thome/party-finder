import { Message } from 'discord.js';
import { getTimeFromString, getDateFromString, isValidDate } from '../dateTime';
import { saveGrupo } from '../API';
import config from '../config';

module.exports = {
  name: 'nvgrupo',
  minArgs: 2,
  guildOnly: true,
  usage: '20h "among us"',
  async execute(msg: Message, args: string[]) {
    const argsString = args.join(' ');

    const time = getTimeFromString(argsString);

    if (!time) {
      throw new Error('preciso de um horário');
    }

    const dateTime = new Date();

    dateTime.setHours(time.hours);
    dateTime.setMinutes(time.minutes);

    const date = getDateFromString(argsString);

    if (date) {
      dateTime.setDate(date.day);
      dateTime.setMonth(date.month);
    }

    if (!isValidDate(dateTime)) {
      throw new Error('data inválida');
    }

    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');

    const partyNameRegex = /(?<=\").*(?=\")/;

    const partyNameList = argsString.match(partyNameRegex);

    if (!partyNameList || !partyNameList[0]) {
      throw new Error('preciso do nome do grupo');
    }

    const partyName = partyNameList[0];

    if (!msg.member) {
      throw new Error('Algo deu errado :(');
    }

    const member = msg.member.toString();

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
      ],
    };

    msg.channel.send({ embed: replyEmbed }).then((sentEmbed) => {
      sentEmbed.react(config.joinPartyEmoji);
    });

    const APIResponse = await saveGrupo({ name: partyName, dateTime, members: [member] });

    if (!APIResponse) {
      console.log('n salvou');
      return;
    }

    console.log('salvou: ', APIResponse);
  },
};
