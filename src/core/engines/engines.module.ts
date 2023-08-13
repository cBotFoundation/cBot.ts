import { DiscordChatEngineService } from './implementations/DiscordChatEngineService'
import TelegramChatEngineService from './implementations/TelegramChatEngineService'

export const EngineImplementationClasses = {
  DiscordImplementation: DiscordChatEngineService,
  TelegramImplementation: TelegramChatEngineService
} as const

export type EngineImplementations = keyof typeof EngineImplementationClasses
