import { DiscordChatEngineService } from './implementations/DiscordChatEngineService'

export const EngineImplementationClasses = {
  DiscordImplementation: DiscordChatEngineService
} as const

export type EngineImplementations = keyof typeof EngineImplementationClasses
