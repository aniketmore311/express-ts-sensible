import { ErrorRequestHandler } from 'express'

export function consoleErrorLogger(): ErrorRequestHandler {
  return function (err, req, res, next) {
    console.error(err.stack || err.message)
    next(err)
  }
}
