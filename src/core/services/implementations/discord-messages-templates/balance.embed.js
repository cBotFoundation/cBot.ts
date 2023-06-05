const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

const theme = require("./theme");

const resolveNetWorth = (balance) => {
    return balance.bankBalance + balance.creditBalance + balance.handBalance
}

const resolveColor = (wallet) => {
    return resolveNetWorth(wallet) > 1 ? theme.primary : theme.danger;
}

module.exports = {
    balanceEmbed: (embedForm) => {
        const wallet = embedForm.wallet;
        return new MessageEmbed()
            .setAuthor(embedForm.userName)
            .setColor(resolveColor(wallet))
            .setTitle(`Balance`)
            .setDescription("bank of xexos")
            .addFields(
                { name: "Bank", value: wallet.bankBalance.toString(), inline: false },
                { name: "In your hand", value: wallet.handBalance.toString(), inline: false },
                { name: "Credit card", value: wallet.creditBalance.toString(), inline: false },
                { name: '\u200B', value: '\u200B' },
                { name: `NetWorth: ${resolveNetWorth(wallet)}`, value: "\u200B", inline: false },
            )
            .setTimestamp()
    }
}
