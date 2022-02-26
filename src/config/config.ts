import path from 'path'

const ROOT_DIR = path.join(__dirname, '..', '..')
const LOG_DIR = path.join(ROOT_DIR, 'logs')

const common: IConfigItem = {
  APP_NAME: 'express-ts-sensible',
  LOG_DIR,
  ROOT_DIR,
}

type IConfigItem = { [key: string]: string }
type IConfig = { [key: string]: IConfigItem }

const config: IConfig = {
  development: {
    ...common,
  },
  production: {
    ...common,
  },
  test: {
    ...common,
  },
}

export default config
