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

export function getEnv(name:string, defaultValue?: string){
  const val = process.env[name];
  if(val == undefined){
    if(defaultValue == undefined){
      throw new Error(`env var with value ${name} not found`);
    }else{
      return defaultValue;
    }
  }else{
    return val;
  }
}
