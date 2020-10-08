
import { Message, MessageEmbed } from 'discord.js';
import { getFormatedDate } from '../dateTime';
import { getGruposByMember } from '../API';

module.exports = {
  name: 'listar',
  guildOnly: true,
  async execute(msg: Message) {
    if (!msg.member) {
      throw new Error('algo deu errado');
    }

    const replyEmbed = new MessageEmbed();
    const response = await getGruposByMember(msg.member.toString());

    if (!response) {
      msg.reply('não achei nada');
      return;
    }

    const grupos = response.data;

    for (const grupo of grupos) {
      const date = new Date(grupo.dateTime);

      replyEmbed.fields.push({
        name: grupo.name,
        value: getFormatedDate(date),
        inline: false,
      });
    }

    msg.channel.send({ embed: replyEmbed });
  },
};
