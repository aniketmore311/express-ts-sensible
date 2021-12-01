import path from 'path'
import { getEnv } from '../lib/utils'

const ROOT_DIR = path.join(__dirname, '..', '..')

export const appConfig = {
  ROOT_DIR: ROOT_DIR,
  env: {
    NODE_ENV: getEnv('NODE_ENV', 'development'),
    PORT: getEnv('PORT', '8080'),
  },
}
