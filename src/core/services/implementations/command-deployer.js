const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v8');
const e = require('express');
const rest = new REST({ version: '8' }).setToken(process.env.BOT_TOKEN);


class CommandDeployer {

    constructor() {
    }

    async init(dependency) {

        this.logger = dependency.get("Logger");
        this.discord = dependency.get("Discord");

        if (process.env.RUN_COMMAND_DEPLOYER == "true") {
            await this.Deploy();
        } else {
            this.logger.warn("Starting bot without deploying commands....");
        }
    }
   
    async Deploy() {
        //do some mf refactor here (not needed now lol)
        const deployCommands = await this.discord.getCommandsInfo();
        try {
            this.logger.info('Started refreshing application (/) commands.');
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: deployCommands },
            );

            this.logger.info('Successfully reloaded application (/) commands.');
        } catch (error) {
            this.logger.error("cannot deploy commands due: " + error);
        }
    }

    async dispose() 
    {

    }

    async interval() {

    }
}

module.exports = { CommandDeployer }