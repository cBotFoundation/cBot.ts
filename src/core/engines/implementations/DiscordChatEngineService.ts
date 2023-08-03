import {
  Client,
  Interaction,
  Guild,
  GuildMember,
  Message,
  GuildBan,
  CacheType,
  CommandInteraction,
  RepliableInteraction, REST
} from 'discord.js'
import { ChatEngineService } from '../ChatEngineService'
import { Logger } from '../../services/interfaces/Logger'
import { assertDiscordProperties, cBootConfig } from '../../application/config/cBotConfig'
import { Command } from '../../commands/api/Command'
import DiscordMessageFactory from '../../messages/factory/DiscordMessageFactory'
import { CoreEventsType } from '../../services/models/CoreEvents'
import { Routes, GatewayIntentBits } from 'discord-api-types/v9'
import { CommandCallbackArgs } from '../../commands/api/CommandCallbackArgs'
import { cMessage } from '../../messages/messages.module'

import ApplicationContext from '../../application/ApplicationContext'
import buildDiscordSlashCommand from '../../commands/builders/DiscordCommandBuilder'

export class DiscordChatEngineService implements ChatEngineService {
  // FRAMEWORK
  public readonly name = 'DiscordChatEngine'
  private applicationContext!: ApplicationContext
  private logger!: Logger
  private bootConfig!: cBootConfig
  // DISCORD
  private readonly discordClient: Client
  private readonly messageFactory: DiscordMessageFactory
  // Events
  private readonly underlyingEvents: Map<CoreEventsType, (args: any) => void> // Discord implemented events
  private readonly clientFrameWorkEvents: Map<CoreEventsType, (args: any) => void> // User level events
  private readonly commands: Command[] = []

  constructor () {
    this.messageFactory = new DiscordMessageFactory()

    this.underlyingEvents = new Map<CoreEventsType, (args: any) => void>()
    this.clientFrameWorkEvents = new Map<CoreEventsType, (args: any) => void>()

    // Initialize DISCORD client
    this.discordClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
    })
  }

  eventCall (eventName: CoreEventsType, args: any | null): void {
    try {
      const coreEvent = this.underlyingEvents.get(eventName)
      const clientEvent = this.clientFrameWorkEvents.get(eventName)

      if (coreEvent != null) {
        coreEvent(args)

        if (clientEvent != null) {
          clientEvent(args)
        }
      } else {
        this.logger.warn(`Current platform is receiving [${eventName}] event but is not implemented on: [underlyingEvents], this might be an error or an un-implemented case.`)
      }
    } catch (error) {
      let message = 'Unknown Error'
      if (error instanceof Error) message = error.message
      this.logger.fatal(`Event call [${eventName}] exception ${message}`)
    }
  }

  initializeDiscordListeners (): void {
    // TODO: REMOVE ANY AND USE TYPES XD

    // When the client is ready, run this code (only once)
    this.discordClient.on('message', (message: Message) => {
      this.eventCall('message', null)
    })

    this.discordClient.once('ready', () => {
      this.eventCall('ready', null)
    })

    this.discordClient.on('guildCreate', (guild: any) => {
      this.eventCall('server-join', guild)
    })

    this.discordClient.on('guildDelete', (guild: any) => {
      this.eventCall('server-kicked', guild)
    })

    this.discordClient.on('interactionCreate', async (interaction: any) => {
      this.eventCall('interaction-create', interaction)
    })

    this.discordClient.on('guildMemberAdd', (member: any) => {
      this.eventCall('on-member-joined', member)
    })

    this.discordClient.on('guildMemberAvailable', (member: any) => {
      this.eventCall('on-member-available', member)
    })

    this.discordClient.on('guildBanAdd', (member: any) => {
      this.eventCall('on-member-banned', member)
    })

    this.discordClient.on('guildBanRemove', (member: any) => {
      this.eventCall('on-member-ban-removed', member)
    })

    this.discordClient.on('onMemberLeave', (member: any) => {
      this.eventCall('on-member-leave', member)
    })

    this.discordClient.on('warn', (warn: any) => {
      this.eventCall('warn', warn)
    })

    this.discordClient.on('error', (error: any) => {
      this.eventCall('error', error)
    })
  }

  registerEvents (): void {
    // TODO: MOVE THIS TO ANOTHER FILE AND MAKE AN ISSUE TO SPLIT THIS LOGIC (IMPORTANT!!!)
    const eventMethodMap: Record<CoreEventsType, Function> = {
      message: this.onMessage,
      ready: this.onReady,
      'server-join': this.onServerJoin,
      'server-kicked': this.onServerKicked,
      'interaction-create': this.onInteractionCreate,
      'on-member-joined': this.onMemberJoinedServer,
      'on-member-leave': this.onMemberLeave,
      'on-member-available': this.onMemberAvailable,
      'on-member-banned': this.onMemberBanned,
      'on-member-ban-removed': this.onMemberUnBanned,
      warn: this.onGeneralWarning,
      error: this.onError
    }

    // Iterate over eventMethodMap and set the underlying events
    for (const [event, method] of Object.entries(eventMethodMap)) {
      this.underlyingEvents.set(event as CoreEventsType, method.bind(this))
    }
  }

  onReady (): void {
    this.logger.info('Discord bot ready (=＾● ⋏ ●＾=)')
  }

  onServerJoin (guild: Guild): void {
    // TODO: IMPLEMENT DATABASE PERSISTENT STORAGE AND IMPLEMENT THE INVITED_SERVERS_TABLE!!!!
    this.logger.info(`Bot joined server: #${guild.id} - ${guild.name}`)
  }

  onServerKicked (guild: Guild): void {
    this.logger.info(`bot kicked from server: #${guild.id} - ${guild.name}`)
  }

  onGeneralWarning (info: string): void {
    this.logger.warn(`member connected :) :${info}`)
  }

  onMemberAvailable (member: GuildMember): void {
    this.logger.info(`member connected:) : ${member.user.id}`)
  }

  onMemberLeave (member: GuildMember): void {
    this.logger.info(`member ${member.user.id} left ${member.guild.id}`)
  }

  onMemberJoinedServer (member: GuildMember): void {
    this.logger.info(`member ${member.user.id} joined ${member.guild.id}`)
  }

  onMemberBanned (guildBan: GuildBan): void {
    this.logger.warn(`member ${guildBan.user.id} banned from ${guildBan.guild.id}`)
  }

  onMemberUnBanned (guildBan: GuildBan): void {
    this.logger.warn(`member ${guildBan.user.id} unbanned from ${guildBan.guild.id}, why?`)
  }

  onMessage (message: Message): void {
    this.logger.info(`bot received message: #${message.id} - from ${message.author.id}`)

    if (!message.author.bot) {
      void message.author.send('ok::::::' + message.author.id)
    }
  }

  async handleCommand (interaction: CommandInteraction): Promise<void> {
    const command = this.commands.find(c => c.name === interaction.commandName)

    if (command == null) {
      this.logger.error('Command not found')
      throw new Error('Command not found')
    }

    const args: CommandCallbackArgs = { interaction, dependency: this.applicationContext }
    const reply = command.callback(args)

    if (reply == null) return // continue if handle has a message to send

    void this.replyMessage(interaction, reply)
  }

  async replyMessage (origin: CommandInteraction | RepliableInteraction, message: cMessage): Promise<void> {
    const embed = this.messageFactory.createMessage(message)
    const pendingResponse = await origin.reply(embed) // todo: check if reply fails

    if (message.actions.length === 0) return // continue if message has actions to be interacted with

    try {
      const response = await pendingResponse.awaitMessageComponent({ time: 10000 })

      for (const action of message.actions) {
        const suspectUserId = response.user.id
        const owner = response.member?.user.id
        const isInteractive = action.onlyOwnerInteraction ? suspectUserId === owner : true

        if (response.customId === action.name && isInteractive) {
          // TODO: Pass context to callback for further communication
          action.actionCall({ dependency: this.applicationContext, context: origin })
          await origin.editReply({ components: [] })
        }
      }
    } catch (e) {
      this.logger.error('Pending response exception:')

      // TODO: VERIFY IF SENDING AN EXCEPTION ACROSS ALL ACTIONS IS NEEDED
      //    | RE: We can inform the caller about errors sending message and
      //    | receiving responses. This way cAction only represents the platforms'
      //    | buttons and the reaction to them.
      // for (const action of message.actions) {
      //   if (action.exception != null) {
      //     action.exception(e)
      //   }
      // }

      await origin.editReply({ components: [], content: 'timeout...' })
    }
  }

  sendMessage (channelId: string, message: cMessage): void {
    throw new Error('Not Implemented')
  }

  onInteractionCreate (interaction: Interaction<CacheType>): void {
    this.logger.warn(`Interaction received: ${interaction.id}`)
    if (interaction.isCommand()) {
      void this.handleCommand(interaction)
    }
  }

  onError (error: any): void {
    let message = 'Unknown error'
    if (error instanceof Error) message = error.message
    this.logger.fatal(`Discord client error: ${message}`)
  }

  getClient (): Client {
    return this.discordClient
  }

  isChatEventImplemented (eventName: CoreEventsType): boolean {
    return this.underlyingEvents.get(eventName) !== undefined
  }

  onChatEvent (eventName: CoreEventsType, on: (args: any) => void): void {
    if (this.underlyingEvents.get(eventName) != null) {
      this.clientFrameWorkEvents.set(eventName, on)
    } else {
      this.logger.fatal(`Chat event [${eventName}] is not implemented on the current platform [DISCORD]`)
    }
  }

  init (applicationContext: ApplicationContext): void {
    // Get logger and boot config
    this.applicationContext = applicationContext
    this.logger = this.applicationContext.getLogger()
    this.bootConfig = this.applicationContext.getConfiguration()
    assertDiscordProperties(this.bootConfig)

    // Register core events
    this.registerEvents()
    // Initialize discord listeners
    this.initializeDiscordListeners()

    if (this.bootConfig.commands != null) {
      // Deploy commands
      void this.deployCommands(this.bootConfig.commands)
    }

    // Bot login: clientkey = process.env.BOT_TOKEN (required by discord)
    this.discordClient.login(this.bootConfig.discordClientKey).catch((res: string) => {
      this.logger.error(`Bot couldn't log in: ${res}`)
    })
  }

  async deployCommands (commands: Command[]): Promise<void> {
    try {
      assertDiscordProperties(this.bootConfig)
      this.logger.info('Starting to deploy application commands.')

      this.commands.push(...commands)
      const deployCommands = commands?.map((cmd) => {
        return buildDiscordSlashCommand(cmd).toJSON()
      })

      const rest = new REST({ version: '8' }).setToken(this.bootConfig.discordClientKey)
      await rest.put(Routes.applicationGuildCommands(this.bootConfig.discordClientId, this.bootConfig.discordServerId),
        { body: deployCommands })

      this.logger.info('Successfully reloaded application (/) commands.')
    } catch (error) {
      let message = 'Unknown'
      if (error instanceof Error) message = error.message
      this.logger.error(`Cannot deploy commands due: ${message}`)
    }
  }

  async dispose (): Promise<void> {
    // Clean up resources
  }

  async interval (): Promise<void> {
    // Perform periodic tasks
  }
}
