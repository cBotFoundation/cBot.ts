import { cBot } from "../cBot";
import { CBootConfig } from "../models/CBootConfig";
import { Command } from "../models/Command";
import { CommandCallbackArgs } from "../models/CommandCallbackArgs";
import { OnStartedArgs } from "../models/OnStartedArgs";

//Hello world example
export function cBotPackageTest()
{

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
    commands: [mockCommand] // Fill with actual dummy Commands
  };
  
  // Define the callback function to handle the bot startup
  const onStarted = (args: OnStartedArgs) => {
    console.log(`Bot started at ${args.port}`);
    // Additional logic after the bot has started
  };

  // Start the bot
  cBot.startBot(mockCBootConfig, onStarted);
}
