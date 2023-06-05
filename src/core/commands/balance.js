const { SlashCommandBuilder } = require('@discordjs/builders');
const { balanceEmbed } = require('../discord-messages-templates/balance.embed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('chek yo xexos in xexos bank :xexo:'),
    async execute(interaction, dependecy) {
        const bankService = dependecy.get("Bank");
        const userName = interaction.user.username;
        const userId = interaction.user.id;
        const wallet = bankService.getWallet(userId);
        const embed = balanceEmbed({ userName, wallet });
        await interaction.reply({ embeds: [embed] });
    }
};
