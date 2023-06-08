import { cBot } from '../cBot'
import { CBootConfig } from '../models/CBootConfig'
import { Command } from '../models/Command'
import { CommandCallbackArgs } from '../models/CommandCallbackArgs'
import { OnStartedArgs } from '../models/OnStartedArgs'
import { dBotButton } from '../widgets/dBotButton'
import { ButtonHandlerArgs } from '../models/ButtonHandlerArgs'
import { XulLogger } from '../core/utils/xul-logger'
import { Message } from 'discord.js'

// Main Example usage
export function cBotPackageTest () {
  // Configure command handlers
  const helloWorldCommandHanlder = (args: CommandCallbackArgs): void => {
    console.log('Command called: handler;', args.interaction)
    // XANAX: todo: return the main UI command body as platform specific
    args.interaction.channel?.send('Hello world')
  }

  // Configure actions on the command like buttons (emojis or platform implemented)
  const waveButton = new dBotButton(
    'my-unique-id', // ID
    'wave-action', // Handler name
    'Wave back!!! =3', // Button display text
    (args: ButtonHandlerArgs) => {
      console.log('waveButton clicked!')
      console.log('Args:', args)
      // todo: return propper ui widgets to reply to the user....
    },
    false // if true only the command owner can interact with this button
  )

  const ownerOnlyButton = new dBotButton(
    'my-unique-id-2', // ID
    'owner-action-only', // Handler name
    'click-me', // Button display text
    (args: ButtonHandlerArgs) => {
      console.log('ownerOnlyButton clicked!')
      console.log('Args:', args)
      // todo: return propper ui widgets to reply to the user....
    },
    true // if true only the command owner can interact with this button
  )

  const helloWorldCommand: Command = new Command(
    'hello-world',
    'hello world command description :)',
    [],// No arguments for this example...
    [waveButton, ownerOnlyButton],
    helloWorldCommandHanlder,
  )

  const myLogger = new XulLogger()

  const mockCBootConfig: CBootConfig = {
    port: 6942,
    deploy: true,
    clientKey: 'dont-leak-your-bot-api-key',
    clientId: 'client-id',
    serverId: 'server-id',
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
