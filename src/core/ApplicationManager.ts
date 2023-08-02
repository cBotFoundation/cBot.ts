import { cBootConfig } from './config/models/cBotConfig'
import Service from './services/interfaces/Service'
import { coreServices } from './services/Services.module'
import { ILogger } from './services/interfaces/ILogger'
import { XulLogger } from './utils/xul-logger'

class ApplicationManager {
  private readonly instancedServices: Map<string, any>
  private readonly startHooks: Array<{ serviceName: string, hook: (manager: ApplicationManager) => void }>
  private readonly intervalHooks: Array<() => void>
  private readonly disposeHooks: Array<() => Promise<void>>
  private readonly logger: ILogger
  private readonly bootConfig: cBootConfig

  constructor (configuration: cBootConfig) {
    this.logger = new XulLogger()// TESTING AND MOCKING ONLY REMOVE!!!!

    this.bootConfig = configuration
    this.instancedServices = new Map()
    this.startHooks = []
    this.intervalHooks = []
    this.disposeHooks = []
  }

  private configureService (service: Service): void {
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

  private invokeStartHooks (): void {
    try {
      this.startHooks.forEach((meta) => {
        meta.hook(this)
        this.logger.info(`Service [[${meta.serviceName}]] has been started successfully`)
      })
    } catch (error) {
      let message = 'Unknown error'
      if (error instanceof Error) message = error.message

      this.logger.fatal(`error initializing: ${message}`)
    }
  }

  private async invokeDisposeHooks (): Promise<void> {
    try {
      for (const hook of this.disposeHooks) {
        await hook()
      }
    } catch (error) {
      let message = 'Unknown error'
      if (error instanceof Error) message = error.message

      this.logger.error(`Cannot dispose service: ${message}`)
    }
  }

  async initialize (): Promise<void> {
    // Core services
    coreServices.forEach((ServiceClass: new () => Service) => {
      const serviceInstance = new ServiceClass()
      this.configureService(serviceInstance)
    })

    this.invokeStartHooks()

    // todo: extract and enhance to cover all possible exit events
    process.on('exit', (code) => {
      this.logger.error(`exit code: ${code}`)
      void this.invokeDisposeHooks()
    })
  }

  async restart (): Promise<void> {
    await this.invokeDisposeHooks()
    this.invokeStartHooks()
  }

  get (name: string): any {
    return this.instancedServices.get(name)
  }

  getConfiguration (): cBootConfig {
    return this.bootConfig
  }
}

export { ApplicationManager }
