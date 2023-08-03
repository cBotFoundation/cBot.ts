import { Command } from '../../commands/api/Command'
import { Logger } from '../../services/interfaces/Logger'
import { EngineImplementations } from '../../engines/engines.module'

export interface cBootConfig {
  botImplementations: EngineImplementations[]
  port: number
  freshDeploy: boolean
  discordClientKey?: string
  discordClientId?: string
  discordServerId?: string
  commands?: Command[]
  logger?: Logger
}

export function assertConfigurationHasDiscordProperties (configuration: cBootConfig): asserts configuration is cBootConfig & {
  discordClientKey: string
  discordClientId: string
  discordServerId: string
} {
  if (configuration.discordClientKey == null) {
    throw Error('Discord Implementation is enabled but discordClientKey isn\'t defined')
  }

  if (configuration.discordClientId == null) {
    throw Error('Discord Implementation is enabled but discordClientId isn\'t defined')
  }

  if (configuration.discordServerId == null) {
    throw Error('Discord Implementation is enabled but discordServerId isn\'t defined')
  }
}
