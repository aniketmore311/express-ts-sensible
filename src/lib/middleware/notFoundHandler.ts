import { Request, Response, NextFunction, Handler } from 'express'

interface customError extends Error {
  statusCode?: number
}

export function notFoundHandler(): Handler {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const err: customError = new Error('resource not found');
    err.statusCode = 404;
    next(err);
  }
}
