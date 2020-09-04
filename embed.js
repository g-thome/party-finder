function removeMemberFromEmbed(embed, user) {
  const groupMembers = embed.fields[1].value.split(',');

  const updatedGroupMembers = groupMembers.filter(member => member !== user.toString());

  embed.fields[1].value = updatedGroupMembers.join(',');
  return embed;
}

function addMemberToEmbed(embed, user) {
  const groupMembers = embed.fields[1].value.split(',');

  if (!groupMembers.includes(user.toString())) {
    const updatedGroupMembers = groupMembers.filter(member => member !== user.toString());
    embed.fields[1].value = updatedGroupMembers.join(',');
  }

  return embed;
}

function getMemberCount(embed) {
  const groupMembers = embed.fields[1].value.split(',');
  return groupMembers.length;
}

module.exports = { removeMemberFromEmbed, addMemberToEmbed, getMemberCount }