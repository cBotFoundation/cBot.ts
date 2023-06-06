export default interface Action {
    name: string,
    text: string,
    onlyOwnerInteraction: boolean,
}

export let YesAndNoAction = [
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


