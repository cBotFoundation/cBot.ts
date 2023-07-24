import { Command } from '../../commands/api/Command'
import { ILogger } from '../../services/interfaces/ILogger'

// TODO: REFACTOR CONFIGURATIONS, SUCJ CLIENTID, SERVER ID AND MAKE DEFAULTS...
export interface cBootConfig {
  port: number
  deploy: boolean
  clientKey: string
  clientId: string
  serverId: string
  // useImplementations: any[]
  // locale: any
  // theme: any
  commands: Command[]
  logger: ILogger
}
