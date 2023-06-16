# Hello world example

```ts
// Configure command handlers
   const helloWorldCommandHandler = (args: CommandCallbackArgs): cMessage | void => {
      //Platform agnostic reply
      const message: cMessage = {
        theme: DefaultTheme,
        content: 'Hello world uwu',
        actions: YesOrNoAction
      }

      return message;
  }

  const helloWorldCommand: Command = new Command(
    'hello-world',
    'hello world command description :)',
    [],// No arguments for this example...
    helloWorldCommandHandler,
  )

  const myLogger = new XulLogger()

  const mockCBootConfig: CBootConfig = {
    port: env.PORT,
    deploy: env.RUN_COMMAND_DEPLOYER,
    clientKey: env.BOT_TOKEN,
    clientId: env.CLIENT_ID,
    serverId: env.GUILD_ID,
    useImplementations: ['MockImplementation1', 'MockImplementation2'],
    locale: 'en-US', // Assuming it's a locale string
    theme: 'dark', // Assuming it's a theme string, replace with actual dummy value
    commands: [helloWorldCommand], // Fill with actual dummy Commands
    logger: myLogger
  }

  // Define the callback function to handle the bot startup
  const onStarted = (args: OnStartedArgs) => {
    myLogger.info('onStarted: Add Additional logic after the bot has started')
  }

  // Start the bot
  cBot.startBot(mockCBootConfig, onStarted)

```
