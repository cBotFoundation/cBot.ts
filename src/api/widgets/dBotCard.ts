import { dBotButton } from './dBotButton'

class dBotCard {
  title: string
  content: string
  buttons: dBotButton[]

  constructor (title: string, content: string) {
    this.title = title
    this.content = content
    this.buttons = []
  }

  AddButton (button: dBotButton): dBotCard {
    this.buttons.push(button)
    return this
  }
}
