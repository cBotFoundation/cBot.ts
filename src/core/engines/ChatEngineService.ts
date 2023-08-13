import { Command } from '../commands/api/Command'
import { cMessage } from '../messages/messages.module'
import { CoreEventsType } from '../services/models/CoreEvents'
import Service from '../services/interfaces/Service'
import { CommandCallbackArgs, PlatformCommandContext } from '../commands/api/CommandCallbackArgs'
import { Logger } from '../services/interfaces/Logger'
import ApplicationContext from '../application/ApplicationContext'
import { cBootConfig } from '../application/config/cBotConfig'

// TODO: CREATE ALL ARGUMENTS AS REGISTRABLE LAMDAS
export default abstract class ChatEngineService implements Service {
  private static readonly callSuperInit = Symbol('Calling super.init first is mandatory')

  abstract deployCommands (commands: Command[]): void
  abstract replyMessage (origin: any, message: cMessage): void
  abstract sendMessage (channelId: string, message: cMessage): void
  abstract isChatEventImplemented (eventName: CoreEventsType): boolean
  abstract onChatEvent (eventName: CoreEventsType, on: (args: any) => void): void
  abstract dispose (): Promise<void>

  // TODO: See if this can be implemented to do nothing in order to make chat engines ignore interval
  abstract interval (): void

  protected commands: Command[] = []
  protected logger!: Logger
  protected applicationContext!: ApplicationContext
  protected configuration!: cBootConfig
  abstract name: string

  async handleCommand (commandName: string, interaction: PlatformCommandContext): Promise<void> {
    const command = this.commands.find(c => c.name === commandName)

    if (command == null) {
      this.logger.error('Command not found')
      throw new Error('Command not found')
    }

    const args: CommandCallbackArgs = { interaction, dependency: this.applicationContext }
    const reply = command.callback(args)

    if (reply == null) return // continue if handle has a message to send

    void this.replyMessage(interaction, reply)
  }

  init (applicationContext: ApplicationContext): symbol {
    // Get logger and boot config
    this.applicationContext = applicationContext
    this.logger = this.applicationContext.getLogger()
    this.configuration = this.applicationContext.getConfiguration()

    return ChatEngineService.callSuperInit
  }
}
