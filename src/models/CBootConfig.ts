import { ILogger } from "../core/services/interfaces/ILoggerService";
import { Command } from "./Command";

export interface CBootConfig {
    clientKey: string;
    clientId: string;
    serverId: string;
    useImplementations: any[];
    locale: any;
    theme: any;
    commands: Command[];
    logger: ILogger
  }