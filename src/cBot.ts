import { CBootConfig } from "./models/CBootConfig";
import { OnStartedArgs } from "./models/OnStartedArgs";

export class cBot {
  static startBot(initArgs: CBootConfig, callback: (args: OnStartedArgs) => void): void {
    // Initialize chat implementation
    // TODO

    //TODO FIX CODE BELOW
    // // Initialize services
    // const app = require("./core/dependency-manager");
    // require('dotenv').config();

    // // Todo: refactor the dependency manager to be inside of the app manager
    // const appInstance = new app.DepedencyManager();
    // appInstance.initialize();

    // Start the bot
    callback({ port: 5151, baseUrl: "dummy.com" }); // Replace 8080 with the actual port
  }
}
