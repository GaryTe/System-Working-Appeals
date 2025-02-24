import {
  Request,
  Response,
  NextFunction,
  Router
} from 'express';

import {HttpMethod} from '../enum/index.js';

export interface Middleware {
  execute(req: Request, res: Response, next: NextFunction): void;
}

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}

export interface Controller {
  readonly router: Router;
  addRoute(route: Route): void;
  send<T>(res: Response, statusCode: number, data: T): void;
  ok<T>(res: Response, data?: T): void;
  created<T>(res: Response, data: T): void;
}
