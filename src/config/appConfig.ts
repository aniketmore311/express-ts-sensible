import path from 'path';
import configFile from './config.json';


const properties:{[key:string]:string} = {
  ...configFile
}

/**
 * @description returns config variables, if not found throws error
 */
function get(key:string):string {
  const val = properties[key];
  if (val !== undefined) {
    return properties[key];
  } else {
    throw Error(`config variable ${key} not found`);
  }
}

/**
 * @description sets config variable
 */
function set(key:string, val:string) {
  properties[key] = val;
}

// setting values
const ROOT_DIR = path.join(__dirname, '..', '..')
set('ROOT_DIR', ROOT_DIR);
set('LOG_DIR', path.join(ROOT_DIR, 'logs'));

export default {
  get,
  set
}
