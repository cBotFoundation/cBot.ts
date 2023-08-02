import { ApplicationManager } from '../../ApplicationManager'
import { CommandInteraction, RepliableInteraction } from 'discord.js'

export default interface cActionContext {
  dependency: ApplicationManager | undefined
  context: CommandInteraction | RepliableInteraction // TODO: REMOVE DISCORD TYPE UNIONS WHEN OTHER PLATFORMS ARE IMPLEMENTED
}
