import { IService } from "../IService";

export interface IDiscordService extends IService {
    login(token: string): void;
    logout(): void;
    sendMessage(channelId: string, message: string): void;
    joinVoiceChannel(channelId: string): void;
  }
  