const defaults: { [key: string]: string } = {
  NODE_ENV: "development",
  PORT: "8080"
}

/**
 * @description returns environment variable, if not found sets env variable from defaults and returns it, if default not defined throws an error
 */
function get(key: string): string {
  const val = process.env[key];
  if (val !== undefined) {
    return val;
  } else {
    if (defaults[key] !== undefined) {
      process.env[key] = defaults[key];
      const updatedVal = process.env[key];
      if (updatedVal) {
        return updatedVal;
      } else {
        throw new Error(`environment variable ${key} not found`);
      }
    } else {
      throw new Error(`environment variable ${key} not found`);
    }
  }
}

/**
 * @description sets env variable
 */
function set(key: string, val: string) {
  process.env[key] = val;
}

export default {
  get,
  set
}