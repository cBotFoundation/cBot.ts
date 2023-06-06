import { IService } from "../IService";

export interface IBotAppService extends IService {
    startBot(): void;
    stopBot(): void;
    onReady(callback: () => void): void;
    onMessage(callback: (message: string) => void): void;
  }
  