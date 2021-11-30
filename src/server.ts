import 'make-promises-safe'
import { config } from 'dotenv'
config()
import { app } from './app'
import { getEnv } from './lib/utils'

const PORT = getEnv('PORT', "8080")

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`)
})
