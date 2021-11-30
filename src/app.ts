import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

import { userRouter } from './routes/users'
import { errorHandler } from './lib/middleware/errorHandler'
import { notFoundHandler } from './lib/middleware/notFoundHandler'
import { getEnv } from './lib/utils'
import { appConfig } from './config/appConfig'

export const app = express()

const NODE_ENV = getEnv('NODE_ENV', 'development')
// log morgan output to file
const logFileStream = fs.createWriteStream(
  path.join(appConfig.properties.ROOT_DIR, 'logs/access.log'),
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
      stream: logFileStream,
    })
  )
}
app.use(express.json())

// controllers
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.use('/api/v1/users', userRouter)
// 404 handler
app.use(notFoundHandler())

// error handlers
//log error in console if in development
if (NODE_ENV == "development") {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    next(err);
  })
}

app.use(errorHandler())
