export default interface Action {
  name: string
  text: string
  onlyOwnerInteraction: boolean
}

export const YesAndNoAction = [
  {
    name: 'yes',
    text: 'yes',
    onlyOwnerInteraction: false
  },
  {
    name: 'no',
    text: 'no',
    onlyOwnerInteraction: false
  }
]
