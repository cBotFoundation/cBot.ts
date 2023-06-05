const { SlashCommandBuilder } = require('@discordjs/builders');
const { replyEmbed, replyEmbedComponents } = require('../discord-messages-templates/reply.embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('request validation'),
    async execute(interaction, dependecy) 
    {
        const verification = dependecy.get("Verification");
        await verification.publishVerificationAdvice(interaction);
        // const wallet = bankService.getWallet(userId);

        const embed = replyEmbed({});
        //await interaction.reply({});
        return await interaction.reply({ content: `Verify posted in current channel`, ephemeral: true });

        //await interaction.reply({ embeds: [embed], components: [replyEmbedComponents] });
    }
};
