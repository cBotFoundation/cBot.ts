import { cBootConfig } from './config/cBotConfig'
import ApplicationContext from './ApplicationContext'
import Service from '../services/interfaces/Service'
import { EngineImplementationClasses } from '../engines/engines.module'
import { Logger } from '../services/interfaces/Logger'
import { XulLogger } from '../../utils/xul-logger'

export default class ApplicationManager {
  private readonly startHooks: Array<(manager: ApplicationContext) => void >
  private readonly intervalHooks: Array<() => void>
  private readonly disposeHooks: Array<() => Promise<void>>
  private readonly applicationContext: ApplicationContext
  private readonly configuration: cBootConfig
  private readonly logger: Logger

  constructor (configuration: cBootConfig) {
    this.configuration = configuration
    this.logger = configuration.logger || new XulLogger() // TODO: Replace for a better logging solution
    this.applicationContext = new ApplicationContext(configuration, this.logger)
    this.startHooks = []
    this.intervalHooks = []
    this.disposeHooks = []
  }

  async initialize (): Promise<void> {
    this.configuration.botImplementations.forEach(implementation => {
      const serviceInstance = new EngineImplementationClasses[implementation]()
      this.applicationContext.registerService(serviceInstance)
      this.registerServiceHooks(serviceInstance)
    })

    this.invokeStartHooks()

    // todo: extract and enhance to cover all possible exit events
    process.on('exit', (code) => {
      this.logger.error(`exit code: ${code}`)
      void this.invokeDisposeHooks()
    })
  }

  public registerServiceHooks (service: Service): void {
    this.startHooks.push(service.init.bind(service))
    this.intervalHooks.push(service.interval.bind(service))
    this.disposeHooks.push(service.dispose.bind(service))
  }

  private invokeStartHooks (): void {
    try {
      this.startHooks.forEach((hook) => {
        hook(this.applicationContext)
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
}
