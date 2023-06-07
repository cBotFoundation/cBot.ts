
import { IService } from './IService';
import { BotAppService } from './impl/Boot-app.service';
import { BootstrapService } from './impl/Bootstrap.service';
import { ConfigService } from './impl/ConfigService';

export const coreServices: Array<new () => IService> = [
  ConfigService,
  BotAppService,
  BootstrapService
];