import { cBootConfig } from '../../../api/cBotConfig'
import { Command } from '../../commands/api/Command'
import { DependencyManager } from '../../Dependency-manager'
import { IConfigService } from '../interfaces/IConfigService'
import { ILogger } from '../interfaces/ILogger'

export class ConfigService implements IConfigService {
  private configuration: cBootConfig | undefined
  commands: never[]

  constructor () {
    // this.configuration = {};
    this.commands = []
  }

  getLogger (): ILogger | undefined {
    return this.configuration?.logger
  }

  getCommands (): Command[] {
    return this.commands;
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
