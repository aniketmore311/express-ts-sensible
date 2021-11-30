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
const logFileStream = fs.createWriteStream(
  path.join(appConfig.properties.ROOT_DIR, 'logs/access.log'),
  {
    flags: 'a',
  }
)

app.use(cors())
app.use(helmet())
if (NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
app.use(
  morgan('combined', {
    stream: logFileStream,
  })
)
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.use('/api/v1/users', userRouter)

app.use(notFoundHandler())

if (NODE_ENV == "development") {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    next(err);
  })
}

app.use(errorHandler())
