const express = require('express');
const cors = require('cors');
const { Router } = require('express');
const { throws } = require('assert');
const jwt = require('express-jwt');


class RestService {
    constructor() {
        this.app = express();
        this.routes = new Map();
        this.currentBasePath = "";
        this.baseUriPrefix = process.env.REST_URL_PREFIX;
    }

    async init(dependency) {
        this.logger = dependency.get("Logger");
        this.controller = dependency.get("Controller");
        this.configureServer();
        this.initializeHttpServer();
    }

    async dispose() {

    }

    async interval() {

    }

    //Implementation
    setBasePath(basePath) {
        this.currentBasePath = basePath;
    }

    configureJwt() {
        return jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });
    }

    jwtMiddleWare(req, res, next) {
        if (!req.user) return res.sendStatus(401);
        next();
    }

    addRoute(method, path, useAuth, hook, middleware = []) {
        let base = this.currentBasePath;
        if (base == null || base === "") {
            this.logger.fatal("base url empty (cannot define parent router)");
            return;
        }
        let findedRouter = this.routes.get(base);
        let routerPath = this.baseUriPrefix + this.currentBasePath + path;
        if (useAuth) {
            middleware.push(this.configureJwt());
            middleware.push(this.jwtMiddleWare);
        }
        if (findedRouter != null) {
            findedRouter[method](routerPath, middleware, hook);
        } else {
            let instancedRouter = new Router();
            instancedRouter[method](routerPath, middleware, hook);
            this.routes.set(base, instancedRouter);
            this.app.use(instancedRouter);
        }
        this.logger.warn(`Http rest api route added path:[${method}][${routerPath}]`);
    }

    configureServer() {
        // Configuración de CORS
        this.app.use(cors());
        // Lectura y parseo de body
        this.app.use(express.json());
        // Fix de favicon
        this.app.get('/favicon.ico', (req, res) => res.status(204));
    }

    initializeHttpServer() {
        this.app.listen(process.env.PORT, (err) => {
            if (err) {
                this.logger.fatal("Ocurrió un problema con el servidor", err);
                throw new Error(err)
            };
            this.logger.info(`Server runing in port: ${process.env.PORT}`);
        });
    }
}

module.exports = { RestService }