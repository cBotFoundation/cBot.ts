import { Command } from "../core/commands/api/Command"
import { ILogger } from "../core/services/interfaces/ILogger"

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
