const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trade')
        .setDescription('exchange xexos')
        .addUserOption(option => option.setName('user').setDescription('user to give xexos'))
        .addNumberOption(option => option.setName('amount').setDescription('how much u want to trade uwu')),
    async execute(interaction,dependecy) {
        const bankService = dependecy.get("Bank");
        const user = interaction.user;
        if (interaction.options.data.length < 2) return await interaction.reply({ content: 'no args provided', ephemeral: true });
        
        const beneficiaryUser = interaction.options.data[0];
        const amountOption = interaction.options.data[1];

        //TODO:CREATE "PIPES"
        if (await bankService.trade(Number(amountOption.value), user, beneficiaryUser.user))
            return await interaction.reply({ content: `Successfully transfered ${amountOption.value} to ${beneficiaryUser.user.username} uwu`, ephemeral: false });
        else
            return await interaction.reply({ content: `No enough balance in hand`, ephemeral: true });
    }
};
