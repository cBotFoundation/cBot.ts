

export function helloWorld(){
    console.log("hello world")
}

export function initializeBot()
{
    const app = require("./core/dependency-manager");
    require('dotenv').config();
    
    //todo: refactor the depdency mamnager to be inside of the app manager
    const appInstance = new app.DepedencyManager();
    appInstance.initialize();
}