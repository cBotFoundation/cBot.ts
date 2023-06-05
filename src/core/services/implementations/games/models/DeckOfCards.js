const { Card } = require("./Card");

class DeckOfCards {
    constructor() {
        this.allCards = [];

        for (let suit = 0; suit < 4; suit++) {
            for (let number = 0; number < 13; number++) {
                let card = new Card(suit, number);
                this.allCards.push(card);
            }
        }

        let temp = [];
        while (this.allCards.length > 0) {
            let randomNum = Math.floor(Math.random() * this.allCards.length);
            temp.push(this.allCards[randomNum]);
            this.allCards.splice(randomNum, 1);
        }
        this.allCards = temp;
    }

    getACard() {
        return this.allCards.shift();
    }
}
exports.DeckOfCards = DeckOfCards;
