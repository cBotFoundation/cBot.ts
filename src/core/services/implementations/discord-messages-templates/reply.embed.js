const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

const theme = require("./theme");

module.exports =
{
    replyEmbed: (embedForm) => {
        return new MessageEmbed()
            .setColor(theme.primary)
            .setTitle(`VERIFY YOUR ACCOUNT`)
            .setDescription("Account verification via DM 🚬🚬🚬")
            .addFields
            (
                { name: `Press the accept button if you want your verification process to start via DM`, value: "\u200B", inline: false },
                { name: '\u200B', value: '\u200B' },
                // { name: `DON'T SPAM OR YOU WILL GET BLACKLISTED`, value: "\u200B", inline: false },
            )
            .setTimestamp()
    },
    replyEmbedComponents:
        new MessageActionRow()
            .addComponents
            (
                new MessageButton()
                    .setCustomId('start-verification')
                    .setLabel('Accept')
                    .setStyle('SUCCESS')
            )
}
