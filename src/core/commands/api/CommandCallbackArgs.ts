import { CommandInteraction } from 'discord.js'
import ApplicationContext from '../../application/ApplicationContext'
import { CommandContext, Context } from 'grammy'

export type PlatformCommandContext = CommandInteraction | CommandContext<Context>
export interface CommandCallbackArgs {
  interaction: PlatformCommandContext
  dependency: ApplicationContext | undefined
}
