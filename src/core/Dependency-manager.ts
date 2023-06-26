import { cBootConfig } from '../api/cBotConfig'
import { IService } from './services/interfaces/IService'
import { coreServices } from './services/Services.module'
import { ILogger } from './services/interfaces/ILogger'
import { XulLogger } from './utils/xul-logger'

//TODO: RENAME THIS TO CONTEXT MANAGER?
class DependencyManager {
  private readonly instancedServices: Map<string, any>
  private readonly startHooks: Array<{ serviceName: string, hook: (manager: DependencyManager) => void }>
  private readonly intervalHooks: Array<() => void>
  private readonly disposeHooks: Array<() => Promise<void>>
  private readonly logger: ILogger
  private bootConfig: cBootConfig 

  constructor (configuration: cBootConfig) {
    this.logger = new XulLogger()// TESTING AND MOCKING ONLY REMOVE!!!!
    
    this.bootConfig = configuration;
    this.instancedServices = new Map()
    this.startHooks = []
    this.intervalHooks = []
    this.disposeHooks = []
  }

  configreService (service: IService): void {
    try {
      const serviceName = service.constructor.name.replace('Service', '')

      this.startHooks.push({ serviceName, hook: service.init })
      this.intervalHooks.push(service.interval)
      this.disposeHooks.push(service.dispose)
      this.instancedServices.set(serviceName, service)
    } catch (error) {
      this.logger.info(`Service [[${service.constructor.name}]] cannot be instanced...`)
    }
  }

  invokeStartHooks (): void {
    try {
      this.startHooks.forEach((meta) => {
        meta.hook(this)
        this.logger.info(`Service [[${meta.serviceName}]] has been started successfully`)
      })
    } catch (error) {
      this.logger.fatal(`error initialzing: ${error}`)
    }
  }

  async invokeDisposeHooks (): Promise<void> {
    try {
      for (const hook of this.disposeHooks) {
        await hook()
      }
    } catch (error) {
      this.logger.error(`Cannot dispose service: ${error}`)
    }
  }

  async initialize (): Promise<void> {
    // Core services
    coreServices.forEach((ServiceClass: new () => IService) => {
      const serviceInstance = new ServiceClass()
      this.configreService(serviceInstance)
    })

    this.invokeStartHooks()

    // todo: fixe proceess dep
    // process.on('exit', async (code) => {
    //   this.logger.error("exit code: " + code);
    //   await this.invokeDisposeHooks();
    // });
  }

  async restart (): Promise<void> {
    await this.invokeDisposeHooks()
    this.invokeStartHooks()
  }

  get (name: string): any {
    return this.instancedServices.get(name)
  }

  getConfiguration (): cBootConfig  {
    return this.bootConfig
  }
}

export { DependencyManager }
