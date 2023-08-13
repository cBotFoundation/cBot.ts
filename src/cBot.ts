import ApplicationManager from './core/application/ApplicationManager'
import { cBootConfig } from './core/application/config/cBotConfig'

export function startBot (initArgs: cBootConfig, callback: (error: any) => void): void {
  // Initialize systems
  const appInstance = new ApplicationManager(initArgs)
  void appInstance.initialize()

  callback(null)
}
