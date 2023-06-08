import { DependencyManager } from './core/Dependency-manager'
import { CBootConfig } from './models/CBootConfig'
import { OnStartedArgs } from './models/OnStartedArgs'

export class cBot {
  static startBot (initArgs: CBootConfig, callback: (args: OnStartedArgs) => void): void {

    const appInstance = new DependencyManager()
    appInstance.initialize()

    const configService = appInstance.get('Config');
    configService.setConfiguration(initArgs);

    
    // Start the bot
    callback({ port: initArgs.port, baseUrl: 'localhost' }) // Replace 8080 with the actual port
  }
}
