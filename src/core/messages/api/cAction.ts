type ActionColor = 'Primary' | 'Secondary' | 'Danger';
type ActionCallback = (payload: any) => void
type ErrorCallback = (err: any) => void

export default interface cAction {
  name: string
  text: string
  color: ActionColor
  onlyOwnerInteraction: boolean
  callback: ActionCallback
  exception?: ErrorCallback
}

export const YesOrNoAction: cAction[] = [
  {
    name: 'yes',
    text: 'yes',
    onlyOwnerInteraction: true,
    color: 'Primary',
    callback: (interaction: any) => console.log('yes')
  },
  {
    name: 'no',
    text: 'no',
    onlyOwnerInteraction: false,
    color: 'Danger',
    callback: (interaction: any) => console.log('no')
  }
]
