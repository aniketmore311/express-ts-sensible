import { ErrorRequestHandler } from 'express'
import { WriteStream } from 'fs'

export function errorLogger({
  stream,
}: {
  stream: WriteStream
}): ErrorRequestHandler {
  return function (err, req, res, next) {
    const time = new Date()
    const url = req.url
    const method = req.method

    res.on('finish', () => {
      const logJson = {
        time: time.toISOString(),
        ts: time.getTime(),
        method: method,
        url: url,
        error: {
          message: err.message,
          stack: err.stack,
          name: err.name,
          statusCode: res.statusCode,
        },
      }

      const logLine = JSON.stringify(logJson) + '\n'
      stream.write(logLine)
    })

    next(err)
  }
}
