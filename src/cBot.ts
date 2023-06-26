import { DependencyManager } from './core/Dependency-manager'
import { cBootConfig } from './api/cBotConfig'
import { OnStartedArgs } from './api/OnStartedArgs'

export class cBot {
  static startBot (initArgs: cBootConfig, callback: (args: OnStartedArgs) => void): void {
    //Intialize systems 
    
    const appInstance = new DependencyManager(initArgs)
    appInstance.initialize()
   
    // User callback (todo remove mocking...)
    callback({ port: initArgs.port, baseUrl: 'localhost' }) // Replace 8080 with the actual port
  }
}
