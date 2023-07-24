import { DependencyManager } from './core/Dependency-manager'
import { cBootConfig } from './core/config/models/cBotConfig'

export function startBot (initArgs: cBootConfig, callback: (error: any) => void): void {
  // Initialize systems
  const appInstance = new DependencyManager(initArgs)
  void appInstance.initialize()

  callback(null)
}
