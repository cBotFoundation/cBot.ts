import { CommandInteraction } from 'discord.js'
import { DependencyManager } from '../../Dependency-manager'

export interface CommandCallbackArgs {
  interaction: CommandInteraction// Discord only
  dependency: DependencyManager | undefined
}
