const { SlashCommandBuilder } = require('@discordjs/builders');
const { replyEmbed, replyEmbedComponents } = require('../discord-messages-templates/reply.embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('crea un ticket para reportar una incidencia')
        .addUserOption(option => option.setName('problem').setDescription('que problemas tienes (solo texto)')),
    async execute(interaction, dependecy) 
    {
        const userId = interaction.user.id;
        const ticket = dependecy.get("Ticket");
        
        // if (!ticket.hasTicketColdDown(userId))
            return await ticket.createTicket(interaction);
        // else
        //     return await interaction.reply({ content: `chill tf out pls, you have a 15 minutes cold down`, ephemeral: true });
    }
};
