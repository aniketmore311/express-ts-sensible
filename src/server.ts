import 'make-promises-safe'
import { config } from 'dotenv'
config()

import { app } from './app'
import { getEnv } from './lib/utils'

const PORT = getEnv('PORT', '8080')
const NODE_ENV = getEnv('NODE_ENV', 'production')

app.listen(PORT, () => {
  console.log(`server started - port: ${PORT}, mode: ${NODE_ENV}`)
})
