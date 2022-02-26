import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

import { userRouter } from './routes/users'
import { errorHandler } from './lib/middleware/errorHandler'
import { notFoundHandler } from './lib/middleware/notFoundHandler'
import appConfig from './config/appConfig'
import { fileErrorLogger } from './lib/middleware/fileErrorLogger'
import { getEnv } from './lib/utils'
import { consoleErrorLogger } from './lib/middleware/consoleErrorLogger'

export const app = express()

const NODE_ENV = getEnv('NODE_ENV')
const LOG_DIR = appConfig.getConfig('LOG_DIR')
// create logging directory if doesn't exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR)
}
// stream for access-logs in production
const accessLogFileStream = fs.createWriteStream(
  path.join(LOG_DIR, 'access.log'),
  {
    flags: 'a',
  }
)
// file stream to error-logs in production
const errorLogFileStream = fs.createWriteStream(
  path.join(LOG_DIR, 'error.log'),
  {
    flags: 'a',
  }
)

//middleware
app.use(cors())
app.use(helmet())
// log to console in development
if (NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
// log to file in production
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
  return res.json({ status: 'ok' })
})
app.get('/health', (req, res) => {
  throw new Error('health check failed')
  return res.json({ status: 'ok' })
})

// controllers
app.use('/api/v1/users', userRouter)

// 404 handler
app.use(notFoundHandler())

// error handlers
// log errors to console in development
if (NODE_ENV == 'development') {
  app.use(consoleErrorLogger())
}
// log to file in production
if (NODE_ENV == 'production') {
  app.use(
    fileErrorLogger({
      stream: errorLogFileStream,
    })
  )
}

app.use(errorHandler())
