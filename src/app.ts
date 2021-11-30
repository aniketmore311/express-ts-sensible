import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import { userRouter } from './routes/users'
import { errorHandler } from './lib/middleware/errorHandler'
import { notFoundHandler } from './lib/middleware/notFoundHandler'
import { getEnv } from './lib/utils'

export const app = express()

const NODE_ENV = getEnv('NODE_ENV', "development")

app.use(cors())
app.use(helmet())
app.use(morgan(NODE_ENV == "development" ? "dev" : "combined"))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

app.use('/api/v1/users', userRouter);

app.use(notFoundHandler())

app.use(errorHandler());

