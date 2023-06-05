import { IDiscordService } from '../interfaces/IDiscordService';
import fs from 'fs';

class DiscordService implements IDiscordService {
  private logger: any;
  private commandInfo: any[];
  private commandHandlers: Map<string, any>;

  constructor() {
  }

  async init(dependency: DependencyManager): Promise<void> {
    this.logger = dependency.get("Logger");
    const commandsFolder = "./services/implementations/commands";
    const exists = fs.existsSync(commandsFolder);
    if (!exists) {
      this.logger.fatal("Commands folder not found.");
      return;
    }
    const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith('.js'));
    this.commandInfo = [];
    this.commandHandlers = new Map();
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      this.commandInfo.push(command.data.toJSON());
      this.commandHandlers.set(command.data.name, command);
    }
  }

  getCommandsInfo(): any[] {
    return this.commandInfo;
  }

  getCommands(): Map<string, any> {
    return this.commandHandlers;
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }
}

export { DiscordService };
