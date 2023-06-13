import { DependencyManager } from '../../Dependency-manager'
import { IChatEngineService } from '../interfaces/IChatEngineService'
import { IBotAppService } from '../interfaces/IBotAppService'
import { IConfigService } from '../interfaces/IConfigService'
import { Command } from '../../../models/Command'
import { CommandArgType } from '../../../models/CommandArgTypes'
import { ILogger } from '../interfaces/ILogger'
import { XulLogger } from '../../utils/xul-logger'
import { CBootConfig } from '../../../models/CBootConfig'

//DISCORD SPECIFIC IMPORTS
import { DiscordChatEngineService } from './DiscordChatEngineService'
import { SlashCommandBuilder } from '@discordjs/builders'
import { Client } from 'discord.js'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'

export class BotAppService implements IBotAppService {
  private logger: ILogger
  private rest!: REST
  private dependency: DependencyManager | undefined
  private bootConfig: CBootConfig | undefined
  private readonly chatEngine: IChatEngineService

  constructor () {
    this.logger = new XulLogger()//TESTING ONLY REMOVE!!!
    this.chatEngine = new DiscordChatEngineService()// TESTING ONLY THIS MUS BE RETRIVED FROM SOME ABSTRACT FACTORY

    //TODO: BIG WTF, FIX THIIS ISSUE REALTED TO THE INTERFACES for example this.deployChatCommands does not exist in the 'this' that's why you have to bind it,
    //See original dependency manager impl and check the bind methods used
    this.init = this.init.bind(this) 

  }

  async init (dependency: DependencyManager): Promise<void> {
    this.dependency = dependency
    this.bootConfig = dependency.getConfiguration()
    this.chatEngine.init(dependency);//TODO: MOCKING  PROPUSES ONLY 
    this.rest = new REST({ version: '8' }).setToken(this.bootConfig.clientKey)

    //Deploy commands to be visible on the server slash commands list (only needed once atleast on discord)
    if (this.bootConfig.deploy) {
      await this.deployChatCommands()
    } else {
      this.logger.warn("Starting bot without deploying commands....")
    }
  }

  async deployChatCommands (): Promise<void> {
    try {

      this.logger.info('Started to deploying application (/) commands or any underyling command deployment.')
      //Discord js slash builder
      const baseCommands = this.bootConfig?.commands
      const deployCommands = baseCommands?.map((cmd) => {
        return this.buildDiscordSlashCommand(cmd).toJSON();
      })
      
      //Configure the command handlers for the current chat engine
      this.chatEngine.useCommands(baseCommands!)
      
      //TODO: FIX THIS BELOW (re implemnet this call on ts) !!!!
      await this.rest.put(Routes.applicationGuildCommands(this.bootConfig!.clientId, this.bootConfig!.serverId),
        { body: deployCommands })

      this.logger.info('Successfully reloaded application (/) commands.')
    } catch (error) {
      this.logger.error("Cannot deploy commands due: " + error)
    }
  }

  //DISCORD Platform specific
  buildDiscordSlashCommand(cmd: Command): SlashCommandBuilder {
    let cmdBuilder = new SlashCommandBuilder()
      .setName(cmd.commandName)
      .setDescription(cmd.commandDescription)

    cmd.arguments.forEach((arg) => {
      //TODO: improve this thing below (avoid big ass switch cases)
      switch (arg.argType) {
        case 'NUMBER':

          cmdBuilder.addNumberOption(option => option.setName(arg.argName).setDescription(arg.description))
          break

        case 'USER':
          cmdBuilder.addUserOption(option => option.setName(arg.argName).setDescription(arg.description))
          break

        //TODO: IMPLEMENT MORE ARGUMENT TYPES IF THIS WORKS...
        default:
          this.logger.error('Command argument type not implemented:' + arg.argType.toString())
      }

      this.logger.warn(`Command builder: added ${arg.argType} option to the command, arg name: ${arg.argName}`)
    })

   this.logger.warn(`Command builder: building discord slash command for: ${ cmd.commandName }`)
   return cmdBuilder
  } 

  getCurrentChatEngine (): IChatEngineService {
    return this.chatEngine
  }

  async dispose (): Promise<void> {
    // Clean up resources
  }

  async interval (): Promise<void> {
    // Perform periodic tasks
  }
}