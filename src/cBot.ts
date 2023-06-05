
export class cBot {
  static startBot(initArgs: CBootConfig, callback: (args: OnStartedArgs) => void): void {
    // Initialize chat implementation
    // TODO

    // Initialize services
    const app = require("./core/dependency-manager");
    require('dotenv').config();

    // Todo: refactor the dependency manager to be inside of the app manager
    const appInstance = new app.DepedencyManager();
    appInstance.initialize();

    // Start the bot
    callback(new OnStartedArgs()); // Replace 8080 with the actual port
  }
}
