// File: ChatEngineService.ts
import { Client, Interaction, Guild, GuildMember, Message, GuildBan, CacheType, CommandInteraction, RepliableInteraction } from 'discord.js'
import { IChatEngineService } from './interfaces/IChatEngineService'
import { DependencyManager } from '../Dependency-manager'
import { ILogger } from './interfaces/ILogger'
import { cBootConfig } from '../../api/cBotConfig'
import { Command } from '../commands/api/Command'
import DiscordMessageFactory from '../messages/factory/DiscordMessageFactory'
import { CoreEventsType } from './models/CoreEvents'
import { XulLogger } from '../utils/xul-logger'
import { CommandCallbackArgs } from '../commands/api/CommandCallbackArgs'
import { cMessage } from '../messages/messages.module'
import { GatewayIntentBits } from 'discord-api-types/v9'

export class DiscordChatEngineService implements IChatEngineService {
  // FRAMEWORK
  private dependency: DependencyManager | undefined
  private logger: ILogger
  private bootConfig!: cBootConfig
  private commands: Command[] = []
  // DISCORD
  private readonly discordClient: Client
  private messageFactory: DiscordMessageFactory
  // Events
  private underlyingEvents: Map<CoreEventsType, (args: any) => void> // Discord implemented events
  private clientFrameWorkEvents: Map<CoreEventsType, (args: any) => void>       // User level events

  constructor() {
    this.logger = new XulLogger() // TODO: WIP INSTANCE
    this.messageFactory = new DiscordMessageFactory()

    this.underlyingEvents = new Map<CoreEventsType, (args: any) => void>()
    this.clientFrameWorkEvents = new Map<CoreEventsType, (args: any) => void>()

    //Initialize DISCORD client
    this.discordClient = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
    })
  }

  eventCall(eventName: CoreEventsType, args: any | null) {
    try {
      const coreEvent = this.underlyingEvents.get(eventName)
      const clientEvent = this.clientFrameWorkEvents.get(eventName)

      if (coreEvent) {
        coreEvent(args)

        if (clientEvent) {
          clientEvent(args)
        }
      } else {
        this.logger.warn(`Current platform is reciving [${eventName}] event but is not implemented on: [underylingEvents], this might be an error or an un-implemented case.`)
      }
    } catch (error) {
      this.logger.fatal(`Event call [${eventName}] exception ${error}`)
    }
  }

  initializeDiscordListeners(): void {
    //TODO: REMOVE ANY AND USE TYPES XD

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

  registerEvents() {
    //TODO: MOVE THIS TO ANOTHER FILE AND MAKE AN ISSUE TO SPLIT THIS LOGIC (IMPORTANT!!!)
    const eventMethodMap: Record<CoreEventsType, Function> = {
      'message': this.onMessage,
      'ready': this.onReady,
      'server-join': this.onServerJoin,
      'server-kicked': this.onServerKicked,
      'interaction-create': this.onInteractionCreate,
      'on-member-joined': this.onMemberJoinedServer,
      'on-member-leave': this.onMemberLeave,
      'on-member-available': this.onMemberAvailable,
      'on-member-banned': this.onMemberBanned,
      'on-member-ban-removed': this.onMemberUnBanned,
      'warn': this.onGeneralWarning,
      'error': this.onError,
    }

    // Iterate over eventMethodMap and set the underlying events
    for (const [event, method] of Object.entries(eventMethodMap)) {
      this.underlyingEvents.set(event as CoreEventsType, method.bind(this))
    }
  }

  onReady() {
    this.logger.info("Discord bot ready (=＾● ⋏ ●＾=)")
  }

  onServerJoin(guild: Guild) {
    //TODO: IMPLEMENT DATABASE PERSISTENT STORAGE AND IMPLEMENT THE INVITED_SERVERS_TABLE!!!!
    this.logger.info(`Bot joined server: ${guild}`)
  }

  onServerKicked(guild: Guild) {
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

  onMemberBanned(guildBan: GuildBan) {
    this.logger.warn(`member banned:${guildBan}`)
  }

  onMemberUnBanned(guildBan: GuildBan) {
    this.logger.warn(`member unbanned:${guildBan}, why?`)
  }

  onMessage(message: Message) {
    this.logger.info(`bot recived message: ${message}`)

    if (!message.author.bot) message.author.send('ok::::::' + message.author.id)
  }

  useCommands(commands: Command[]) {
    this.logger.warn(`Commands to use #: ${commands.length}`)
    this.commands = commands
  }

  login(token: string): void {
    this.logger.warn(`Authenticating discord client...`)
    this.discordClient.login(token)
  }

  logout(): void {
    this.discordClient.destroy()
  }

  async handleCommand(interaction: CommandInteraction) {
    const command = this.commands.find(c => c.name === interaction.commandName)

    if (!command) {
      this.logger.error('Command not found')
      throw new Error('Command not found')
    }

    const args: CommandCallbackArgs = { interaction, dependency: this.dependency }
    const reply = command.callback(args)

    if (!reply) return // continue if handle has a message to send

    this.replyMessage(interaction, reply)
  }

  async replyMessage(origin: CommandInteraction | RepliableInteraction, message: cMessage): Promise<void> {
    const embeding = this.messageFactory.createMessage(message)
    const pendingResponse = await origin.reply(embeding)

    if (message.actions.length == 0) return // continue if message has actions to be interacted with

    try {
      const response = await pendingResponse.awaitMessageComponent({ time: 10000 })

      message.actions.forEach(async (action) => {
        const suspectUserId = response.user.id
        const owner = response.member?.user.id
        const isInteractible = action.onlyOwnerInteraction ? suspectUserId == owner : true

        if (response.customId == action.name && isInteractible) {
          // TODO: Pass context to callback for further communication
          action.callback({ dependency: this.dependency, context: origin })
          await origin.editReply({ components: [] })
        }
      })

    } catch (e) {
      this.logger.error('Pending response exception:')

      //TODO: VERIFY IF SENDING AN EXCEPTION ACROSS ALL ACTIONS IS NEEDED
      message.actions.forEach(async (action) => {
        if (action.exception) {
          action.exception(e)
        }
      })

      await origin.editReply({ components: [], content: "timeout..." })
    }
  }

  sendMessage(channelId: string, message: cMessage): void {
    throw new Error('Not Implemented')
  }

  onInteractionCreate(interaction: Interaction<CacheType>): void {
    this.logger.warn('Interaction recived:' + interaction)
    if (interaction.isCommand()) {
      this.handleCommand(interaction)
    }
  }

  onError(error: any): void {
    this.logger.fatal(`Discord client error: ${error}`)
  }

  getClient(): Client {
    return this.discordClient
  }

  isChatEventImplemented(eventName: CoreEventsType) {
    return this.underlyingEvents.get(eventName) !== undefined
  }

  onChatEvent(eventName: CoreEventsType, on: (args: any) => void) {
    if (this.underlyingEvents.get(eventName)) {
      this.clientFrameWorkEvents.set(eventName, on)
    } else {
      this.logger.fatal(`Chat event [${eventName}] is not implemented on the current platform [DISCORD]`)
    }
  }

  // IService
  init(dependency: DependencyManager): void {
    // Get logger and boot config
    this.dependency = dependency
    this.bootConfig = dependency.getConfiguration()
    this.logger = this.bootConfig.logger

    // Register core events
    this.registerEvents()
    // Initialize discord listeners
    this.initializeDiscordListeners()

    //Bot login: clientkey = process.env.BOT_TOKEN (required by discord)
    this.discordClient.login(this.bootConfig.clientKey)
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}
