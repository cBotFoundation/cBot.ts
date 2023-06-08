import { DependencyManager } from './core/Dependency-manager'
import { CBootConfig } from './models/CBootConfig'
import { OnStartedArgs } from './models/OnStartedArgs'

export class cBot {
  static startBot (initArgs: CBootConfig, callback: (args: OnStartedArgs) => void): void {
    //Intialize systems 
    
    const appInstance = new DependencyManager(initArgs)
    appInstance.initialize()
   
    // User callback (todo remove mocking...)
    callback({ port: initArgs.port, baseUrl: 'localhost' }) // Replace 8080 with the actual port
  }
}
