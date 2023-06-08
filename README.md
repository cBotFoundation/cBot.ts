# bot.js
A comprehensive chatbot framework that integrates with numerous instant messaging platforms.


# Usage

Configure and startup example
```js

//Defines the command handler
const helloWorldCommandHanlder = (args: CommandCallbackArgs): void => {
  console.log('Command called: handler;', args.interaction);

  args.interaction.reply({ content: `Hello world command!!!`, ephemeral: true }); //discord specific remove...
};

//Define the command structure
const helloWorldCommand: Command = new Command(
  'hello-world',
  helloWorldCommandHanlder,
);

//Pass it to the bot
const mockCBootConfig: CBootConfig = {
  clientKey: 'client-key',
  clientId: 'client-id-discord',
  serverId: 'hadcoded-server-id',
  locale: 'en-US',
  theme: 'dark',
  commands: [helloWorldCommand]
};

  // Start the bot
  cBot.startBot((mockCBootConfig, args: OnStartedArgs) => {
    console.log("onStarted: Add Additional logic after the bot has started");
  });
```