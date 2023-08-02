import '../utils/env'

// Framework imports (TODO: REFACTOR IMPORTS TO MAKE THIS SMALLER)
import { startBot } from '../cBot'
import { cBootConfig } from '../core/config/models/cBotConfig'
import { DefaultTheme } from '../core/messages/api/cTheme'
import { cMessage } from '../core/messages/messages.module'
import { YesOrNoAction } from '../core/messages/api/cAction'
import cActionContext from '../core/messages/api/cActionContext'
import { Command } from '../core/commands/api/Command'
import { CommandCallbackArgs } from '../core/commands/api/CommandCallbackArgs'

// Optional imports
import { XulLogger } from '../utils/xul-logger'

// This is the example for the readme (update it first here then updated it in the README.md)
export function ReadmeHelloWorld (): void {
  const myLogger = new XulLogger()

  // Configure command handlers
  const helloWorldCommandHandler = (args: CommandCallbackArgs): cMessage => {
    // Platform-agnostic reply
    return {
      theme: DefaultTheme,
      content: 'Hello world =＾● ⋏ ●＾=',
      actions: YesOrNoAction(
        (payload: cActionContext) => {
          myLogger.info('Yes Clicked')
        },
        (payload: cActionContext) => {
          myLogger.info('No Clicked')
        }
      )
    }
  }

  const helloWorldCommand: Command = {
    name: 'hello-world',
    description: 'hello world command description :)',
    arguments: [], // No arguments for this example...
    callback: helloWorldCommandHandler
  }

  const mockCBootConfig: cBootConfig = {
    port: 8080,
    deploy: true,
    clientKey: process.env.DISCORD_BOT_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    serverId: process.env.DISCORD_GUILD_ID,
    commands: [helloWorldCommand], // Fill with actual dummy Commands
    logger: myLogger
  }

  // Define the callback function to handle the bot startup
  const onStarted = (error: any): void => {
    if (error != null) {
      myLogger.error(error)
    }
    myLogger.info('onStarted: Add Additional logic after the bot has started')
  }

  // Start the bot
  startBot(mockCBootConfig, onStarted)
}
