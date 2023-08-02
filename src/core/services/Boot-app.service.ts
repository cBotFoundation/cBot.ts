import { ApplicationManager } from '../ApplicationManager'
import { ChatEngineService } from '../engines/IChatEngineService'
import { ILogger } from './interfaces/ILogger'
import { XulLogger } from '../../utils/xul-logger'
import { cBootConfig } from '../config/models/cBotConfig'
import DiscordCommandDeployer from '../commands/deployment/DiscordCommandDeployer'
import Service from './interfaces/Service'
import { DiscordChatEngineService } from '../engines/implementations/DiscordChatEngineService'

export class BotAppService implements Service {
  private readonly logger: ILogger
  private bootConfig: cBootConfig | undefined
  private readonly chatEngine: ChatEngineService

  constructor () {
    this.logger = new XulLogger()// TODO: TESTING ONLY REMOVE!!!
    this.chatEngine = new DiscordChatEngineService() // TODO: TESTING ONLY THIS MUS BE RETRIVED FROM SOME ABSTRACT FACTORY

    this.init = this.init.bind(this)
  }

  async init (dependency: ApplicationManager): Promise<void> {
    const botCommands = new DiscordCommandDeployer(dependency, this.chatEngine) // TODO: DISCORD SPECIFIC MOCKING INSTANCE, REMOVE!!!
    this.bootConfig = dependency.getConfiguration()
    this.chatEngine.init(dependency)// TODO: MOCKING  PROPUSES ONLY

    // Deploy commands to be visible on the server slash commands list (only needed once atleast on discord)
    if (this.bootConfig.deploy) {
      await botCommands.deploy()
    } else {
      this.logger.warn('Starting bot without deploying commands....')
    }
  }

  async dispose (): Promise<void> {
    // Clean up resources
  }

  async interval (): Promise<void> {
    // Perform periodic tasks
  }
}
