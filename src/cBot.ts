import { ApplicationManager } from './core/ApplicationManager'
import { cBootConfig } from './core/config/models/cBotConfig'

export function startBot (initArgs: cBootConfig, callback: (error: any) => void): void {
  // Initialize systems
  const appInstance = new ApplicationManager(initArgs)
  void appInstance.initialize()

  callback(null)
}
