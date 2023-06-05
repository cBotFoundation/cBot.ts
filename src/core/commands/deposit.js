const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deposit')
        .setDescription('store your money in a safe place *wink* *wink* ')
        .addNumberOption(option => option.setName('amount').setDescription('amount of xexos to deposit')),
    async execute(interaction, dependecy) {
        const bankService = dependecy.get("Bank");
        const userId = interaction.user.id;

        if (interaction.options.data.length <= 0) return await interaction.reply({ content: 'no args provided', ephemeral: true });
        const amountOption = interaction.options.data[0];
        if (amountOption.type !== "NUMBER") return await interaction.reply({ content: 'not an number fool', ephemeral: true });

        if (await bankService.deposit(userId, amountOption.value))
            return await interaction.reply({ content: `Succesfully deposited: ${amountOption.value}`, ephemeral: false });
        else
            return await interaction.reply({ content: `No enough balance`, ephemeral: true });
    }
};
