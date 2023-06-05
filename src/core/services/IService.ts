import { DependencyManager } from "../Dependency-manager";

interface IService {
    init(manager: DependencyManager): void;
    interval(): void;
    dispose(): Promise<void>;
}

export { IService }