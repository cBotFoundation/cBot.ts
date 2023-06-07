
import { dBotButton } from '../widgets/dBotButton'
import { CommandArg } from './CommandArg'
import { CommandCallbackArgs } from './CommandCallbackArgs'

export class Command {
  commandName: string
  commandDescription: string
  callback: (args: CommandCallbackArgs) => void
  buttons: dBotButton[]
  arguments: CommandArg[]

  constructor (
    commandName: string,
    commandDescription: string,
    commandArgs: CommandArg[],
    buttons: dBotButton[],
    callback: (args: CommandCallbackArgs) => void,
  ) {
    this.commandName = commandName
    this.commandDescription = commandDescription
    this.arguments = commandArgs
    this.buttons = buttons
    this.callback = callback
  }

  addButtons (buttons: dBotButton[]): void {
    this.buttons = this.buttons.concat(buttons)
  }
}
