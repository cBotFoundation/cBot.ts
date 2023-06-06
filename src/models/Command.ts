import { CommandCallbackArgs } from "./CommandCallbackArgs";

export class Command {
    commandName: string;
    // content: dBotCard;
    callback: (args: CommandCallbackArgs) => void;
  
    constructor(
      commandName: string,
      // content: dBotCard,
      callback: (args: CommandCallbackArgs) => void
    ) {
      this.commandName = commandName;
      // this.content = content;
      this.callback = callback;
    }
}