import { cBot } from "../cBot";
import { ILogger } from "../core/services/interfaces/ILoggerService";
import { CBootConfig } from "../models/CBootConfig";
import { Command } from "../models/Command";
import { CommandCallbackArgs } from "../models/CommandCallbackArgs";
import { OnStartedArgs } from "../models/OnStartedArgs";

//Custom logger example
import log4js from "log4js";

class CustomLogger implements ILogger {
  private logger: any;

  constructor() {
    log4js.configure({
      appenders: { out: { type: 'stdout' }, cBot: { type: "file", filename: "logs/cBot.log" } },
      categories: { default: { appenders: ["cBot", "out"], level: "debug" } }
    });
    this.logger = log4js.getLogger("cBot");
  }

  info(message: string): void {
    this.logger.info(message.toUpperCase());
  }

  warn(message: string): void {
    this.logger.warn(message.toUpperCase());
  }

  error(message: string): void {
    this.logger.error(message.toUpperCase());
  }

  fatal(message: string): void {
    this.logger.fatal(message.toUpperCase());
  }
}


//Mock up testing
export function cBotPackageTest() {

  const mockCallback = (args: CommandCallbackArgs): void => {
    console.log('Mock callback executed with args:', args);
  };

  const mockCommand: Command = new Command(
    'mockCommandName',
    mockCallback,
  );

  const mockCBootConfig: CBootConfig = {
    clientKey: 'mockClientKey',
    clientId: 'mockClientId',
    serverId: 'mockServerId',
    useImplementations: ['MockImplementation1', 'MockImplementation2'],
    locale: 'en-US',  // Assuming it's a locale string
    theme: 'dark', // Assuming it's a theme string, replace with actual dummy value
    commands: [mockCommand], // Fill with actual dummy Commands
    logger: new CustomLogger()
  };

  // Define the callback function to handle the bot startup
  const onStarted = (args: OnStartedArgs) => {
    console.log(`Bot started at ${args.port}`);
    // Additional logic after the bot has started
  };

  // Start the bot
  cBot.startBot(mockCBootConfig, onStarted);
}
