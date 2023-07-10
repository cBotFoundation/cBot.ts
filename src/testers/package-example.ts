// Framework imports (TODO: REFACTOR IMPORTS TO MAKE THIS SMALLER)
import { cBot } from '../cBot'
import { cBootConfig } from '../api/cBotConfig'
import { DefaultTheme } from '../core/messages/api/cTheme'
import { cMessage } from '../core/messages/messages.module'
import { YesOrNoAction } from '../core/messages/api/cAction'
import cActionContext from '../core/messages/api/cActionContext'
import { Command } from '../core/commands/api/Command'
import { CommandCallbackArgs } from '../core/commands/api/CommandCallbackArgs'
import { OnStartedArgs } from '../api/OnStartedArgs'

// Optional imports
import { env } from '../../env'
import { XulLogger } from '../core/utils/xul-logger'

// This is the example for the readme (update it first here then updated it in the README.md)
export function ReadmeHelloWorld () {
  const myLogger = new XulLogger()

  // Configure command handlers
  const helloWorldCommandHandler = (args: CommandCallbackArgs): cMessage | void => {
    // Platform agnostic reply
    const message: cMessage = {
      theme: DefaultTheme,
      content: 'Hello world =＾● ⋏ ●＾=',
      actions: YesOrNoAction(
        (payload: cActionContext) => { myLogger.info(`Yes Clicked ${payload.dependency?.get('BotApp')}`) },
        (payload: cActionContext) => { myLogger.info('No Clicked') }
      )
    }

    return message
  }

  const helloWorldCommand: Command = {
    name: 'hello-world',
    description: 'hello world command description :)',
    arguments: [], // No arguments for this example...
    callback: helloWorldCommandHandler
  }

  const mockCBootConfig: cBootConfig = {
    port: env.PORT,
    deploy: env.RUN_COMMAND_DEPLOYER,
    clientKey: env.BOT_TOKEN,
    clientId: env.CLIENT_ID,
    serverId: env.GUILD_ID,
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
