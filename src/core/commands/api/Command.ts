
import { cMessage } from '../../messages/messages.module'
import { CommandArg } from './CommandArg'
import { CommandCallbackArgs } from './CommandCallbackArgs'

export class Command {
  commandName: string
  commandDescription: string
  callback: (args: CommandCallbackArgs) => cMessage | void
  arguments: CommandArg[]

  constructor (
    commandName: string,
    commandDescription: string,
    commandArgs: CommandArg[],
    callback: (args: CommandCallbackArgs) => cMessage | void,
  ) {
    this.commandName = commandName
    this.commandDescription = commandDescription
    this.arguments = commandArgs
    this.callback = callback
  }
}