import { DependencyManager } from '../../Dependency-manager'
import { CommandInteraction, RepliableInteraction } from 'discord.js'

export default interface cActionContext {
  dependency: DependencyManager | undefined
  context: CommandInteraction | RepliableInteraction // TODO: REMOVE DISCORD TYPE UNIONS WHEN OTHER PLATFORMS ARE IMPLEMENTED
}
