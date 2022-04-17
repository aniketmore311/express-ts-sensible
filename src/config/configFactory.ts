import path from 'path'

export default () => {
  return {
    APP_NAME: 'express-ts-sensible',
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || 'development',
    LOG_DIR: process.env.LOG_DIR || path.join(__dirname, '../..', 'logs'),
  }
}
