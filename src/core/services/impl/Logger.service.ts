import log4js from "log4js";
import { ILoggerService } from "../interfaces/ILoggerService";

class LoggerService implements ILoggerService {
  private logger: any;

  constructor() {
    log4js.configure({
      appenders: { out: { type: 'stdout' }, dBot: { type: "file", filename: "logs/dBot.log" } },
      categories: { default: { appenders: ["dBot", "out"], level: "debug" } }
    });
    this.logger = log4js.getLogger("dBot");
  }

  async init(dependency: DependencyManager): Promise<void> {
    // Initialization logic, if any
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }

  async info(message: string): Promise<void> {
    this.logger.info(message.toUpperCase());
  }

  async warn(message: string): Promise<void> {
    this.logger.warn(message.toUpperCase());
  }

  async error(message: string): Promise<void> {
    this.logger.error(message.toUpperCase());
  }

  async fatal(message: string): Promise<void> {
    this.logger.fatal(message.toUpperCase());
  }
}

export { LoggerService };
