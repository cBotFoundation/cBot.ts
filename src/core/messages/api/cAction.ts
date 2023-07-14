import cInteraction from './cActionContext'

type ActionColor = 'Primary' | 'Secondary' | 'Danger'
type Action = (payload: cInteraction) => void

export default interface cAction {
  name: string
  text: string
  color: ActionColor
  onlyOwnerInteraction: boolean
  actionCall: Action
}

export function YesOrNoAction (yesCall: Action, noCall: Action): cAction[] {
  return [
    {
      name: 'yes',
      text: 'yes',
      onlyOwnerInteraction: true,
      color: 'Primary',
      actionCall: yesCall
    },
    {
      name: 'no',
      text: 'no',
      onlyOwnerInteraction: false,
      color: 'Danger',
      actionCall: noCall
    }
  ]
}
