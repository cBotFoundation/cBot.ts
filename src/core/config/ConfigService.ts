import { cBootConfig } from './models/cBotConfig'
import { DependencyManager } from '../Dependency-manager'
import { Command } from '../commands/api/Command'
import { ILogger } from '../services/interfaces/ILogger'
import Service from '../services/interfaces/Service'

export class ConfigService implements Service {
  private readonly configuration: cBootConfig | undefined
  commands: never[]

  constructor () {
    // this.configuration = {};
    this.commands = []
  }

  getLogger (): ILogger | undefined {
    return this.configuration?.logger
  }

  getCommands (): Command[] {
    return this.commands
  }

  // SERVICE IMPL
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
