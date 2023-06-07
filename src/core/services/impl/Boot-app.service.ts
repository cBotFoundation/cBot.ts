import { Client } from 'discord.js'
import { DependencyManager } from '../../Dependency-manager'
import { IChatEngineService } from '../interfaces/IChatEngineService'
import { IBotAppService } from '../interfaces/IBotAppService'
import { DiscordChatEngineService } from './DiscordChatEngineService'

class BotAppService implements IBotAppService {
  private dependency: DependencyManager | undefined
  private readonly chatEngine: IChatEngineService // TODO, INITIALIZE HERE THE CHAT ENGINE AND SEEDED WITH THE MODELS TO RESPONDE

  constructor () {
    this.chatEngine = new DiscordChatEngineService()// TESTING ONLY THIS MUS BE RETRIVED FROM A FACTORY
  }

  async init (dependency: DependencyManager): Promise<void> {
    this.dependency = dependency
    // Initialize chat engine here
  }

  getCurrentChatEngine (): IChatEngineService {
    // return this.client;
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
