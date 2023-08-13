import ChatEngineService from '../ChatEngineService'
import ApplicationContext from '../../application/ApplicationContext'
import { CoreEventsType } from '../../services/models/CoreEvents'
import cMessage from '../../messages/api/cMessage'
import { Command } from '../../commands/api/Command'
import { assertTelegramProperties } from '../../application/config/cBotConfig'
import { Bot } from 'grammy'
import { CommandCallbackArgs, PlatformCommandContext } from '../../commands/api/CommandCallbackArgs'

export default class TelegramChatEngineService extends ChatEngineService {
  public readonly name = 'TelegramChatEngine'
  private bot!: Bot

  async dispose (): Promise<void> {
    return undefined
  }

  init (appContext: ApplicationContext): symbol {
    const initCheck = super.init(appContext)
    this.configuration = appContext.getConfiguration()
    assertTelegramProperties(this.configuration)
    this.bot = new Bot(this.configuration.telegramToken)

    if (this.configuration.commands != null) {
      this.deployCommands(this.configuration.commands)
    }
    this.logger.info('TELEGRAM BOT READY')
    void this.bot.start()
    return initCheck
  }

  interval (): void {
  }

  isChatEventImplemented (eventName: CoreEventsType): boolean {
    return false
  }

  onChatEvent (eventName: CoreEventsType, on: (args: any) => void): void {
  }

  replyMessage (origin: any, message: cMessage): void {
    // Todo: something like discord embeds using formatting options supported by telegram
    origin.reply(message.content)
  }

  sendMessage (channelId: string, message: cMessage): void {

  }

  deployCommands (commands: Command[]): void {
    this.commands.push(...commands)
    commands.forEach(command => {
      this.bot.command(command.name, async ctx => await this.handleCommand(command.name, ctx))
    })
    this.logger.info('SUCCESSFULLY DEPLOYED COMMANDS ON TELEGRAM')
  }
}
