import ICommandDeployer from '../api/interfaces/ICommandDeployer'

// DISCORD SPECIFIC IMPORTS
import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { DependencyManager } from '../../Dependency-manager'
import { ILogger } from '../../services/interfaces/ILogger'
import { cBootConfig } from '../../../api/cBotConfig'
import { IChatEngineService } from '../../services/interfaces/IChatEngineService'
import { Command } from '../api/Command'

export default class DiscordCommandDeployer implements ICommandDeployer {
  private readonly bootConfig: cBootConfig
  private readonly logger: ILogger
  private readonly chatEngine: IChatEngineService
  private readonly rest!: REST

  constructor (dependency: DependencyManager, engine: IChatEngineService) {
    this.bootConfig = dependency.getConfiguration()
    this.logger = this.bootConfig.logger
    this.chatEngine = engine

    this.rest = new REST({ version: '8' }).setToken(this.bootConfig.clientKey)
  }

  async deploy (): Promise<void> {
    try {
      // this.logger.info('Started to deploying application (/) commands or any underyling command deployment.')
      // Discord js slash builder

      const baseCommands = this.bootConfig?.commands
      const deployCommands = baseCommands?.map((cmd) => {
        return this.buildDiscordSlashCommand(cmd).toJSON()
      })

      // Configure the command handlers for the current chat engine
      this.chatEngine.useCommands(baseCommands)

      // TODO: FIX THIS BELOW (re implemnet this call on ts) !!!!
      await this.rest.put(Routes.applicationGuildCommands(this.bootConfig.clientId, this.bootConfig.serverId),
        { body: deployCommands })

      this.logger.info('Successfully reloaded application (/) commands.')
    } catch (error) {
      this.logger.error('Cannot deploy commands due: ' + error)
    }
  }

  // DISCORD Platform specific slash commands
  buildDiscordSlashCommand (cmd: Command): SlashCommandBuilder {
    const cmdBuilder = new SlashCommandBuilder()
      .setName(cmd.name)
      .setDescription(cmd.description)

    cmd.arguments.forEach((arg) => {
      // TODO: improve this thing below (avoid big ass switch cases)
      switch (arg.argType) {
        case 'NUMBER':

          cmdBuilder.addNumberOption(option => option.setName(arg.argName).setDescription(arg.description))
          break

        case 'USER':
          cmdBuilder.addUserOption(option => option.setName(arg.argName).setDescription(arg.description))
          break

        // TODO: IMPLEMENT MORE ARGUMENT TYPES IF THIS WORKS...
        default:
          this.logger.error('Command argument type not implemented:' + arg.argType.toString())
      }

      this.logger.warn(`Command builder: added ${arg.argType} option to the command, arg name: ${arg.argName}`)
    })

    this.logger.warn(`Command builder: building discord slash command for: ${cmd.name}`)
    return cmdBuilder
  }
}
