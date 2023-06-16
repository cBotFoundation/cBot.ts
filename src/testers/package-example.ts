import { cBot } from '../cBot'
import { CBootConfig } from '../models/CBootConfig'
import { Command } from '../models/Command'
import { CommandCallbackArgs } from '../models/CommandCallbackArgs'
import { OnStartedArgs } from '../models/OnStartedArgs'
import { dBotButton } from '../widgets/dBotButton'
import { ButtonHandlerArgs } from '../models/ButtonHandlerArgs'
import { XulLogger } from '../core/utils/xul-logger'
import { env } from '../../env'
import { cMessage } from '../core/messages/messages.module'
import { DefaultTheme } from '../core/messages/api/cTheme'
import { YesOrNoAction } from '../core/messages/api/cAction'

//This is the example for the readme (update it first here then updated it in the README.md)
export function ReadmeHelloWorld () {

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
}