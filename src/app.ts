import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { userRouter } from './routes/users'
import { errorHandler } from './lib/middleware/errorHandler'
import { notFoundHandler } from './lib/middleware/notFoundHandler'
import { consoleErrorLogger } from './lib/middleware/consoleErrorLogger'
import { configService } from './config'
import createHttpError from 'http-errors'

export const app = express()

const NODE_ENV = configService.getConfig('NODE_ENV')

//middleware
app.use(cors())
app.use(helmet())
// log to console in development
if (NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
// log to file in production
if (NODE_ENV == 'production') {
  app.use(morgan('common'))
}
app.use(express.json())

// health checks
app.get('/', (req, res) => {
  return res.json({ status: 'ok' })
})
app.get('/health', (req, res) => {
  return res.json({ status: 'ok' })
})
app.get('/_internal/error', (req, res) => {
  throw new Error('This is an error')
})
app.get('/_internal/httpError', (req, res) => {
  throw new createHttpError.BadRequest('bad request custom error')
})

// controllers
app.use('/api/v1/users', userRouter)

// 404 handler
app.use(notFoundHandler())

// error handlers
// log errors to console in development
if (NODE_ENV == 'development') {
  app.use(
    consoleErrorLogger({
      printStack: false,
    })
  )
}

app.use(errorHandler())
