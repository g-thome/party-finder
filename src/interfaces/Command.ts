interface Command {
  name: String,
  minArgs: Number,
  guildOnly: boolean,
  usage: String,
  execute: Function
}