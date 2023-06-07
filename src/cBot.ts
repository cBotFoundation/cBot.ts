import { DependencyManager } from './core/Dependency-manager'
import { CBootConfig } from './models/CBootConfig'
import { OnStartedArgs } from './models/OnStartedArgs'

export class cBot {
  static startBot (initArgs: CBootConfig, callback: (args: OnStartedArgs) => void): void {
    const appInstance = new DependencyManager()
    appInstance.initialize()

    // Start the bot
    callback({ port: 5151, baseUrl: 'dummy.com' }) // Replace 8080 with the actual port
  }
}
