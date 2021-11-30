import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

import { userRouter } from './routes/users'
import { errorHandler } from './lib/middleware/errorHandler'
import { notFoundHandler } from './lib/middleware/notFoundHandler'
import { appConfig } from './config/appConfig'

export const app = express()

const NODE_ENV = appConfig.env.NODE_ENV;
// stream for access logs in production
const accessLogFileStream = fs.createWriteStream(
  path.join(appConfig.ROOT_DIR, 'logs/access.log'),
  {
    flags: 'a',
  }
)
// file stream to error logs in prodution
const errorLogFileStream = fs.createWriteStream(
  path.join(appConfig.ROOT_DIR, 'logs/error.log'),
  {
    flags: 'a',
  }
)

//middleware
app.use(cors())
app.use(helmet())
// log to console if in development
if (NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
// log to file if in production
if (NODE_ENV == 'production') {
  app.use(
    morgan('combined', {
      stream: accessLogFileStream,
    })
  )
}
app.use(express.json())

// health checks
app.get('/', (req, res) => {
  return res.json({ status: 'healthy' })
})
app.get('/health', (req, res) => {
  return res.json({ status: 'healthy' })
})

// controllers
app.use('/api/v1/users', userRouter)

// 404 handler
app.use(notFoundHandler())

// error handlers
// log errors in console in development
if (NODE_ENV == 'development') {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error: ' + err.message)
    next(err)
  })
}
// log errors to file in production
if (NODE_ENV == 'production') {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      const logLine = `${Date.now()}\t${new Date().toISOString()}\t${req.method
        } ${req.url} ${res.statusCode}\t${err.message}\n`
      errorLogFileStream.write(logLine)
    })
    next(err)
  })
}

app.use(errorHandler())
