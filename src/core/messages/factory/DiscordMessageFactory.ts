import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'
import { cAction, cMessage } from '../messages.module'
import IMessageFactory from '../api/interfaces/IMessageFactory'

export default class DiscordMessageFactory implements IMessageFactory {
  createMessage (message: cMessage): any {
    const embed = new EmbedBuilder()
      .setColor(message.theme.primary)
      .setDescription(message.content)
      .setTimestamp()

    if (message.title !== undefined) {
      embed.setTitle(message.title)
    }

    // Include ActionRow with Message as done in bot examples
    const actionRow = new ActionRowBuilder()

    message.actions.forEach((action) => {
      actionRow.addComponents(this.createButtons(action))
    })

    return { embeds: [embed], components: [actionRow] }
  }

  createButtons (action: cAction): any {
    // ActionColors match the name of ButtonStyle properties
    const style = ButtonStyle[action.color]
    return new ButtonBuilder()
      .setCustomId(action.name)
      .setLabel(action.text)
      .setStyle(style)
  }
}
