const { SlashCommandBuilder } = require('@discordjs/builders');


class BlackJackForm {
    constructor(status, userName, cards, dealerCards, remainingCards, playerCardsValue, dealerCardsValue,betAmount) {
        this.status = status;
        this.userName = userName;
        this.cards = cards;
        this.dealerCards = dealerCards;
        this.cardsRemaining = remainingCards;
        this.playerCardsValue = playerCardsValue;
        this.dealerCardsValue = dealerCardsValue;
        this.betAmount = betAmount;
    }
}


module.exports = { BlackJackForm }