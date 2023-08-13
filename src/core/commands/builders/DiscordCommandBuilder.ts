import { SlashCommandBuilder } from '@discordjs/builders'
import { Command } from '../api/Command'

export default function buildDiscordSlashCommand (cmd: Command): SlashCommandBuilder {
  const cmdBuilder = new SlashCommandBuilder()
    .setName(cmd.name)
    .setDescription(cmd.description)

  cmd.arguments.forEach((arg) => {
    // TODO: improve this thing below (avoid big ass switch cases)
    switch (arg.argType) {
      case 'NUMBER':

        cmdBuilder.addNumberOption(option => option.setName(arg.argName).setDescription(arg.description))
        break

      case 'USER':
        cmdBuilder.addUserOption(option => option.setName(arg.argName).setDescription(arg.description))
        break

      // TODO: IMPLEMENT MORE ARGUMENT TYPES IF THIS WORKS...
      default:
        throw Error(`Command argument type not implemented: ${arg.argType.toString()}`)
    }
  })

  return cmdBuilder
}
