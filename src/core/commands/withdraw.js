const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('withdraw')
        .setDescription('take yo money out')
        .addNumberOption(option => option.setName('amount').setDescription('amount of xexos to withdraw')),
    async execute(interaction,dependecy) {
        const bankService = dependecy.get("Bank");
        const userId = interaction.user.id;

        if (interaction.options.data.length <= 0) return await interaction.reply({ content: 'no args provided', ephemeral: true });
        const amountOption = interaction.options.data[0];
        if (amountOption.type !== "NUMBER") return await interaction.reply({ content: 'not an number fool', ephemeral: true });

        if (await bankService.withdraw(userId, amountOption.value))
            return await interaction.reply({ content: `Successfully took ${amountOption.value}`, ephemeral: false });
        else
            return await interaction.reply({ content: `No enough balance`, ephemeral: true });
    }
};
