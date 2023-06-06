import { DependencyManager } from '../../Dependency-manager';
import { IBootstrapService } from '../interfaces/IBootStrapService';
import { IService } from './IService'; // Update with the correct path to the IService interface

class BootstrapService implements IBootstrapService 
{
  private logger: any;
  private app: any;
  private client: any;

  constructor() 
  {
    
  }

  async init(dependency: DependencyManager): Promise<void> {
    this.logger = dependency.get("Logger");
    // this.app = dependency.get("BotApp");
    // this.client = this.app.getClient();

    //DO INITIALIZATION STUFF WHEN THE BOT HAS STARTED
    this.logger.info("Boostraping and seeding bot...");
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}

export { BootstrapService };
