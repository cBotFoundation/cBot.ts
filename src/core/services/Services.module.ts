
import Service from './interfaces/Service'
import { BotAppService } from './Boot-app.service'
import { ConfigService } from '../config/ConfigService'

export const coreServices: Array<new () => Service> = [
  ConfigService,
  BotAppService
]
