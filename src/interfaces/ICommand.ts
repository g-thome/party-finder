import { Message } from 'discord.js';

interface ICommand {
  name: string;
  minArgs: number;
  guildOnly: boolean;
  usage: string;
  execute: (msg: Message, args: string[]) => Promise<any>;
}

export default ICommand;
