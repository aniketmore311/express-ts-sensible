import 'make-promises-safe'
import { config } from 'dotenv'
config()

import { app } from './app'
import appConfig from './config/appConfig'
import { getEnv } from './lib/utils'

const PORT = getEnv('PORT')
const NODE_ENV = getEnv('NODE_ENV')
const name = appConfig.getConfig('APP_NAME')

app.listen(PORT, () => {
  console.log(`${name}\nserver started - port: ${PORT}, mode: ${NODE_ENV}`)
})
