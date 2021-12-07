import { Handler, NextFunction, Request, Response } from 'express'

/**
 * @description converts async req handler to sync request handler
 * @returns sync express request handler
 */
export function catchAsync(
  /*eslint-disable-next-line */
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): Handler {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

