import { IService } from "../IService";

export interface ILoggerService extends IService 
{
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
}
  