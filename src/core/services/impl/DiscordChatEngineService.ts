// File: ChatEngineService.ts

import { Client, Interaction, Guild, GuildMember, Message, GuildBan, CacheType, CommandInteraction, RepliableInteraction } from 'discord.js'
import { DependencyManager } from '../../Dependency-manager'
import { Command } from '../../../models/Command'
import { CommandCallbackArgs } from '../../../models/CommandCallbackArgs'
import { IChatEngineService } from '../interfaces/IChatEngineService'
import { ButtonHandlerArgs } from '../../../models/ButtonHandlerArgs'
import { ILogger } from '../interfaces/ILogger'
import { XulLogger } from '../../utils/xul-logger'
import { CBootConfig } from '../../../models/CBootConfig'
import { GatewayIntentBits } from 'discord-api-types/v9'
import DiscordMessageFactory from '../../messages/factory/impl/DiscordMessageFactory'
import { cMessage } from '../../messages/messages.module'

export class DiscordChatEngineService implements IChatEngineService {
  private dependency: DependencyManager | undefined
  private bootConfig!: CBootConfig
  private readonly client: Client
  private logger: ILogger
  private commands: Command[] = []
  private messageFactory: DiscordMessageFactory

  constructor() {
    this.logger = new XulLogger() // TODO FETCH FROM CONFIG...
    this.messageFactory = new DiscordMessageFactory()
    //Initialize DISCORD client
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
    }) 
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

    this.client.on('interactionCreate', async (interaction) => {
      return this.onInteractionCreate(interaction)
    })

    this.client.on('guildMemberAdd', (member) => {
      this.onMemberJoinedServer(member)
    })

    this.client.on('guildMemberAvailable', (member) => {
      this.onMemberAvailable(member as GuildMember)
    })

    this.client.on('guildBanAdd', (member) => {
      this.onMemberBanned(member)
    })

    this.client.on('guildBanRemove', (member) => {
      this.onMemberUnBanned(member)
    })

    this.client.on('onMemberLeave', (member) => {
      this.onMemberLeave(member)
    })

    this.client.on('warn', (member) => {
      this.onGeneralWarning(member)
    })

    this.client.on('error', (error: Error) => {
      this.onError(error)
    })
  }

  onReady() {
    this.logger.info("Discord bot ready =＾● ⋏ ●＾=")
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


  init(dependency: DependencyManager): void {

    this.dependency = dependency
    this.bootConfig = dependency.getConfiguration()
    this.logger = this.bootConfig.logger

    //Initialize discord listeners
    this.initializeDiscordListeners()

    //Bot login: clientkey = process.env.BOT_TOKEN (required by discord)
    this.client.login(this.bootConfig.clientKey)
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

  async handleCommand(interaction: CommandInteraction) {
    const command = this.commands.find(c => c.commandName === interaction.commandName)
    
    if (!command) {
      this.logger.error('Command not found')
      throw new Error('Command not found')
    }

    const args: CommandCallbackArgs = { interaction, dependency: this.dependency }
    const reply = command.callback(args)

    
    if (!reply) return // continue if handle has a message to send

    this.replyMessage(interaction, reply)    
  }

  // we should get rid of this function
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
      const button = null //command.buttons.find(b => b.id === buttonId)

      if (button != null) {
        const args: ButtonHandlerArgs = {
          ...interaction,
          ownerId: '',
          clientId: '',
          extra: {
            args: undefined
          }
        }
        //button.handler(args)
        break // Exit the loop once we've found and handled the button
      }
    }
  }

  // TODO: Check why CommandInteraction is not a RepliableInteraction
  async replyMessage(origin: CommandInteraction | RepliableInteraction, message: cMessage): Promise<void> {
    const embeding = this.messageFactory.createMessage(message)
    const pendingResponse = await origin.reply(embeding) 

    if (message.actions.length == 0) return // continue if message has actions to be interacted with
   
    const response = await pendingResponse.awaitMessageComponent() // TODO: Add timeouts & filter to button interactions

    message.actions.forEach((action) => {
      if (response.customId == action.name) {
        action.callback(origin) // TODO: Pass context to callback for further communication
      }
    })
  }

  sendMessage(channelId: string, message: cMessage): void {
    throw new Error('Not Implemented')
  }

  onInteractionCreate(interaction: Interaction<CacheType>): void {
    this.logger.warn('Interaction recived:'+ interaction)
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
