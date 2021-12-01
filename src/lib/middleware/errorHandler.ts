import { ErrorRequestHandler } from 'express'

export function errorHandler(): ErrorRequestHandler {
  return function (
    err,
    req,
    res,
    /*eslint-disable-next-line */
    next
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
