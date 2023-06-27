import { DependencyManager } from '../Dependency-manager'
import { IChatEngineService } from './interfaces/IChatEngineService'
import { IBotAppService } from './interfaces/IBotAppService'
import { ILogger } from './interfaces/ILogger'
import { XulLogger } from '../utils/xul-logger'
import { cBootConfig } from '../../api/cBotConfig'
import { DiscordChatEngineService } from './DiscordChatEngineService'
import DiscordCommandDeployer from '../commands/deployment/DiscordCommandDeployer'

export class BotAppService implements IBotAppService {
  private logger: ILogger
  private bootConfig: cBootConfig | undefined
  private readonly chatEngine: IChatEngineService

  constructor() {
    this.logger = new XulLogger()//TODO: TESTING ONLY REMOVE!!!
    this.chatEngine = new DiscordChatEngineService() // TODO: TESTING ONLY THIS MUS BE RETRIVED FROM SOME ABSTRACT FACTORY

    this.init = this.init.bind(this)
  }

  async init(dependency: DependencyManager): Promise<void> {
    const botCommands = new DiscordCommandDeployer(dependency, this.chatEngine) // TODO: DISCORD SPECIFIC MOCKING INSTANCE, REMOVE!!!
    this.bootConfig = dependency.getConfiguration()
    this.chatEngine.init(dependency);// TODO: MOCKING  PROPUSES ONLY 

    //Deploy commands to be visible on the server slash commands list (only needed once atleast on discord)
    if (this.bootConfig.deploy) {
      await botCommands.deploy()
    } else {
      this.logger.warn("Starting bot without deploying commands....")
    }
  }

  async deployChatCommands(): Promise<void> {

  }

  getCurrentChatEngine(): IChatEngineService {
    return this.chatEngine
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}