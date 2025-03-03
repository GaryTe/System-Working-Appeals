import {
  Request,
  Response,
  NextFunction,
  Router
} from 'express';
import {CorsOptions} from 'cors';

import {HttpMethod} from '../enum/index.js';

export interface Middleware {
  execute(req: Request, res: Response, next: NextFunction): void;
}

export interface Route {
  path: string;
  method: HttpMethod;
  optionsCors?: CorsOptions,
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}

export interface RouteOptions {
  path: string;
  method: HttpMethod;
  optionsCors?: CorsOptions
}

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
  addOptionsMethod(route: RouteOptions): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data?: T): void;
  created<T>(res: Response, data: T): void;
}
