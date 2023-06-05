import * as coreServices from './services/Services.module';

class DependencyManager {
  private instancedServices: Map<string, any>;
  private startHooks: Array<{ serviceName: string; hook: (manager: DependencyManager) => void }>;
  private intervalHooks: Array<() => void>;
  private disposeHooks: Array<() => Promise<void>>;

  constructor() {
    this.instancedServices = new Map();
    this.startHooks = [];
    this.intervalHooks = [];
    this.disposeHooks = [];
  }

  instanceService(service: any): void {
    try {
      const serviceName = service.name.replace("Service", "");
      const instancedService = new service();

      this.startHooks.push({ serviceName, hook: instancedService.init.bind(instancedService) });
      this.intervalHooks.push(instancedService.interval.bind(instancedService));
      this.disposeHooks.push(instancedService.dispose.bind(instancedService));
      this.instancedServices.set(serviceName, instancedService);
    } catch (error) {
      console.log(`Service [[${serviceName}]] cannot be instanced...`);
    }
  }

  invokeStartHooks(): void {
    try {
      this.startHooks.forEach((meta) => {
        meta.hook(this);
        console.log(`Service [[${meta.serviceName}]] has been started successfully`);
      });
    } catch (error) {
      console.log(`Service [[${meta.serviceName}]] cannot be initialized`);
    }
  }

  async invokeDisposeHooks(): Promise<void> {
    try {
      for (const hook of this.disposeHooks) {
        await hook();
      }
    } catch (error) {
      console.log(`Cannot dispose service: ${error}`);
    }
  }

  async initialize(): Promise<void> {
    // Core services
    Object.values(coreServices).forEach((service: any) => {
      this.instanceService(service);
    });

    // Client services
    Object.values(clientServices).forEach((service: any) => {
      this.instanceService(service);
    });

    this.invokeStartHooks();

    //todo: fixe proceess dep
    // process.on('exit', async (code) => {
    //   console.log("exit code: " + code);
    //   await this.invokeDisposeHooks();
    // });
  }

  async restart(): Promise<void> {
    await this.invokeDisposeHooks();
    this.invokeStartHooks();
  }

  get(name: string): any {
    return this.instancedServices.get(name);
  }
}

export { DependencyManager };