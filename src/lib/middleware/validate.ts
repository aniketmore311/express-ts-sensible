import { Handler } from 'express'
import { validationResult } from 'express-validator'

interface validationError extends Error {
  statusCode?: number
}

export function validate(): Handler {
  return function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = errors.array()[0]
      const message = `${error.param} ${error.msg}`
      const err: validationError = new Error(message)
      err.statusCode = 400
      next(err)
    }
    next()
  }
}
