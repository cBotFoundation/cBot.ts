const coreServices = require("./core-services/services.module");
const clientServices = require("../services/services.module");
const process = require('process');

class DepedencyManager {
    constructor() {
        this.instancedServices = new Map();
        this.startHooks = new Array();
        this.intervalHooks = new Array();
        this.disposeHooks = new Array();
    }

    //ADD DUCK TYPING CHECK !!!
    instanceService(service) {
        try {
            let serviceName = service.name.replace("Service", "");
            let instancedService = new service();

            this.startHooks.push({ serviceName, hook: instancedService.init.bind(instancedService) });
            this.intervalHooks.push(instancedService.interval.bind(instancedService));
            this.disposeHooks.push(instancedService.dispose.bind(instancedService));
            this.instancedServices.set(serviceName, instancedService);
        } catch (error) {
            logger.fatal(`Service [[${serviceName}]] cannot be instanced...`);
        }
    }

    invokeStartHooks() {
        try {
            const logger = this.get("Logger");
            this.startHooks.forEach((meta) => {
                meta.hook(this);
                logger.warn(`Service [[${meta.serviceName}]] has been started succesfully`);
            });
        } catch (error) {
            logger.fatal(`Service [[${meta.serviceName}]] cannot be initialized`);
        }
    }

    async invokeDisposeHooks() {
        try {
            this.disposeHooks.forEach(async (hook) => {
                await hook();
            });
        } catch (error) {
            logger.fatal(`Cannot dispose service: ${error}`);
        }
    }

    async initialize() {
        //core services
        coreServices.forEach((service) => {
            this.instanceService(service);
        });

        //client services
        clientServices.forEach((service) => {
            this.instanceService(service);
        });

        this.invokeStartHooks();
        
        process.on('exit', async (code) => {
            console.log("exit code:" + code);
            await invokeDisposeHooks();
        });
    }

    async restart() {
        await this.invokeDisposeHooks();
        this.invokeStartHooks();
    }

    get(name) {
        return this.instancedServices.get(name);
    }
}

module.exports = { DepedencyManager };

