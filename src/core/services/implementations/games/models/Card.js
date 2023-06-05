const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];

class Card {
    constructor(suit, number) {
        this.suit = suits[suit];
        this.number = numbers[number];
        this.value = this.getPoint(number);
    }

    getSymbol() {
        return this.suit + this.number;
    }

    getPoint(number) {
        let value = 0;
        if (number === 0) {
            value = 11;
        } else if (number >= 10) {
            value = 10;
        } else {
            value = number + 1;
        }
        return value;
    }
}
exports.Card = Card;
