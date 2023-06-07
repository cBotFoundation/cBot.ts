import { ILogger } from '../core/services/interfaces/ILogger'
import { Command } from './Command'

export interface CBootConfig {
  clientKey: string
  clientId: string
  serverId: string
  useImplementations: any[]
  locale: any
  theme: any
  commands: Command[]
  logger: ILogger
}
