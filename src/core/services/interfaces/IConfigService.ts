import { CBootConfig } from '../../../models/CBootConfig'
import { Command } from '../../../models/Command'
import { IService } from '../IService'
import { ILogger } from './ILogger'

export interface IConfigService extends IService {
  getLogger: () => ILogger | undefined
  getCommands: () => Command[]
}
