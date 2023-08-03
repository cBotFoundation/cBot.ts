import { CommandInteraction } from 'discord.js'
import { ApplicationManager } from '../../application/ApplicationManager'

export interface CommandCallbackArgs {
  interaction: CommandInteraction// Discord only
  dependency: ApplicationManager | undefined
}
