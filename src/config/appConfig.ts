import config from './config'
const NODE_ENV = process.env.NODE_ENV || 'development'

if (
  NODE_ENV !== 'test' &&
  NODE_ENV !== 'development' &&
  NODE_ENV !== 'production'
) {
  throw new Error(`NODE_ENV must be one of [test, development, production]`)
}

const envConfig = config[NODE_ENV]

function getConfig(key: string) {
  if (envConfig[key] == undefined) {
    throw new Error(`config item ${key} not found`)
  }
  return envConfig[key]
}

const appConfig = {
  getConfig,
}

export default appConfig
