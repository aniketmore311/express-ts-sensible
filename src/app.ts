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
import { json } from 'stream/consumers'
import { errorLogger } from './lib/middleware/errorLogger'

export const app = express()

const NODE_ENV = appConfig.env.NODE_ENV;
// stream for access-logs in production
const accessLogFileStream = fs.createWriteStream(
  path.join(appConfig.ROOT_DIR, 'logs/access.log'),
  {
    flags: 'a',
  }
)
// file stream to error-logs in production
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
    morgan('common', {
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
// log errors to console in development
if (NODE_ENV == 'development') {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack || err.message)
    next(err)
  })
}
// log to file in production
if (NODE_ENV == 'production') {
  app.use(errorLogger({
    stream: errorLogFileStream
  }))
}

app.use(errorHandler())
