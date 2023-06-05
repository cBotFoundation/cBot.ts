const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('wipe')
        .setDescription('wipe the whole economy 😎'),
    async execute(interaction, dependecy) {
        const logger = dependecy.get("Logger");
        const bankService = dependecy.get("Bank");
        const app = dependecy.get("BotApp");
        //Get all users from the guild
        // const userIds = new interaction.guild.members.holds();
        const client = app.getClient();
        const members = await client.guilds.cache.get(process.env.GUILD_ID).members;
        const userIds = members.cache.map(element => {
            logger.warn(`user [${element.user.username}] balance wiped`);
            return element.user.id;
        });
        
        await bankService.wipe(userIds, 5000);
        await interaction.reply("Economy wiped... :xexo:");
    }
};
