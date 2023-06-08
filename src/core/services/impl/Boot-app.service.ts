import { Client, SlashCommandBuilder} from 'discord.js'
import { DependencyManager } from '../../Dependency-manager'
import { IChatEngineService } from '../interfaces/IChatEngineService'
import { IBotAppService } from '../interfaces/IBotAppService'
import { DiscordChatEngineService } from './DiscordChatEngineService'
import { IConfigService } from '../interfaces/IConfigService'
import { Command } from '../../../models/Command'
import { CommandArgType } from '../../../models/CommandArgTypes'
import { ILogger } from '../interfaces/ILogger'
import { XulLogger } from '../../utils/xul-logger'
import { CBootConfig } from '../../../models/CBootConfig'
// const rest = new REST({ version: '8' }).setToken(process.env.BOT_TOKEN)

class BotAppService implements IBotAppService {
  private logger: ILogger
  private dependency: DependencyManager | undefined
  private configService: IConfigService | undefined
  private statupBotConfig: CBootConfig | undefined
  private readonly chatEngine: IChatEngineService

  constructor () {
    this.logger = new XulLogger()//TESTING ONLY REMOVE!!!
    this.chatEngine = new DiscordChatEngineService()// TESTING ONLY THIS MUS BE RETRIVED FROM SOME ABSTRACT FACTORY
  }

  async init (dependency: DependencyManager): Promise<void> {
    this.dependency = dependency
    this.configService = dependency.get("Config")
    this.statupBotConfig = this.configService?.getConfiguration();

    if (this.statupBotConfig?.deploy === true) {
      this.deploy()
    } else {
      this.logger.warn("Starting bot without deploying commands....")
    }
  }

  //DISCORD Platform specific
  buildDiscordSlashCommand(cmd: Command): string {
    let cmdBuilder = new SlashCommandBuilder()
      .setName(cmd.commandName)
      .setDescription(cmd.commandDescription)

    cmd.arguments.forEach((arg) => {
      //todo: improve this thing below (avoid big ass switch cases)
      switch (arg.argType) {
        case CommandArgType.NUMBER:
          cmdBuilder.addNumberOption(option => option.setName(arg.argName).setDescription(arg.description))
          break

        case CommandArgType.USER:
          cmdBuilder.addUserOption(option => option.setName(arg.argName).setDescription(arg.description))
          break

        //TODO: IMPLEMENT MORE ARGUMENT TYPES IF THIS WORKS...
        default:
          this.logger.error('Command argument type not implemented:' + arg.argType.toString())
      }
    })

   return JSON.parse(cmdBuilder)
  } 

  deploy(): void {
    try {

      this.logger.info('Started refreshing application (/) commands.')
      //Discord js slash builder
      const baseCommands = this.configService?.getCommands()
      const deployCommands = baseCommands?.map((cmd) => {
        return this.buildDiscordSlashCommand(cmd)
      })
      
      //Configure the command handlers for the current chat engine
      this.chatEngine.useCommands(baseCommands!);
      
      //TODO: FIX THIS BELOW (re implemnet this call on ts) !!!!
      await rest.put(Routes.applicationGuildCommands(this.statupBotConfig?.clientId, this.statupBotConfig?.serverId),
        { body: deployCommands })

      this.logger.info('Successfully reloaded application (/) commands.')
    } catch (error) {
      this.logger.error("Cannot deploy commands due: " + error)
    }
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

export { BotAppService }
