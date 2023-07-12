import { DependencyManager } from './core/Dependency-manager'
import { cBootConfig } from './api/cBotConfig'
import { OnStartedArgs } from './api/OnStartedArgs'

export function startBot (initArgs: cBootConfig, callback: (args: OnStartedArgs) => void): void {
  // Initialize systems
  const appInstance = new DependencyManager(initArgs)
  void appInstance.initialize()

  // User callback (todo remove mocking...)
  callback({ port: initArgs.port, baseUrl: 'localhost' }) // Replace 8080 with the actual port
}
