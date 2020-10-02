import { MessageEmbed, User, PartialUser } from 'discord.js';

function removeMemberFromEmbed(embed: MessageEmbed, user: User|PartialUser): object {
  const groupMembers = embed.fields[1].value.split(',');

  const updatedGroupMembers = groupMembers.filter(member => member !== user.toString());

  embed.fields[1].value = updatedGroupMembers.join(',');
  return embed;
}

function addMemberToEmbed(embed: MessageEmbed, user: User|PartialUser) {
  const groupMembers = embed.fields[1].value.split(',');

  if (!groupMembers.includes(user.toString())) {
    const updatedGroupMembers = groupMembers.filter(member => member !== user.toString());
    embed.fields[1].value = updatedGroupMembers.join(',');
  }

  return embed;
}

function getMemberCount(embed: MessageEmbed) {
  const groupMembers = embed.fields[1].value.split(',');
  return groupMembers.length;
}

export { removeMemberFromEmbed, addMemberToEmbed, getMemberCount }