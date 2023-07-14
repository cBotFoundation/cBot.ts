
import { IService } from '../../api/interfaces/IService'
import { BotAppService } from './Boot-app.service'
import { ConfigService } from './ConfigService'

export const coreServices: Array<new () => IService> = [
  ConfigService,
  BotAppService,
]
