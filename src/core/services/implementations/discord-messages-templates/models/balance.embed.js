const { SlashCommandBuilder } = require('@discordjs/builders');


class BalanceEmbedForm {
    constructor(userName,wallet) {
        this.userName = userName;
        this.wallet = wallet;
    }
}


module.exports = { BalanceEmbedForm }