class Person {
    constructor() {
        this.cards = [];
        this.values = 0;
        this.numOfCards = 0;
        this.aces = 0;
        this.faces = 0;
        this.bj = false;
    }

    addACard(card) {
        this.cards.push(card);
        this.numOfCards += 1;
        this.values += this.addPoint(card);
        this.aces += this.haveAce(card.number);
        this.faces += this.haveFace(card.value);
        this.bj = this.isBJ();
    }

    getCards() {
        return this.cards.map(card => card.getSymbol()).join(' - ');
    }

    handValue() {
        return this.values;
    }

    addPoint(card) {
        if (card.number === "A" && this.aces > 1) {
            return 1;
        } else {
            return card.value;
        }
    }

    haveAce(number) {
        if (number === "A") {
            return 1;
        }
        return 0;
    }

    haveFace(value) {
        if (value === 10) {
            return 1;
        }
        return 0;
    }

    isBJ() {
        if (this.values === 21)
            return this.aces === 1 && this.faces === 1;

        else
            return false;
    }
}
exports.Person = Person;
