import cTheme from './cTheme'
import cAction from './cAction'

export default interface cMessage {
  theme: cTheme
  title?: string
  content: string
  actions: cAction[]
}
