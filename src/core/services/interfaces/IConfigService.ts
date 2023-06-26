import { cBootConfig } from '../../../api/cBotConfig'
import { Command } from '../../commands/api/Command'
import { IService } from '../../../api/interfaces/IService'
import { ILogger } from './ILogger'

export interface IConfigService extends IService {
  getLogger: () => ILogger | undefined
  getCommands: () => Command[]
}
