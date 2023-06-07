import { CBootConfig } from '../../../models/CBootConfig'
import { Command } from '../../../models/Command'
import { IService } from '../IService'
import { ILogger } from './ILogger'

export interface IConfigService extends IService {
  setConfiguration: (config: CBootConfig) => void
  getConfiguration: () => CBootConfig | undefined
  getLogger: () => ILogger | undefined
  getCommands: () => Command[]
}
