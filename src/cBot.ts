import { DependencyManager } from './core/Dependency-manager'
import { cBootConfig } from './api/cBotConfig'
import { OnStartedArgs } from './api/OnStartedArgs'

export function startBot (initArgs: cBootConfig, callback: (error: any, args: OnStartedArgs) => void): void {
  // Initialize systems
  const appInstance = new DependencyManager(initArgs)
  void appInstance.initialize()

  // User callback (todo remove mocking...)
  callback(null, { port: initArgs.port, baseUrl: 'localhost' })
}
