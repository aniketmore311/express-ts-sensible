import 'make-promises-safe'
import { config } from 'dotenv'
config()

import { app } from './app'
import appConfig from './config/appConfig'

const PORT = appConfig.env.NODE_ENV;
const NODE_ENV = appConfig.env.NODE_ENV;
const name = appConfig.properties.APP_NAME;

app.listen(PORT, () => {
  console.log(`${name}\nserver started - port: ${PORT}, mode: ${NODE_ENV}`)
})
