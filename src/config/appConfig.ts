import path from 'path';
import {getEnv} from '../lib/utils';

const ROOT_DIR = path.resolve(__dirname,"..","..");
const LOG_DIR = path.join(ROOT_DIR,"logs");

const appConfig = {
    env:{
        NODE_ENV : getEnv("NODE_ENV","development"),
        PORT:getEnv("PORT","8080")
    },
    properties:{
        APP_NAME:"express ts sensible",
        ROOT_DIR:ROOT_DIR,
        LOG_DIR:LOG_DIR
    }
};

export default appConfig;