import { IService } from "../IService";

export interface IRestService extends IService {
    startServer(port: number): void;
    stopServer(): void;
    addRoute(method: string, path: string, handler: RequestHandler): void;
  }