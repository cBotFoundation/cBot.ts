import { Message, Interaction, InteractionResponseType, InteractionType } from 'discord.js'

export interface CommandCallbackArgs {
  interaction: any // Discord only
  dependency: any
}
