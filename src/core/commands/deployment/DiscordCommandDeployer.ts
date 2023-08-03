import { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { Logger } from '../../services/interfaces/Logger'
import { assertConfigurationHasDiscordProperties, cBootConfig } from '../../application/config/cBotConfig'
import { ChatEngineService } from '../../engines/ChatEngineService'
import { Command } from '../api/Command'
import CommandDeployer from '../api/interfaces/CommandDeployer'
import ApplicationContext from '../../application/ApplicationContext'

export default class DiscordCommandDeployer implements CommandDeployer {
  private readonly bootConfig: cBootConfig
  private readonly logger: Logger
  private readonly chatEngine: ChatEngineService
  private readonly rest!: REST

  constructor (dependency: ApplicationContext, engine: ChatEngineService) {
    this.bootConfig = dependency.getConfiguration()
    this.logger = dependency.getLogger()
    this.chatEngine = engine
    assertConfigurationHasDiscordProperties(this.bootConfig)

    this.rest = new REST({ version: '8' }).setToken(this.bootConfig.discordClientKey)
  }

  async deploy (): Promise<void> {
    try {
      // this.logger.info('Started to deploying application (/) commands or any underyling command deployment.')
      // Discord js slash builder

      const baseCommands = this.bootConfig?.commands

      if (baseCommands == null) return

      const deployCommands = baseCommands?.map((cmd) => {
        return this.buildDiscordSlashCommand(cmd).toJSON()
      })

      // Configure the command handlers for the current chat engine
      this.chatEngine.useCommands(baseCommands)

      // TODO: FIX THIS BELOW (re implemnet this call on ts) !!!!
      // @ts-expect-error
      await this.rest.put(Routes.applicationGuildCommands(this.bootConfig.discordClientId, this.bootConfig.discordServerId),
        { body: deployCommands })

      this.logger.info('Successfully reloaded application (/) commands.')
    } catch (error) {
      let message = 'Unknown'
      if (error instanceof Error) message = error.message
      this.logger.error(`Cannot deploy commands due: ${message}`)
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
