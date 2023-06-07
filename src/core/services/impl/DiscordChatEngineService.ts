// File: ChatEngineService.ts

import { Client, Intents, Interaction, Guild, GuildMember, Message } from 'discord.js'
import { DependencyManager } from '../../Dependency-manager'
import { Command } from '../../../models/Command'
import { CommandCallbackArgs } from '../../../models/CommandCallbackArgs'
import { IChatEngineService } from '../interfaces/IChatEngineService'
import { ButtonHandlerArgs } from '../../../models/ButtonHandlerArgs'
import { ILogger } from '../interfaces/ILogger'
import { XulLogger } from '../../utils/xul-logger'

export class DiscordChatEngineService implements IChatEngineService {
  private dependency: DependencyManager | undefined
  private readonly client: Client
  private logger: ILogger
  private discord: any
  private readonly commands: Command[] = [] // get commands via config service!!!!

  constructor () {
    this.logger = new XulLogger()// TODO FETCH FROM CONFIG...
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })
    // this.login(process.env.BOT_TOKEN); TODO: FIX
  }

  init (dependency: DependencyManager): void {
    this.dependency = dependency
    this.logger = dependency.get('Config').GetLogger()
    this.discord = dependency.get('Discord')
    // this.commandHandlers = this.discord.getCommands();
  }

  // Implement the new methods from IChatEngineService interface.
  login (token: string): void {
    this.client.login(token)
  }

  logout (): void {
    this.client.destroy() // Assuming you want to destroy the client on logout.
  }

  sendMessage (channelId: string, message: string): void {
    const channel = this.client.channels.cache.get(channelId)
    if (channel?.isText()) {
      channel.send(message)
    }
  }

  joinVoiceChannel (channelId: string): void {
    // Logic to join voice channel...
  }

  onMessage (message: Message): void {
    this.logger.info(`Bot received message: ${message}`)
    if (!message.author.bot) {
      message.author.send('ok::::::' + message.author.id)
    }
  }

  onReady (): void {
    this.logger.info('Discord bot ready =＾● ⋏ ●＾=')
  }

  onServerJoin (guild: Guild): void {
    this.logger.info(`Bot joined server: ${guild}`)
  }

  onServerKicked (guild: Guild): void {
    this.logger.info(`Bot kicked from server: ${guild}`)
  }

  onGeneralWarning (info: any): void {
    this.logger.warn(`Member connected: ${info}`)
  }

  onMemberAvailable (member: GuildMember): void {
    this.logger.info(`Member connected: ${member}`)
  }

  onMemberLeave (member: GuildMember): void {
    this.logger.info(`Member left or kicked: ${member}`)
  }

  onMemberJoinedServer (member: GuildMember): void {
    this.logger.info(`Member joined: ${member}`)
  }

  onMemberBanned (member: GuildMember): void {
    this.logger.warn(`Member banned: ${member}`)
  }

  onMemberUnBanned (member: GuildMember): void {
    this.logger.warn(`Member unbanned: ${member}, why?`)
  }

  handleCommand (interaction: Interaction) {
    // fix this...
    // const command = this.commands.find(c => c.commandName === interaction.commandName);
    // if (command) {
    //   const args: CommandCallbackArgs = { ...interaction };
    //   command.callback(args);
    // }
  }

  handleButton (interaction: Interaction) {
    // Get the id of the button interaction
    const buttonId = interaction.id
    const suspectUserId = interaction.user.id
    const owner = interaction.member?.user.id

    if (suspectUserId !== owner) {
      this.logger.error('Some one preseed others buttons (interaction dismissed 😡)')
      return
    }

    // Loop over all commands
    for (const command of this.commands) {
      // Find the button with the matching id
      const button = command.buttons.find(b => b.id === buttonId)

      if (button != null) {
        const args: ButtonHandlerArgs = {
          ...interaction,
          ownerId: '',
          clientId: '',
          extra: {
            args: undefined
          }
        }
        button.handler(args)
        break // Exit the loop once we've found and handled the button
      }
    }
  }

  onInteractionCreate (interaction: Interaction): void {
    if (interaction.isCommand()) {
      this.handleCommand(interaction)
    } else if (interaction.isButton()) {
      this.handleButton(interaction)
    }
  }

  onError (error: any): void {
    this.logger.fatal(`Discord client error: ${error}`)
  }

  getClient (): Client {
    return this.client
  }

  async dispose (): Promise<void> {
    // Clean up resources
  }

  async interval (): Promise<void> {
    // Perform periodic tasks
  }
}
