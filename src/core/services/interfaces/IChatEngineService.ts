import { IService } from "../IService";

export interface IChatEngineService extends IService {
    //Actions
    login(token: string): void;
    logout(): void;
    sendMessage(channelId: string, message: string): void;
    joinVoiceChannel(channelId: string): void;
    //Events
    onMessage(message: any): void;
    onReady(): void;
    onServerJoin(guild: any): void;
    onServerKicked(guild: any): void;
    onInteractionCreate(interaction: any): void;
    onMemberJoinedServer(member: any): void;
    onMemberAvailable(member: any): void;
    onMemberBanned(member: any): void;
    onMemberUnBanned(member: any): void;
    onMemberLeave(member: any): void;
    onGeneralWarning(info: any): void;
    onError(error: any): void;
  }
  