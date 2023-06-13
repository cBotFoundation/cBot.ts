type ActionColor = 'Primary' | 'Secondary' | 'Danger';

export default interface cAction {
  name: string
  text: string
  color: ActionColor
  onlyOwnerInteraction: boolean
}

export const YesAndNoAction: cAction[] = [
  {
    name: 'yes',
    text: 'yes',
    onlyOwnerInteraction: false,
    color: 'Primary'
  },
  {
    name: 'no',
    text: 'no',
    onlyOwnerInteraction: false,
    color: 'Danger'
  }
]
