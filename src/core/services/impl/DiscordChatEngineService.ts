// File: ChatEngineService.ts

import { Client, Intents, Interaction, Guild, GuildMember, Message } from 'discord.js'
import { DependencyManager } from '../../Dependency-manager'
import { Command } from '../../../models/Command'
import { CommandCallbackArgs } from '../../../models/CommandCallbackArgs'
import { IChatEngineService } from '../interfaces/IChatEngineService'
import { ButtonHandlerArgs } from '../../../models/ButtonHandlerArgs'
import { ILogger } from '../interfaces/ILogger'
import { XulLogger } from '../../utils/xul-logger'
import { CBootConfig } from '../../../models/CBootConfig'

export class DiscordChatEngineService implements IChatEngineService {
  private dependency: DependencyManager | undefined
  private startupConfig!: CBootConfig;
  private readonly client: Client
  private logger: ILogger
  private commands: Command[] = []

  constructor() {
    this.logger = new XulLogger() // TODO FETCH FROM CONFIG...
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })
  }

  initializeDiscordListeners(): void {
    // When the client is ready, run this code (only once)
    this.client.on('message', (message: Message) => {
      this.onMessage(message)
    })

    this.client.once('ready', () => {
      this.onReady()
    })

    this.client.on('guildCreate', (guild: Guild) => {
      this.onServerJoin(guild)
    })

    this.client.on('guildDelete', (guild: Guild) => {
      this.onServerKicked(guild)
    })

    this.client.on('interactionCreate', async (interaction: Interaction) => {
      return this.onInteractionCreate(interaction)
    })

    this.client.on('guildMemberAdd', (member: GuildMember) => {
      this.onMemberJoinedServer(member)
    })

    this.client.on('guildMemberAvailable', (member: GuildMember) => {
      this.onMemberAvailable(member)
    })

    this.client.on('guildBanAdd', (member: GuildMember) => {
      this.onMemberBanned(member)
    })

    this.client.on('guildBanRemove', (member: GuildMember) => {
      this.onMemberUnBanned(member)
    })

    this.client.on('onMemberLeave', (member: GuildMember) => {
      this.onMemberLeave(member)
    })

    this.client.on('warn', (member: GuildMember) => {
      this.onGeneralWarning(member)
    })

    this.client.on('error', (error: Error) => {
      this.onError(error)
    })
  }

  onReady() {
    this.logger.info("Discord bot ready =＾● ⋏ ●＾=")
  }

  onServerJoin(guild: GuildMember) {
    //TODO: IMPLEMENT DATABASE PERSISTENT STORAGE AND IMPLEMENT THE INVITED_SERVERS_TABLE!!!!
    this.logger.info(`Bot joined server: ${guild}`)
  }

  onServerKicked(guild: GuildMember) {
    this.logger.info(`bot kicked from server: ${guild}`)
  }

  onGeneralWarning(info: any) {
    this.logger.warn(`member connected:) :${info}`)
  }

  onMemberAvailable(member: GuildMember) {
    this.logger.info(`member connected:) :${member}`)
  }

  onMemberLeave(member: GuildMember) {
    this.logger.info(`member leaved or kicked:${member}`)
  }

  onMemberJoinedServer(member: GuildMember) {
    this.logger.info(`member joined:${member}`)
  }

  onMemberBanned(guildBan: GuildMember) {
    this.logger.warn(`member banned:${guildBan}`)
  }

  onMemberUnBanned(guildBan: GuildMember) {
    this.logger.warn(`member unbanned:${guildBan}, why?`)
  }

  onMessage(message: Message) {
    this.logger.info(`bot recived message: ${message}`)

    if (!message.author.bot) message.author.send('ok::::::' + message.author.id)
  }


  init(dependency: DependencyManager): void {

    this.dependency = dependency
    this.startupConfig = dependency.get('Config');
    this.logger = this.startupConfig.logger;

    //Initialize discord listeners
    this.initializeDiscordListeners()

    //Bot login: clientkey = process.env.BOT_TOKEN (required by discord)
    this.client.login(this.startupConfig.clientKey);
  }

  useCommands(commands: Command[]) {
    this.logger.warn(`Commands to use #: ${commands.length}`)
    this.commands = commands
  }

  // Implement the new methods from IChatEngineService interface.
  login(token: string): void {
    this.client.login(token)
  }

  logout(): void {
    this.client.destroy() // Assuming you want to destroy the client on logout.
  }

  sendMessage(channelId: string, message: string): void {
    const channel = this.client.channels.cache.get(channelId)
    if (channel?.isText()) {
      channel.send(message)
    }
  }

  handleCommand(interaction: Interaction) {
    // fix this...
    const command = this.commands.find(c => c.commandName === interaction.commandName)
    if (command) {
      const args: CommandCallbackArgs = { ...interaction, dependecy: this.dependency }
      command.callback(args)
    }
  }

  handleButton(interaction: Interaction) {
    // Get the id of the button interaction
    const buttonId = interaction.id
    const suspectUserId = interaction.user.id
    const owner = interaction.member?.user.id

    if (suspectUserId !== owner) {
      //TODO ADD A REPLY TO THE USER WHO DID THIS
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

  onInteractionCreate(interaction: Interaction): void {
    if (interaction.isCommand()) {
      this.handleCommand(interaction)
    } else if (interaction.isButton()) {
      this.handleButton(interaction)
    }
  }

  onError(error: any): void {
    this.logger.fatal(`Discord client error: ${error}`)
  }

  getClient(): Client {
    return this.client
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}
