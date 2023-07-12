
import { cMessage } from '../../messages/messages.module'
import { CommandArg } from './CommandArg'
import { CommandCallbackArgs } from './CommandCallbackArgs'

export class Command {
  name: string
  description: string
  callback: (args: CommandCallbackArgs) => cMessage | undefined
  arguments: CommandArg[]

  constructor (
    commandName: string,
    commandDescription: string,
    commandArgs: CommandArg[],
    callback: (args: CommandCallbackArgs) => cMessage | undefined
  ) {
    this.name = commandName
    this.description = commandDescription
    this.arguments = commandArgs
    this.callback = callback
  }
}
