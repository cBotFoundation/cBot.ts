const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const theme = require("./theme");

const resolveColor = (balance) => {
    switch (balance) {
        case 0:
            return theme.secondary;//standard color
        case 1:
            return theme.primary;// won
        case 2:
            return theme.danger;// lost
        case 3:
            return theme.black;// tie
        default:
            return theme.danger;//something is wrong wtff
    }
}


const resolveDescription = (status) => {
    switch (status) {
        case 0:
            return "Grab a card or hit 😡";
        case 1:
            return "You won 😋";
        case 2:
            return "You lost 🥺";
        case 3:
            return "Draw 😳";
        default:
            return "NONE";
    }
}

const resolveDealerHand = (status, dealerCards) => {
    let text = "";
    if (status == 0)
        return `${text} ${dealerCards.slice(0, 2)} - XX`;
    else
        return `${text} ${dealerCards}`;
}

const resolveDealerValue = (status, dealerValue) => {
    let text = "Value: ";
    if (status == 0)
        return `${text} XX`;
    else
        return `${text} ${dealerValue}`;
}

const resolveTitle = (status, betAmount) => {
    switch (status.status) {
        case 0:
            return `black jack | bet of: ${betAmount}`;
        case 1:
            return `you won ${(betAmount * 2).toString()}!!😳`;
        case 2:
            return `you lost ${betAmount.toString()} 😔😔😔`;
        case 3:
            return "";
        default:
            return "wtf?";
    }
}

module.exports = {
    blackJackEmbed: (embedForm) => {
        return new MessageEmbed()
            .setAuthor(embedForm.userName)
            .setColor(resolveColor(embedForm.status))
            .setTitle(resolveTitle(embedForm, embedForm.betAmount))
            .setDescription(resolveDescription(embedForm.status))
            .addFields(
                { name: "Your hand:", value: embedForm.cards, inline: false },
                { name: `Value: ${embedForm.playerCardsValue}`, value: '\u200B', inline: false },
                // { name: endGame ? "Result:" : "\u200B", value: endGame ? "u lost ${amount}" : "\u200B" },
                // { name: '\u200B', value: '\u200B' },
                { name: "Dealer hand:", value: resolveDealerHand(embedForm.status, embedForm.dealerCards), inline: false },
                { name: resolveDealerValue(embedForm.status, embedForm.dealerCardsValue), value: '\u200B', inline: false },
                { name: `Remaining cards: ${embedForm.cardsRemaining} `, value: "\u200B", inline: true })
            .setTimestamp()
    },
    blackJackRow: new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('take-card')
                .setLabel('Grab')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('pass-card')
                .setLabel('Hit')
                .setStyle('DANGER'),
        )
}
