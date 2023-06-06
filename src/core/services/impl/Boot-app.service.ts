import { Client } from 'discord.js';
import { DependencyManager } from '../../Dependency-manager';
import { IChatEngineService } from '../interfaces/IChatEngineService';
import { IBotAppService } from '../interfaces/IBotAppService';

class BotAppService implements IBotAppService {
  private dependency: DependencyManager | undefined;
  private chatEngine: IChatEngineService; //TODO, INITIALIZE HERE THE CHAT ENGINE AND SEEDED WITH THE MODELS TO RESPONDE

  constructor() 
  {
  }

  async init(dependency: DependencyManager): Promise<void> {
    this.dependency = dependency;
    //Initialize chat engine here
  }

  getCurrentChatEngine(): IChatEngineService {
    // return this.client;
    return this.chatEngine;
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}

export { BotAppService };