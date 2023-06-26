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

export function YesOrNoAction(yesCallback: ActionCallback, noCallback: ActionCallback, yesError?: ErrorCallback, noError?: ErrorCallback): cAction[] {
  return [
    {
      name: 'yes',
      text: 'yes',
      onlyOwnerInteraction: true,
      color: 'Primary',
      callback: yesCallback,
      exception: (yesError) ? yesError : (err: any) => console.log("Error calling yesCallback")
    },
    {
      name: 'no',
      text: 'no',
      onlyOwnerInteraction: false,
      color: 'Danger',
      callback: noCallback,
      exception: (noError) ? noError : (err: any) => console.log("Error calling noCallback")
    }
  ]  
} 