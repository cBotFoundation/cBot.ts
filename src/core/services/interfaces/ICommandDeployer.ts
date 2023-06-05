import { IService } from "../IService";

export interface ICommandDeployer extends IService {
    init(dependency: DependencyManager): void;
    deployCommands(): void;
    dispose(): void;
    interval(): void;
  }