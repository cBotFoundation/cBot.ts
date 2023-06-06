import express, { Express, Request, Response, NextFunction, Router } from 'express';
import cors from 'cors';
import jwt, { Secret } from 'express-jwt';
import { DependencyManager } from '../../Dependency-manager';
import { IRestService } from '../interfaces/IRestService';

class RestService implements IRestService {
  private app: Express;
  private routes: Map<string, Router>;
  private currentBasePath: string;
  private baseUriPrefix: string;

  constructor() {
    this.app = express();
    this.routes = new Map();
    this.currentBasePath = '';
    this.baseUriPrefix = process.env.REST_URL_PREFIX;
  }

  async init(dependency: DependencyManager): Promise<void> {
    this.logger = dependency.get('Logger');
    this.controller = dependency.get('Controller');
    this.configureServer();
    this.initializeHttpServer();
  }

  async dispose(): Promise<void> {
    // Clean up resources
  }

  async interval(): Promise<void> {
    // Perform periodic tasks
  }

  // Implementation

  setBasePath(basePath: string): void {
    this.currentBasePath = basePath;
  }

  configureJwt(): jwt.RequestHandler {
    return jwt({ secret: process.env.JWT_SECRET as Secret, algorithms: ['HS256'] });
  }

  jwtMiddleWare(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) return res.sendStatus(401);
    next();
  }

  addRoute(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    path: string,
    useAuth: boolean,
    hook: RequestHandler,
    middleware: RequestHandler[] = []
  ): void {
    const base = this.currentBasePath;
    if (base == null || base === '') {
      this.logger.fatal('Base URL is empty (cannot define parent router)');
      return;
    }

    const findedRouter = this.routes.get(base);
    const routerPath = this.baseUriPrefix + this.currentBasePath + path;

    if (useAuth) {
      middleware.push(this.configureJwt());
      middleware.push(this.jwtMiddleWare);
    }

    if (findedRouter) {
      findedRouter[method](routerPath, middleware, hook);
    } else {
      const instancedRouter = Router();
      instancedRouter[method](routerPath, middleware, hook);
      this.routes.set(base, instancedRouter);
      this.app.use(instancedRouter);
    }

    this.logger.warn(`HTTP REST API route added path: [${method.toUpperCase()}] [${routerPath}]`);
  }

  configureServer(): void {
    // CORS Configuration
    this.app.use(cors());
    // Request body parsing
    this.app.use(express.json());
    // Favicon Fix
    this.app.get('/favicon.ico', (req, res) => res.status(204));
  }

  initializeHttpServer(): void {
    this.app.listen(process.env.PORT, (err: Error) => {
      if (err) {
        this.logger.fatal('An error occurred with the server', err);
        throw new Error(err.message);
      }
      this.logger.info(`Server running on port: ${process.env.PORT}`);
    });
  }
}

export { RestService };
