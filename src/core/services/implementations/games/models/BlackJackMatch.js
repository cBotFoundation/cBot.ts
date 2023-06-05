const { DeckOfCards } = require("./DeckOfCards");
const { Person } = require("./Person");

class BlackJackMatch {
    constructor() {
        this.player = new Person();
        this.dealer = new Person();
        this.players = []; //for the future
        this.deck = new DeckOfCards();
    }
}
exports.BlackJackMatch = BlackJackMatch;
