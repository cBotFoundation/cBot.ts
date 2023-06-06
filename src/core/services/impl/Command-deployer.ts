import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v8';
import { DependencyManager } from '../../Dependency-manager';
import { ICommandDeployer } from '../interfaces/ICommandDeployer';

const rest = new REST({ version: '8' }).setToken(process.env.BOT_TOKEN);

class CommandDeployer implements ICommandDeployer {
  private logger: any;
  private discord: any;

  constructor() {
  }

  async init(dependency: DependencyManager): Promise<void> {
    this.logger = dependency.get("Logger");
    this.discord = dependency.get("Discord");

    if (process.env.RUN_COMMAND_DEPLOYER === "true") {
      await this.Deploy();
    } else {
      this.logger.warn("Starting bot without deploying commands....");
    }
  }

  async Deploy(): Promise<void> {
    const deployCommands = await this.discord.getCommandsInfo();
    try {
      this.logger.info('Started refreshing application (/) commands.');
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: deployCommands },
      );

      this.logger.info('Successfully reloaded application (/) commands.');
    } catch (error) {
      this.logger.error("Cannot deploy commands due to error: " + error);
    }
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}

export { CommandDeployer };
