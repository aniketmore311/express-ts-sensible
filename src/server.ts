import 'make-promises-safe'
import { config } from 'dotenv'
config()

import { app } from './app'
import envConfig from './config/envConfig';
import appConfig from './config/appConfig';

const PORT = envConfig.get('PORT');
const NODE_ENV = envConfig.get("NODE_ENV");
const name = appConfig.get('APP_NAME');

app.listen(PORT, () => {
  console.log(`${name}\nserver started - port: ${PORT}, mode: ${NODE_ENV}`)
})
