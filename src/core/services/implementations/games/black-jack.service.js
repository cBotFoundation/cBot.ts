

const { blackJackEmbed, blackJackRow } = require('../discord-messages-templates/black-jack.embed');
const { BlackJackForm } = require('../discord-messages-templates/models/black-jack-form');
const { BlackJackMatch } = require("./models/BlackJackMatch");

class BlackJackService {
    constructor() {
        this.matches = new Map();
    }

    async init(dependency) {
        this.logger = dependency.get("Logger");
        this.botApp = dependency.get("BotApp");
        this.bank = dependency.get("Bank");

        this.botApp.addButtonHandler('take-card', this.nextTurn.bind(this));
        this.botApp.addButtonHandler('pass-card', this.passTurn.bind(this));
    }

    startGame(userId,amount) {
        var createdMatch = new BlackJackMatch(userId);
        //Initial game scramble
        createdMatch.player.addACard(createdMatch.deck.getACard());
        createdMatch.dealer.addACard(createdMatch.deck.getACard());
        createdMatch.player.addACard(createdMatch.deck.getACard());
        createdMatch.dealer.addACard(createdMatch.deck.getACard());
        this.takeBet(userId,amount);
        this.matches.set(userId, createdMatch);
    }

    //Currency logic
    async takeBet(userId, amount) {
        this.matchBet = amount;
        await this.bank.addBalance(userId, -amount, 0, 0);
    }

    async giveReward(userId,tie) {
        const rewardAmount = tie ? this.matchBet : this.matchBet * 2;
        await this.bank.addBalance(userId, rewardAmount, 0, 0);
    }

    bjEmbedBuilder(status, userName, userMatch) {
        const embedForm = new BlackJackForm(status, userName,
            userMatch.player.getCards(),
            userMatch.dealer.getCards(),
            userMatch.deck.allCards.length.toString(),
            userMatch.player.values.toString(),
            userMatch.dealer.values.toString());

        return blackJackEmbed(embedForm);
    }

    async nextTurn(interaction) {
        this.logger.warn("Next card !!!" + interaction);
        const userId = interaction.user.id;
        const userName = interaction.user.username;

        const userMatch = this.matches.get(userId);
        //TODO: REFACTOR, put this inside of a function called players turn
        userMatch.player.addACard(userMatch.deck.getACard());
        const gameOver = this.isOver21(userId);
        const blackJackStatus = this.isBlackJack(userId);
        let status = 0;

        if (gameOver)
            status = 2;

        if (blackJackStatus == 1 || userMatch.player.bj) {
            status = 1;
            this.giveReward(userId, false);
        }

        await interaction.message.edit({ components: [] });

        const embed = this.bjEmbedBuilder(status, userName, userMatch);
        if (!gameOver && status != 1) {
            await interaction.reply({ embeds: [embed], components: [blackJackRow] });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
    }

    async passTurn(interaction) {
        const userId = interaction.user.id;
        const userName = interaction.user.username;
        const userMatch = this.matches.get(userId);
        let blackJackStatus = this.dealerBlackJack(userId);

        switch (blackJackStatus) {
            case 0:
                await this.dealersTurn(interaction, userMatch);
                break;
            case 1:
                this.logger.info('dealer WON with blackjack');
                const embed1 = this.bjEmbedBuilder(2, userName, userMatch);
                return await interaction.reply({ embeds: [embed1] });
            case 2:
                this.logger.info('dealer TIE');
                this.giveReward(userId,true);
                const embed2 = this.bjEmbedBuilder(3, userName, userMatch);
                return await interaction.reply({ embeds: [embed2] });
        }
    }

    async dealersTurn(interaction, userMatch) {
        const userName = interaction.user.username;
        const userId = interaction.user.id;

        if (!this.isPlaying(userId)) return;

        this.logger.warn("revealing..." + interaction);
        await interaction.message.edit({ components: [] });

        while (userMatch.dealer.values < 17) {
            userMatch.dealer.addACard(userMatch.deck.getACard());
        }

        if (userMatch.dealer.values <= 21 && userMatch.dealer.values > userMatch.player.values) {
            this.logger.warn("dealer won by highest number");
            const embed = this.bjEmbedBuilder(2, userName, userMatch);
            return await interaction.reply({ embeds: [embed] });
        } else if (userMatch.player.values <= 21 && userMatch.player.values > userMatch.dealer.values) {
            this.logger.warn("player won by highest number");
            this.giveReward(userId, false);
            const embed = this.bjEmbedBuilder(1, userName, userMatch);
            return await interaction.reply({ embeds: [embed] });
        } else if (userMatch.player.values == userMatch.dealer.values || userMatch.player.bj && userMatch.player.bj) {
            this.logger.warn("tie, both have same numbers");
            this.giveReward(userId, true);
            const embed = this.bjEmbedBuilder(3, userName, userMatch);
            return await interaction.reply({ embeds: [embed] });
        }

        if (userMatch.dealer.values > 21) {
            if (userMatch.dealer.aces !== 0) {
                userMatch.dealer.values -= 10;
                userMatch.dealer.aces -= 1;
                this.dealersTurn(interaction, userMatch);
            } else {
                //checks if the dealer has something better than the player... obviously not a bj cos that case is checked above
                this.logger.warn("dealer lost cos bust up");
                const embed = this.bjEmbedBuilder(1, userName, userMatch);
                this.giveReward(userId,false);
                await interaction.reply({ embeds: [embed] });
            }
        }
    }

    //returns 0 if no one has bj, 1 if player has bj, 2 if player and dealer has bj
    isBlackJack(userId) {
        const userMatch = this.matches.get(userId);
        this.logger.info(userMatch.player);
        if (userMatch.player.bj) {
            if (userMatch.dealer.bj)
                return 2;
            else
                return 1;
        }
        else {
            return 0;
        }
    }

    dealerBlackJack(userId) {
        const userMatch = this.matches.get(userId);
        this.logger.info(userMatch.dealer);
        if (userMatch.dealer.bj) {
            if (userMatch.player.bj)
                return 2;
            else
                return 1;
        }
        else {
            return 0;
        }
    }

    isOver21(userId) {
        let player = this.matches.get(userId).player;
        if (player.values > 21) {
            if (player.aces !== 0) {
                player.values -= 10;
                player.aces -= 1;
                return false;//soft
            }
            else {
                return true;
            }
        }
    }

    isPlaying(userId) {
        return this.matches.get(userId) != null;
    }

    getPlayerDeck(userId) {
        return this.matches.get(userId).player.getCards();
    }

    getDealersDeck(userId) {
        return this.matches.get(userId).dealer.getCards();
    }

    getPlayerHandValue(userId) {
        return this.matches.get(userId).player.handValue().toString();
    }

    getDealerHandValue(userId) {
        return this.matches.get(userId).dealer.handValue().toString();
    }

    getRemainingCards(userId) {
        return this.matches.get(userId).deck.allCards.length.toString();
    }

    async dispose() {

    }

    async interval() {

    }
}

module.exports = { BlackJackService }