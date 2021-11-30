import { Handler, NextFunction, Request, Response } from 'express'

/**
 * @description warp async route handlers with this function to avoid unhandled rejection error. converts async req handler to sync request handler
 * @returns sync express request handler
 */
export function catchAsync(
  /*eslint-disable-next-line */
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): Handler {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((err) => {
      next(err)
    })
  }
}

/**
 * @description used to get env variables
 * @returns if env variable is present then it will be returned else if default string is given then it will be returned otherwise error will be thrown.
 */
export function getEnv(key: string, defaultValue?: string): string {
  const val = process.env[key]
  if (val === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`environment variable ${key} not found`)
    } else {
      return defaultValue
    }
  }
  return val
}
