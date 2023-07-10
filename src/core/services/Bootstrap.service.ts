import { DependencyManager } from '../Dependency-manager'
import { IBootstrapService } from './interfaces/IBootstrapService'

class BootstrapService implements IBootstrapService {
  private readonly logger: any
  private readonly app: any
  private readonly client: any

  constructor () {

  }

  async init (dependency: DependencyManager): Promise<void> {
    // this.logger = dependency.get("Config").GetLogger();

    // DO INITIALIZATION STUFF WHEN THE BOT HAS STARTED
    // this.logger.info("Boostraping and seeding bot...");
  }

  async dispose (): Promise<void> {
    // Clean up resources
  }

  async interval (): Promise<void> {
    // Perform periodic tasks
  }
}

export { BootstrapService }
