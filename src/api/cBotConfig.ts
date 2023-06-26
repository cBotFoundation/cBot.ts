import { ILogger } from '../core/services/interfaces/ILogger'
import { Command } from '../core/commands/api/Command'

export interface cBootConfig {
  port: number
  deploy: boolean
  clientKey: string
  clientId: string
  serverId: string
  useImplementations: any[]
  locale: any
  theme: any
  commands: Command[]
  logger: ILogger
}
