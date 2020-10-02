import { Message } from 'discord.js';

interface Command {
  name: string;
  minArgs: number;
  guildOnly: boolean;
  usage: string;
  execute: (msg: Message, args: string[]) => void;
}

export default Command;
