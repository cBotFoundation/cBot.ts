
import { dBotButton } from '../widgets/dBotButton'
import { CommandCallbackArgs } from './CommandCallbackArgs'

export class Command {
  commandName: string
  callback: (args: CommandCallbackArgs) => void
  buttons: dBotButton[]

  constructor (
    commandName: string,
    callback: (args: CommandCallbackArgs) => void,
    buttons?: dBotButton[]
  ) {
    this.commandName = commandName
    this.callback = callback
    this.buttons = (buttons != null) || [] // If buttons are not provided, initialize with an empty array.
  }

  addButtons (buttons: dBotButton[]): void {
    this.buttons = this.buttons.concat(buttons)
  }
}
