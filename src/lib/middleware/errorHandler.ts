import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

interface customError extends Error {
  statusCode?: number
}

export function errorHandler(): ErrorRequestHandler {
  return function (
    err: customError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let statusCode = 500
    let message = 'something went wrong'
    if (err.statusCode) {
      statusCode = err.statusCode
      message = err.message
    }
    const errResp = {
      statusCode,
      message,
    }
    return res.status(statusCode).json({
      errors: [errResp],
    })
  }
}
