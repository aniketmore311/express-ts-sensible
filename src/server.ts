import 'make-promises-safe'
import { config } from 'dotenv'
config()

import { app } from './app'
import { configService } from './config'

const PORT = configService.getConfig('PORT')
const NODE_ENV = configService.getConfig('NODE_ENV')
const name = configService.getConfig('APP_NAME')

app.listen(PORT, () => {
  console.log(
    `${name}\nserver started on http://localhost:${PORT} \nport: ${PORT}, mode: ${NODE_ENV}`
  )
})
