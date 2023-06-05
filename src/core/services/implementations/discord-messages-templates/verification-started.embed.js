const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

const theme = require("./theme");

module.exports =
{
    verificationStartedEmbed: (embedForm) => {
        return new MessageEmbed()
            .setColor(theme.primary)
            .setTitle(`Q ONDA TU VERIFICACION HA INICIADO...`)
            .setDescription("PASOS PARA VERIFICAR:")
            .addFields
            (
                { name: `1. Tu nombre completo (como aparece en tu identificación oficial)`, value: "\u200B", inline: false },
                { name: `2. Tu Riot ID.`, value: "\u200B", inline: false },
                { name: `3. Sube una fotografía como la del ejemplo de #cómo-verificar.`, value: "\u200B", inline: false },
                // { name: `DON'T SPAM OR YOU WILL GET BLACKLISTED`, value: "\u200B", inline: false },
            )
            .setTimestamp()
    },
    verificationStartedEmbedComponents:
        new MessageActionRow()
            .addComponents
            (
                new MessageButton()
                    .setCustomId('send-verification')
                    .setLabel('Send information')
                    .setStyle('SUCCESS')
            )
}
