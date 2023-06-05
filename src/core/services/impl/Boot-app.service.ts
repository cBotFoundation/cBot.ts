import { Client, Intents, Interaction, Guild, GuildMember, Message } from 'discord.js';
import { DependencyManager } from '../../Dependency-manager';
import { IService } from '../IService';


class BotAppService implements IService {
  private dependency: DependencyManager | undefined;
  private buttonHandlers: Map<string, (interaction: Interaction, dependency: DependencyManager | undefined) => Promise<void>>;
  private client: Client;
  private logger: any;
  private discord: any;
  private commandHandlers: any;

  constructor() {
    this.buttonHandlers = new Map();
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
  }

  async init(dependency: DependencyManager): Promise<void> {
    this.dependency = dependency;
    this.logger = dependency.get("Logger");
    this.discord = dependency.get("Discord");
    this.commandHandlers = this.discord.getCommands();

    this.client.on('message', (message: Message) => {
      this.onMessage(message);
    });

    this.client.once('ready', () => {
      this.onReady();
    });

    this.client.on('guildCreate', (guild: Guild) => {
      this.onServerJoin(guild);
    });

    this.client.on('guildDelete', (guild: Guild) => {
      this.onServerKicked(guild);
    });

    this.client.on('interactionCreate', async (interaction: Interaction) => {
      await this.onInteractionCreate(interaction);
    });

    this.client.on('guildMemberAdd', (member: GuildMember) => {
      this.onMemberJoinedServer(member);
    });

    this.client.on('guildMemberAvailable', (member: GuildMember) => {
      this.onMemberAvailable(member);
    });

    this.client.on('guildBanAdd', (member: GuildMember) => {
      this.onMemberBanned(member);
    });

    this.client.on('guildBanRemove', (member: GuildMember) => {
      this.onMemberUnBanned(member);
    });

    this.client.on('guildMemberRemove', (member: GuildMember) => {
      this.onMemberLeave(member);
    });

    this.client.on('warn', (info: any) => {
      this.onGeneralWarning(info);
    });

    this.client.on('error', (error: any) => {
      this.onError(error);
    });

    this.client.login(process.env.BOT_TOKEN);
  }

  onReady(): void {
    this.logger.info("Discord bot ready =＾● ⋏ ●＾=");
  }

  onError(error: any): void {
    this.logger.fatal(`Discord client error: ${error}`);
  }

  onServerJoin(guild: Guild): void {
    this.logger.info(`Bot joined server: ${guild}`);
  }

  onServerKicked(guild: Guild): void {
    this.logger.info(`Bot kicked from server: ${guild}`);
  }

  onGeneralWarning(info: any): void {
    this.logger.warn(`Member connected: ${info}`);
  }

  onMemberAvailable(member: GuildMember): void {
    this.logger.info(`Member connected: ${member}`);
  }

  onMemberLeave(member: GuildMember): void {
    this.logger.info(`Member left or kicked: ${member}`);
  }

  onMemberJoinedServer(member: GuildMember): void {
    this.logger.info(`Member joined: ${member}`);
  }

  onMemberBanned(guildBan: GuildMember): void {
    this.logger.warn(`Member banned: ${guildBan}`);
  }

  onMemberUnBanned(guildBan: GuildMember): void {
    this.logger.warn(`Member unbanned: ${guildBan}, why?`);
  }

  onMessage(message: Message): void {
    this.logger.info(`Bot received message: ${message}`);

    if (!message.author.bot) {
      message.author.send('ok::::::' + message.author.id);
    }
  }

  async onInteractionCreate(interaction: Interaction): Promise<void> {
    this.logger.warn("Command interaction id: " + interaction);

    if (interaction.isCommand()) {
      await this.onCommandInteraction(interaction);
    } else if (interaction.isButton()) {
      await this.onButtonInteraction(interaction);
    } else {
      this.logger.fatal(`Interaction not implemented`);
      await interaction.reply({ content: 'What?!!! Someone just broke the bot. SMH', ephemeral: false });
    }
  }

  addButtonHandler(buttonId: string, handler: (interaction: Interaction, dependency: DependencyManager | undefined) => Promise<void>): void {
    this.buttonHandlers.set(buttonId, handler);
  }

  async onCommandInteraction(interaction: Interaction): Promise<void> {
    const { commandName } = interaction;
    this.logger.warn("Command interaction name: " + commandName);

    try {
      const commandHandler = this.commandHandlers.get(commandName);
      if (commandHandler) {
        await commandHandler.execute(interaction, this.dependency);
      } else {
        this.logger.error("Command not found (interaction name: " + commandName + ")");
      }
    } catch (error) {
      this.logger.fatal(`Cannot execute command [${commandName}] due to error: ${error}`);
      await interaction.reply({ content: 'Server crashed', ephemeral: true });
    }
  }

  async onButtonInteraction(interaction: Interaction): Promise<void> {
    const buttonId = interaction.customId;
    const suspectUserId = interaction.user.id;
    const owner = interaction.member?.user.id;

    if (suspectUserId !== owner) {
      await interaction.reply({ content: "Don't press other buttons 😡", ephemeral: true });
      return;
    }

    try {
      this.logger.warn("Button interaction id: " + buttonId);
      const handler = this.buttonHandlers.get(buttonId);

      if (handler) {
        await handler(interaction, this.dependency);
      } else {
        this.logger.error("Button not found (interaction id: " + buttonId + ")");
      }
    } catch (error) {
      this.logger.fatal(`Cannot handle button interaction [${buttonId}] due to error: ${error.stack}`);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }

  getClient(): Client {
    return this.client;
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}

export { BotAppService };