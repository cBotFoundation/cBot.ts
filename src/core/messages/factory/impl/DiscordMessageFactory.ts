import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { cMessage, cAction } from "../../messages.module";
import IMessageFactory from "../IMessageFactory";

export default class DiscordMessageFactory implements IMessageFactory {
    createMessage(message: cMessage): unknown {
        const embed = new EmbedBuilder()
            .setColor(message.theme.primary)
            .setDescription(message.content)
            .setTimestamp()

        if (message.title) {
            embed.setTitle(message.title)
        }

        // Include ActionRow with Message as done in bot examples
        const actionRow = new ActionRowBuilder();

        message.actions.forEach((action) => {
            actionRow.addComponents(this.createAction(action))
        })
            
        return { embeds: [embed], components: [actionRow]}
    }

    createAction(action: cAction): any {
        // ActionColors match the name of ButtonStyle properties
        const style = ButtonStyle[action.color]
        const button = new ButtonBuilder()
            .setCustomId(action.name)
            .setLabel(action.text)
            .setStyle(style)
        return button
    }

}