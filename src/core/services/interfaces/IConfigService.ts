import { CBootConfig } from '../../../models/CBootConfig'
import { Command } from '../../../models/Command'
import { IService } from '../IService'
import { ILogger } from './ILoggerService'

export interface IConfigService extends IService {
  setConfiguration: (config: CBootConfig) => void
  getConfiguration: () => CBootConfig | undefined
  getLogger: () => ILogger | undefined
  getCommands: () => Command[]
}
