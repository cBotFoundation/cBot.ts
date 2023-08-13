import { CommandInteraction, RepliableInteraction } from 'discord.js'
import ApplicationContext from "../../application/ApplicationContext";

export default interface cActionContext {
  appContext: ApplicationContext | undefined
  chatContext: CommandInteraction | RepliableInteraction // TODO: REMOVE DISCORD TYPE UNIONS WHEN OTHER PLATFORMS ARE IMPLEMENTED
}
