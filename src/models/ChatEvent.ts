import { ChatEventCallbackArgs } from './ChatEventCallbackArgs'

export class ChatEvent {
  handlerName: string
  callback: (args: ChatEventCallbackArgs) => void

  constructor (
    commandName: string,
    callback: (args: ChatEventCallbackArgs) => void
  ) {
    this.handlerName = commandName
    this.callback = callback
  }
}
