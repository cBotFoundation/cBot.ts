const registeredControllers = require("../../../controllers/controllers.module");

class ControllerService {
    constructor() {
        this.instacedControllers = new Array();
        this.disposeHooks = new Array();
    }

    async init(dependency) {
        this.logger = dependency.get("Logger");
        this.dependencyCtx = dependency;
        this.loadControllers();
    }

    async dispose() {
        this.disposeHooks.forEach(async (hook) => {
            await hook();
        });
    }

    async interval() {

    }

    loadControllers() {
        registeredControllers.forEach(controller => {
            let instance = new controller({ dependency: this.dependencyCtx });
            this.disposeHooks.push(instance.dispose.bind(instance));
            this.instacedControllers.push(instance);
        });
    }

    get() {
        return this.instacedControllers;
    }
}

module.exports = { ControllerService };