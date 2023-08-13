import Service from '../services/interfaces/Service'
import { Logger } from '../services/interfaces/Logger'
import { cBootConfig } from './config/cBotConfig'

export default class ApplicationContext {
  private readonly logger: Logger
  private readonly bootConfig: cBootConfig
  private readonly instancedServices: Map<string, any> = new Map<string, any>()

  constructor (configuration: cBootConfig, logger: Logger) {
    this.bootConfig = configuration
    this.logger = logger
  }

  public registerService (service: Service): void {
    this.instancedServices.set(service.name, service)
  }

  public getService (name: string): any {
    return this.instancedServices.get(name)
  }

  public getConfiguration (): cBootConfig {
    return this.bootConfig
  }

  public getLogger (): Logger {
    return this.logger
  }
}
