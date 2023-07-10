
import { IService } from '../../api/interfaces/IService'
import { BotAppService } from './Boot-app.service'
import { ConfigService } from './ConfigService'
import { BootstrapService } from './Bootstrap.service'

export const coreServices: Array<new () => IService> = [
  ConfigService,
  BotAppService,
  BootstrapService
]
