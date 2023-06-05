const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('basically fuck you 🖕🖕🖕'),
    async execute(interaction, dependecy) {
        const bankService = dependecy.get("Bank");
        const app = dependecy.get("BotApp");
        const userId = interaction.user.id;
        const client = app.getClient();
        const members = client.guilds.cache.get(process.env.GUILD_ID).members.cache;
        const userName = interaction.user.username;
        const stealResult = await bankService.steal(userId, members);
        
        return await interaction.reply({ content: `${userName} stole ${stealResult.currencyUsed} from ${ stealResult.victim }`, ephemeral: false });
    }
};
