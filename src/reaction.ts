import { MessageReaction } from "discord.js";

async function fetchReaction(reaction: MessageReaction) {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      return;
    }
  }
}

export { fetchReaction };