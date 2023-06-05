const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

const theme = require("./theme");

module.exports =
{
    replyEmbed: (embedForm) => {
        return new MessageEmbed()
            .setColor(theme.primary)
            .setTitle(`USER CREATED A TICKET`)
            .setDescription("Check the content and resolve or reject ticket")
            .addFields
            (
                { name: `User:`, value: `${ embedForm.userName }`, inline: false },
                { name: `Content:`, value: `${ embedForm.ticketContent }`, inline: false },
                { name: '\u200B', value: '\u200B' },
            )
            .setTimestamp()
    },
    replyEmbedComponents:
        new MessageActionRow()
            .addComponents
            (
                new MessageButton()
                    .setCustomId('aprove-ticket')
                    .setLabel('Resolve')
                    .setStyle('SUCCESS')
            )
            .addComponents
            (
                new MessageButton()
                    .setCustomId('reject-ticket')
                    .setLabel('Reject')
                    .setStyle('DANGER')
            )
}
