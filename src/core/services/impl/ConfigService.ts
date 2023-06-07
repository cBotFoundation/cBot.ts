import { CBootConfig } from '../../../models/CBootConfig'
import { Command } from '../../../models/Command'
import { DependencyManager } from '../../Dependency-manager'
import { IConfigService } from '../interfaces/IConfigService'
import { ILogger } from '../interfaces/ILogger'

export class ConfigService implements IConfigService {
  private configuration: CBootConfig | undefined
  private readonly commands: Command[]

  constructor () {
    // this.configuration = {};
    this.commands = []
  }

  setConfiguration (config: CBootConfig): void {
    this.configuration = config
  }

  getConfiguration (): CBootConfig | undefined {
    return this.configuration
  }

  getLogger (): ILogger | undefined {
    return this.configuration?.logger
  }

  getCommands (): Command[] {
    return this.commands
  }

  // ISERVICE IMPL
  async init (dependency: DependencyManager): Promise<void> {
    // Initialization logic, if any
  }

  async dispose (): Promise<void> {
    // Clean up resources
  }

  async interval (): Promise<void> {
    // Perform periodic tasks
  }
}
