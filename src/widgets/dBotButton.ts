import { ButtonHandlerArgs } from '../models/ButtonHandlerArgs'

export class dBotButton {
  id: string
  handlerName: string
  buttonText: string
  onlyOwnerInteractable: boolean
  handler: (args: ButtonHandlerArgs) => void

  constructor (
    id: string,
    handlerName: string,
    buttonText: string,
    handler: (args: ButtonHandlerArgs) => void,
    onlyOwnerInteractable: boolean
  ) {
    this.id = id
    this.handlerName = handlerName
    this.buttonText = buttonText
    this.handler = handler
    this.onlyOwnerInteractable = onlyOwnerInteractable
  }
}
