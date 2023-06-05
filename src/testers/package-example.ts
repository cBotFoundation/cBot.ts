import { cBot } from './cBot';

// Define the initialization arguments
const initArgs = {
  // Fill in the necessary initialization arguments
};

// Define the callback function to handle the bot startup
const onStarted = (args: OnStartedArgs) => {
  console.log(`Bot started at ${args.port}`);
  // Additional logic after the bot has started
};

// Start the bot
cBot.startBot(initArgs, onStarted);