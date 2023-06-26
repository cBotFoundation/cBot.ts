import cInteraction from "./cActionContext";

type ActionColor = 'Primary' | 'Secondary' | 'Danger';

export default interface cAction {
  name: string
  text: string
  color: ActionColor
  onlyOwnerInteraction: boolean
  callback: (interaction: cInteraction) => void
  exception: (err: any) => void
}

export const YesOrNoAction: cAction[] = [
  {
    name: 'yes',
    text: 'yes',
    onlyOwnerInteraction: false,
    color: 'Primary',
    callback: (interaction: cInteraction) => console.log('yes'),
    exception: (err: any) => console.log(`Exception when pressing yes btn [${ err }] }`)
  },
  {
    name: 'no',
    text: 'no',
    onlyOwnerInteraction: false,
    color: 'Danger',
    callback: (interaction: cInteraction) => console.log('no'),
    exception: (err: any) => console.log(`Exception when pressing no btn [${ err }] }`)
  }
]
